# 5. Theory Reference

> A comprehensive consolidated reference sheet containing all stochastic, partial differential, closed-form pricing, and sensitivity equations derived in the theory section.

---

## 1. PDE Dynamics

### 1.a. Foundations

> Stochastic calculus foundations derived in [Part 1: Itô's Lemma](./1-ito-lemma.md).

* **Wiener Process Increment ($dW$)**
  * Definition: $dW = \epsilon \sqrt{dt}$
  * Noise Term: $\epsilon \sim \mathcal{N}(0, 1)$

* **General Itô Process SDE ($dx$)**
  * Definition: $dx = a(t, x)\,dt + b(t, x)\,dW$
  * Drift and Diffusion: $a(t, x)$ is drift; $b(t, x)$ is volatility scaling.

* **General Itô's Lemma ($df(t, x)$)**
  * Definition: $df = \left( \frac{\partial f}{\partial t} + a\frac{\partial f}{\partial x} + \frac{1}{2}b^2\frac{\partial^2 f}{\partial x^2} \right)dt + b\frac{\partial f}{\partial x}\,dW$
  * Stochastic Chain Rule: Accounts for path curvature via the second-order correction.

---

### 1.b. Dynamics

> Asset dynamics and continuous hedging portfolio formulations derived in [Part 2: BSM PDE Derivation](./2-black-scholes-merton-pde.md).

* **Geometric Brownian Motion (GBM) with Dividends ($dS$)**
  * Definition: $dS = (r - q)S\,dt + \sigma S\,dW \quad (\text{under risk-neutral measure } \mathbb{Q})$
  * Parameters: $r$ is risk-free rate; $q$ is continuous dividend yield; $\sigma$ is stock volatility.

* **Standard Black-Scholes-Merton PDE**
  * Definition: $\frac{\partial V}{\partial t} + (r - q)S\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - rV = 0$
  * Portfolio Value ($\Pi$): $\Pi = V - \Delta S \implies d\Pi = r\Pi\,dt$ (arbitrage-free).

* **Greek Representation of the BSM PDE**
  * Definition: $\Theta + (r - q)S\Delta + \frac{1}{2}\sigma^2 S^2 \Gamma - rV = 0$
  * Sensitivities: $\Theta$ (time decay), $\Delta$ (delta sensitivity), $\Gamma$ (gamma convexity).

---

## 2. Closed-Form Solutions

> Reference equations and auxiliary variables derived in [Part 3: Closed-Form Solution](./3-closed-formula.md).

* **European Call Option Price ($C$)**
  * Analytical Equation: $C = S_0 e^{-qT} \Phi(d_1) - K e^{-rT} \Phi(d_2)$
  * Economic Interpretation: Expected terminal stock value under $\mathbb{Q}$ minus expected cash payment, discounted.

* **European Put Option Price ($P$)**
  * Analytical Equation: $P = K e^{-rT} \Phi(-d_2) - S_0 e^{-qT} \Phi(-d_1)$
  * Put-Call Parity Derivation: $P = C + K e^{-rT} - S_0 e^{-qT}$

* **Auxiliary Probability Parameters ($d_1, d_2$)**
  * Upper Integration Limit ($d_1$): $d_1 = \frac{\ln(S_0 / K) + \left(r - q + \frac{1}{2}\sigma^2\right)T}{\sigma\sqrt{T}}$
  * Lower Integration Limit ($d_2$): $d_2 = d_1 - \sigma\sqrt{T} = \frac{\ln(S_0 / K) + \left(r - q - \frac{1}{2}\sigma^2\right)T}{\sigma\sqrt{T}}$
  * Cumulative Normal Integrals ($\Phi(d_1), \Phi(d_2)$): Standard normal CDFs representing risk-neutral probability components.

---

## 3. Option Greeks

> First and second-order partial derivative sensitivities derived in [Part 4: Option Greeks](./4-greeks.md).

* **Delta ($\Delta = \partial V / \partial S$)**
  * Call Delta ($\Delta_C$): $e^{-qT} \Phi(d_1)$
  * Put Delta ($\Delta_P$): $-e^{-qT} \Phi(-d_1)$
  * Financial Meaning: Option price sensitivity to a 1€ change in the underlying stock price.

* **Gamma ($\Gamma = \partial^2 V / \partial S^2$)**
  * Call and Put Gamma ($\Gamma$): $\frac{e^{-qT} \phi(d_1)}{S_0 \sigma \sqrt{T}}$
  * Financial Meaning: Sensitivity of Delta to stock price changes, representing portfolio convexity.

* **Vega ($\nu = \partial V / \partial \sigma$)**
  * Call and Put Vega ($\nu$): $S_0 e^{-qT} \phi(d_1) \sqrt{T}$
  * Financial Meaning: Option price sensitivity to a 1% change in the underlying volatility.

* **Theta ($\Theta = \partial V / \partial t$)**
  * Call Theta ($\Theta_C$): $-\frac{S_0 \sigma e^{-qT} \phi(d_1)}{2\sqrt{T}} + q S_0 e^{-qT} \Phi(d_1) - r K e^{-rT} \Phi(d_2)$
  * Put Theta ($\Theta_P$): $-\frac{S_0 \sigma e^{-qT} \phi(d_1)}{2\sqrt{T}} - q S_0 e^{-qT} \Phi(-d_1) + r K e^{-rT} \Phi(-d_2)$
  * Financial Meaning: Option price sensitivity to the passage of time (time decay).

* **Rho ($\rho = \partial V / \partial r$)**
  * Call Rho ($\rho_C$): $K T e^{-rT} \Phi(d_2)$
  * Put Rho ($\rho_P$): $-K T e^{-rT} \Phi(-d_2)$
  * Financial Meaning: Option price sensitivity to a 1% change in the risk-free interest rate.

* **Voma ($\text{Voma} = \partial^2 V / \partial \sigma^2 = \partial \nu / \partial \sigma$)**
  * Call and Put Voma: $\frac{\nu d_1 d_2}{\sigma}$
  * Financial Meaning: Sensitivity of Vega to volatility changes, representing second-order volatility convexity.
