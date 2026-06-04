---
title: How to Simulate Like a Quant Desk：每个模型、每个公式、可运行代码
date: 2026-03-02
source: x.com
url: https://x.com/i/article/2027371960175386624
type: tweet
tags: [投资, 技术]
---

## 摘要

这篇文章从一个预测市场的硬币翻转出发，系统讲解量化交易台所用的完整仿真技术栈：Monte Carlo 基础与方差缩减技巧、重要性采样处理极尾风险、粒子滤波器实时更新概率、Copula 模型捕捉相关性尾部依赖、Agent-Based 仿真模拟市场微观结构，最终给出从数据摄取到交易执行的完整生产级系统架构，每个环节均附可运行 Python 代码。

## 全文

This isn't a list of techniques.
It's a story - one that starts with a coin flip and ends with institutional-grade simulation engines.
Each section builds on the last. Skip ahead and the math won't make sense. Read it in order and by the end you'll have runnable code for every layer of the stack.

*Disclaimer: Not Financial Advice & Do Your Own Research*

---

## Part I: The Coin Flip That Breaks Everything

You're staring at a Polymarket contract. "Will the Fed cut rates in March?" YES is trading at $0.62.
Your instinct says: that's a 62% probability. Maybe you think it should be 70%. So you buy.

Congratulations. You just did what every retail trader does. You treated a prediction market contract like a coin flip with a known bias, estimated your own bias, and bet the difference.

- You have no idea how confident to be in your 70% estimate.
- You don't know how it should change when tomorrow's jobs report drops.
- You don't know how it correlates with the six other Fed-related contracts on Polymarket.
- You don't know whether the price path between now and resolution will let you exit at a profit even if you're eventually right.

A coin flip has one parameter: p.
A prediction market contract embedded in a portfolio of correlated events, with time-varying information flow, order book dynamics, and execution risk, has dozens.

---

## Part II: Monte Carlo — The Foundation Nobody Respects Enough

Every simulation in this article ultimately reduces to Monte Carlo: draw samples from a distribution, compute a statistic, repeat.

The estimator for event probability p=P(A) is just the sample mean. The Central Limit Theorem gives convergence rate O(N^{-1/2}), with variance Var(p̂_N)=p(1−p)/N.

The variance is maximized at p=0.5 — a contract trading at 50 cents is exactly where your Monte Carlo estimates are least precise.

To hit ±0.01 precision at 95% confidence when p=0.50, you need ~9,604 samples. That's manageable. But it gets worse fast when you need to simulate paths, not just endpoints.

**Evaluating Your Simulation — Brier Score:**

`BS = (1/N) Σ (p_i - o_i)²`

- Below 0.20: good
- Below 0.10: excellent
- Best election forecasters (538, Economist): 0.06–0.12

---

## Part III: When 100,000 Samples Aren't Enough

Polymarket hosts contracts on extreme events. "Will the S&P 500 drop 20% in one week?" is trading at $0.003. With crude Monte Carlo at 100,000 samples, you might see zero or one hit — useless.

**Importance Sampling via Exponential Tilting:**

For a random walk with increments Δ_i having MGF M(γ), tilt the distribution by choosing γ to make the rare event typical. For a contract that pays off when a sum exceeds a large threshold, γ solves the Lundberg equation M(γ)=1.

On extreme contracts, IS can reduce variance by factors of **100–10,000x**. This means 100 IS samples give better precision than 1,000,000 crude samples. The difference between "we can't price this" and "we're trading it."

---

## Part IV: Sequential Monte Carlo for Real-Time Updating

**The filtering problem:** Election night, 8:01 PM EST. Florida polls close. Your model needs to update instantly for every correlated state.

**State-Space Model:**
- Hidden state x_t: the "true" probability (unobserved)
- Observation y_t: market prices, poll results, vote counts

State evolves via logit random walk (keeps probabilities bounded). Observations are noisy readings of the true state.

**Bootstrap Particle Filter:** Maintains N "particles" (hypotheses about true probability) and reweights them as data arrives.

Why better than using market price directly? The filter smooths noise and propagates uncertainty. When the market spikes on a single trade, the filter recognizes the true probability might not have changed that much.

---

## Part V: Three Variance Reduction Tricks That Stack

**1. Antithetic Variates (Free Symmetry)**
When payoff is monotone (binary contracts always are), use paired samples (U, 1-U). Typical reduction: 50–75%. Zero extra computational cost.

**2. Control Variates (Exploit What You Already Know)**
Use Black-Scholes digital price p_BS as control variate. Corrects bias using the known closed-form solution.

