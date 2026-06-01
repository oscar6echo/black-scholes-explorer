# Overview

> A comprehensive, self-contained mathematical tutorial series tracing options pricing from calculus fundamentals to market volatility surfaces.

Welcome to this self-contained, step-by-step mathematical tutorial series on the **Black-Scholes-Merton options pricing framework**.

This series is designed to take you from a basic understanding of ordinary calculus all the way to the complete analytical derivation of the European call and put options pricing formulas, as well as their risk sensitivities (the Greeks) and real-world market applications. The journey is divided into eight logical, sequential parts:

## Roadmap

> We trace the logical, sequential progression of options pricing across eight thematic parts.

### [1. Itô's Lemma](./1-ito-lemma.md)

Stochastic calculus differs fundamentally from ordinary calculus because Brownian motion paths are continuous but nowhere differentiable. This section derives the stochastic counterpart to the classical chain rule:

* **Calculus Foundations**: Reminders of total derivatives and Taylor series expansions.
* **Wiener Increments**: Why $dW = \epsilon\sqrt{dt}$ requires retaining second-order terms.
* **Rigorous Proof**: Mathematical evaluation of the expectation and variance of $(dW)^2$, proving that $(dW)^2 \to dt$ in the continuous limit.
* **The Itô Correction**: Constructing the general stochastic chain rule formula.

### [2. BSM PDE Derivation](./2-black-scholes-merton-pde.md)

Using the stochastic toolset, we model asset prices and construct a risk-free portfolio to eliminate uncertainty:

* **Geometric Brownian Motion (GBM)**: Why stock prices are modeled multiplicatively, proving they are lognormally distributed with shareholder limited liability.
* **Parameter Annualization**: Detailed explanation of why drift and volatility scale differently with time.
* **Merton's Portfolio**: Creating a dynamically hedged long-short portfolio ($\Pi = V - \Delta S$) to hedge away the random Wiener process ($dW$), incorporating continuous dividend yields ($q$).
* **No-Arbitrage Principle**: Linking the riskless portfolio to the risk-free rate $r$ to formulate the famous BSM Partial Differential Equation.

### [3. Closed-Form Solution](./3-closed-formula.md)

The final step is to solve the partial differential equation to yield exact pricing formulas:

* **Risk-Neutral Valuation**: Changing measures from physical returns to risk-free growth to formulate option pricing as a discounted expected payoff.
* **Integral Calculations**: Step-by-step integration of the lognormal PDF, applying change of variables, and completing the square to resolve standard normal probabilities.
* **The Closed-Form Solutions**: Formulating the call option pricing formula and deriving the put option pricing formula via **Put-Call Parity**.
* **Economic Interpretation**: Explaining the real-world significance of the Greeks and option parameters ($d_1, d_2, \Phi(d_1), \Phi(d_2)$).

### [4. Option Greeks](./4-greeks.md)

Option pricing is only half the battle; risk management requires knowing how sensitive these prices are to market movements. This part derives the exact formulas for option sensitivities (the Greeks):

* **The BSM Density Lemma**: Proving the fundamental standard normal density scaling relation ($S_0 e^{-qT} \phi(d_1) = K e^{-rT} \phi(d_2)$) that unlocks all derivatives.
* **Call Sensitivities**: Rigorous partial differentiation of the BSM Call formula to derive **Delta**, **Gamma**, **Vega**, **Theta**, and **Rho**.
* **Put Sensitivities via Parity**: Applying Put-Call Parity to instantly yield the Put option Greeks.

### [5. Theory Reference](./5-theory-reference.md)

A comprehensive consolidated reference sheet containing all stochastic, partial differential, closed-form pricing, and sensitivity equations derived in the theory section:

* **Unified Reference**: Quick access to all key formulas without flipping back through chapters.
* **Closed-Form Solutions**: Beautifully structured Call and Put option equations.
* **Option Greeks**: Delta, Gamma, Vega, Theta, Rho, and Voma summarized side-by-side in a compact, scroll-free table.

### [6. Intuition & Monte Carlo](./6-pricing-intuition.md)

This section bridges the gap between analytical formulas and numeric simulation, providing a strong geometric visualization of options pricing:

* **The Contribution Curve**: Deconstructing the pricing integral into a concrete geometric area.
* **The Four Panels**: Layer-by-layer build-up from stock price distribution and present-value discounting to payoff overlay.
* **Monte Carlo Simulation**: Showcasing how generating random lognormal price paths numerically approximates the pricing integral.

### [7. BSM Viewer](./7-bsm-viewer.md)

We introduce a 2D interactive analytics dashboard to visualize options prices and Greek sensitivity profiles across multiple spot, rate, and volatility dimensions:

* **Real-time Customization**: Adjusting Strike, Volatility, Rate, Maturity, and Dividends using interactive sliders.
* **Flexible Axes**: Choosing dynamic parameters to map on the X-axis and Y-axis for both Call and Put simultaneously.
* **Numerical Computations**: Reviewing exact calculated pricing and Greek values instantly.

### [8. Volatility Surface](./8-vol-surface.md)

Transitioning from theoretical models to the real world, we examine how the market uses and modifies the Black-Scholes framework:

* **Implied Volatility**: Solving for volatility numerically from market prices using Newton-Raphson solvers with Vega.
* **Symmetry and Skews**: Analyzing volatility smiles and negative skews, mapping them to risk-neutral fat tails and crash fear.
* **Breeden-Litzenberger Theorem**: Proving that the market's risk-neutral probability density can be extracted directly from option prices:
    $$f_{\mathbb{Q}}(K) = e^{rT} \frac{\partial^2 C}{\partial K^2}$$

## Annex

> Supplementary references compile essential Gaussian probability formulas and symbolic computer algebra proofs.

### [Math Reference](./annex-math.md)

Throughout this tutorial series, we rely extensively on standard normal random variables. The **Mathematical Annex** serves as a complete reference guide containing:

* Standard $\mathcal{N}(0, 1)$ and general $\mathcal{N}(\mu, \sigma^2)$ probability density functions (PDF, $\phi$) and cumulative distribution functions (CDF, $\Phi$).
* Formal mathematical proofs for normal symmetry properties, including $\Phi(-z) = 1 - \Phi(z)$.
* Rigorous derivations of odd and even standard normal moments (such as the fourth moment $\mathbb{E}[Z^4] = 3$) using the Moment Generating Function (MGF).

### [Python SymPy](./annex-python.md)

To ensure the absolute mathematical correctness of our analytical derivations, we leverage symbolic computation:

* **What SymPy Can Verify**: Symbolic differentiation of all European Call and Put Greeks, BSM Density Lemma algebraic cancelations, and Black-Scholes-Merton PDE residual verification.
* **Jupyter Notebook Verification**: Outlines the code implementation and links to our interactive verification notebook.

---

Ready to begin? Start with **[Part 1: 1. Itô's Lemma](./1-ito-lemma.md)**.