**3. Stratified Sampling (Divide and Conquer)**
Partition probability space into J strata, sample within each, combine. Maximum gain via Neyman allocation: n_j ∝ ω_j σ_j.

**Stacked together:** Routinely achieve **100–500x variance reduction** over crude MC. This is table stakes in production.

---

## Part VI: Modeling What Correlation Matrices Can't

**Copulas and Tail Dependence:**

The Gaussian copula's failure to model tail dependence contributed to the 2008 financial crisis. In prediction markets: when one swing state has a surprise result, the probability that all swing states flip together is much higher than Gaussian would predict.

**Sklar's Theorem:** Any joint distribution can be decomposed into marginals + copula.

| Copula | Tail Dependence | Use Case |
|--------|----------------|---------|
| Gaussian | λ_U = λ_L = 0 | Catastrophically wrong for correlated markets |
| Student-t (ν=4, ρ=0.6) | ~18% | Realistic extreme co-movements |
| Clayton | Lower tail only | When one market crashes, others follow |
| Gumbel | Upper tail only | Correlated positive resolutions |

**t-copula with ν=4 routinely shows 2–5x higher probability of extreme joint outcomes** vs Gaussian. Trading correlated contracts without modeling tail dependence = portfolio that blows up in the scenarios that matter most.

**Vine Copulas (for d>5 contracts):**
Decompose d-dimensional dependency into d(d−1)/2 bivariate conditional copulas:
- C-vine (star): One central event drives everything
- D-vine (path): Sequential dependencies
- R-vine (general graph): Maximum flexibility

---

## Part VII: Agent-Based Simulation

**The Zero-Intelligence Revelation:**
Gode & Sunder (1993): Zero-intelligence agents achieve near-100% allocative efficiency in continuous double auctions.
Farmer, Patelli & Zovko (2005): Extended to limit order books, explaining 96% of cross-sectional spread variation on the London Stock Exchange. One parameter. 96%.

Markets can be efficient even when every trader is completely irrational.

Agent-based simulation reveals:
- How fast prices converge based on ratio of informed to noise traders
- How market maker spread responds to information flow
- Why informed traders extract profit at noise traders' expense

---

## Part VIII: The Production Stack

```
LAYER 1: DATA INGESTION
- WebSocket feed from Polymarket CLOB API (real-time prices, volumes)
- News/poll feeds (NLP-processed into probability signals)
- On-chain event data (Polygon)

LAYER 2: PROBABILITY ENGINE
- Hierarchical Bayesian model (Stan/PyMC) — state-level posteriors
- Particle filter — real-time updating on new observations
- Jump-diffusion SDE path simulation for risk management
- Ensemble: weighted average of model outputs

LAYER 3: DEPENDENCY MODELING
- Vine copula — pairwise dependencies between contracts
- Factor model — shared national/global risk factors
- Tail dependence estimation via t-copula

LAYER 4: RISK MANAGEMENT
- EVT-based VaR and Expected Shortfall
- Reverse stress testing — identify worst-case scenarios
- Correlation stress — what if state correlations spike?
- Liquidity risk — order book depth monitoring

LAYER 5: MONITORING
- Brier score tracking (are we calibrated?)
- P&L attribution (which model component added value?)
- Drawdown alerts
- Model drift detection
```

---

## References

- Dalen (2025). "Toward Black-Scholes for Prediction Markets." arXiv:2510.15205
- Saguillo et al. (2025). "Unravelling the Probabilistic Forest: Arbitrage in Prediction Markets." arXiv:2508.03474
- Madrigal-Cianci et al. (2026). "Prediction Markets as Bayesian Inverse Problems." arXiv:2601.18815
- Farmer, Patelli & Zovko (2005). "The Predictive Power of Zero Intelligence." PNAS
- Gode & Sunder (1993). "Allocative Efficiency of Markets with Zero-Intelligence Traders." JPE
- Kyle (1985). "Continuous Auctions and Insider Trading." Econometrica
- Glosten & Milgrom (1985). "Bid, Ask, and Transaction Prices." JFE
- Hoffman & Gelman (2014). "The No-U-Turn Sampler." JMLR
- Merton (1976). "Option Pricing When Underlying Stock Returns Are Discontinuous." JFE
- Linzer (2013). "Dynamic Bayesian Forecasting of Presidential Elections." JASA
- Aas, Czado, Frigessi & Bakken (2009). "Pair-Copula Constructions of Multiple Dependence." Insurance: Mathematics and Economics
- Wiese et al. (2020). "Quant GANs: Deep Generation of Financial Time Series." Quantitative Finance
- Kidger et al. (2021). "Neural SDEs as Infinite-Dimensional GANs." ICML
