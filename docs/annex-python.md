# Python SymPy

> We leverage Python's SymPy library to programmatically verify BSM analytical pricing formulas, Greeks, and PDE residuals.

This annex introduces the scope of symbolic verification in options pricing, outlines key code implementations, and provides direct access to our suite of quantitative Jupyter notebooks (available both as online static HTML pages and as clean repository source files for local execution).

## 1. Verification Scope

> Defining the exact boundaries of computer algebra helps distinguish what can be verified symbolically versus numerically.

SymPy excels at deterministic calculus and algebraic simplification. However, certain parts of stochastic calculus are outside its native capabilities.

### What SymPy Can Verify

* **Algebraic Symmetries**: Proving the BSM Density Lemma and Put-Call Parity.
* **Symbolic Differentiation**: Differentiating $C(S_0, T)$ and $P(S_0, T)$ to yield Delta, Gamma, Vega, Voma, Theta, and Rho.
* **PDE Residuals**: Evaluating the Black-Scholes-Merton PDE residual to confirm it simplifies exactly to zero.
* **High-Precision Valuation**: Compiling symbolic expressions into numerical functions to verify consistency against SciPy to $15$ decimal places.

### What SymPy Cannot Verify

* **Stochastic Calculus (Itô's Lemma SDEs)**: SymPy does not natively support stochastic processes, Wiener increments ($dW$), or stochastic rules (such as $(dW)^2 = dt$). These limits must be resolved analytically.
* **Stochastic Expectation Limits**: Proving that the variance of $(dW)^2$ approaches zero as $dt \to 0$.
* **Monte Carlo Statistical Convergence**: This is a statistical simulation process that must be validated numerically using NumPy/SciPy.
* **General Leibniz Integral Rule**: Differentiating under the integral sign with general abstract boundaries and integrands.

## 2. Python Setup

> Setting up real positive variables and normal distribution lambdas establishes our symbolic computation environment.

In SymPy, we define the parameters as positive real symbolic variables. This assumption is crucial because it allows SymPy to simplify complex logarithmic and square root expressions (such as $\ln(S_0 / K)$ and $\sqrt{T}$) without generating branches for negative or complex numbers.

The standard normal Cumulative Distribution Function (CDF) $\Phi(z)$ is defined using the built-in error function `sp.erf`:

$$\Phi(z) = \frac{1}{2} \left[ 1 + \text{erf}\left(\frac{z}{\sqrt{2}}\right) \right]$$

```python
import sympy as sp

# Initialize pretty printing for symbols and fractions
sp.init_printing(use_unicode=True)

# Declare parameters as positive real symbols
S, K, T, r, q, sigma = sp.symbols('S K T r q sigma', positive=True)

# Define standard normal PDF and CDF
phi = lambda x: (1 / sp.sqrt(2 * sp.pi)) * sp.exp(-x**2 / 2)
Phi = lambda x: (1 + sp.erf(x / sp.sqrt(2))) / 2

# Integration limits
d1 = (sp.log(S/K) + (r - q + sigma**2 / 2) * T) / (sigma * sp.sqrt(T))
d2 = d1 - sigma * sp.sqrt(T)

# Closed-form European Call Pricing Formula
C = S * sp.exp(-q * T) * Phi(d1) - K * sp.exp(-r * T) * Phi(d2)
```

## 3. Proof Examples

> We present concise Python snippets showing the symbolic verification of the density lemma, Voma, and PDE residuals.

Below are short code snippets demonstrating how SymPy simplifies these derivations.

### A. Verifying the BSM Density Lemma

We verify that the density difference $S_0 e^{-qT} \phi(d_1) - K e^{-rT} \phi(d_2)$ simplifies to exactly `0`:

```python
lhs = S * sp.exp(-q * T) * phi(d1)
rhs = K * sp.exp(-r * T) * phi(d2)

# Symbolic simplification
diff_density = sp.simplify(lhs - rhs)
print(f"LHS - RHS simplifies to: {diff_density}")  # Output: 0
```

### B. Differentiating and Verifying Voma

Voma measures the second-order sensitivity to volatility. We differentiate Call price $C$ twice with respect to $\sigma$, and check if it matches the analytical formula $\nu d_1 d_2 / \sigma$:

```python
# Raw symbolic derivative
sp_voma = sp.diff(C, sigma, 2)

# Analytical closed-form
vega = S * sp.exp(-q * T) * phi(d1) * sp.sqrt(T)
formula_voma = vega * d1 * d2 / sigma

# Check difference
diff_voma = sp.simplify(sp_voma - formula_voma)
print(f"Difference: {diff_voma}")  # Output: 0
```

### C. Verifying the BSM PDE Residual

We verify that the BSM pricing formulas satisfy the PDE by checking that the residual simplifies to `0`:

```python
# Evaluate Call BSM PDE residual
residual_c = sp.diff(C, T) - (1/2) * sigma**2 * S**2 * sp.diff(C, S, 2) - (r - q) * S * sp.diff(C, S) + r * C

pde_check = sp.simplify(residual_c)
print(f"PDE Residual simplifies to: {pde_check}")  # Output: 0
```

## 4. Quantitative Notebooks

> Companion notebooks offer complete symbolic verification, lognormal path simulation, and Monte Carlo option pricing implementations.

To support different learning environments, we provide three quantitative Jupyter notebooks. For each notebook, you can access both the pre-rendered online version and the raw repository file:

### A. BSM Symbolic Verification
Verify Call and Put analytical formulas, all first and second-order Greeks (Delta, Gamma, Vega, Voma, Theta, Rho), and Black-Scholes PDE residuals.
* 🌐 **Static HTML Viewer**: <a href="/notebooks/1-sympy-verification.html" target="_blank" rel="noopener noreferrer">Pre-rendered SymPy Verification Page</a> — *View complete, pre-calculated algebraic equations and numerical outputs instantly online.*
* 🐍 **Raw Jupyter Notebook**: [1-sympy-verification.ipynb](https://github.com/oscar6echo/black-scholes-explorer/blob/main/python/1-sympy-verification.ipynb) — *Download and run locally to modify or execute cells.*

### B. Lognormal Path Simulation
Simulate asset price paths under Geometric Brownian Motion (GBM), verify terminal price distribution lognormality, and visualize convergence dynamics.
* 🌐 **Static HTML Viewer**: <a href="/notebooks/2-lognormal-simulation.html" target="_blank" rel="noopener noreferrer">Pre-rendered Lognormal Simulation Page</a> — *View complete, pre-calculated path simulations and charts instantly online.*
* 🐍 **Raw Jupyter Notebook**: [2-lognormal-simulation.ipynb](https://github.com/oscar6echo/black-scholes-explorer/blob/main/python/2-lognormal-simulation.ipynb) — *Download and run locally to modify or execute cells.*

### C. Monte Carlo Option Pricing
Implement pricing visualizers, evaluate convergence errors comparing Plain Monte Carlo and Antithetic Variates, and run parameter deformation analyses.
* 🌐 **Static HTML Viewer**: <a href="/notebooks/3-monte-carlo-pricing.html" target="_blank" rel="noopener noreferrer">Pre-rendered Monte Carlo Pricing Page</a> — *View complete, pre-calculated convergence reports and charts instantly online.*
* 🐍 **Raw Jupyter Notebook**: [3-monte-carlo-pricing.ipynb](https://github.com/oscar6echo/black-scholes-explorer/blob/main/python/3-monte-carlo-pricing.ipynb) — *Download and run locally to modify or execute cells.*

::: info Jupyter Notebook Execution Details 📓
The raw Jupyter Notebook files (`.ipynb`) in our repository are saved **without cell outputs** to keep the codebase lightweight and avoid git tracking noise.
* **Online viewing**: Use the **Static HTML Viewer** links above to view full, pre-calculated outputs (including symbols, tables, and graphs) directly in your browser.
* **Local execution**: The raw notebooks must be run locally. Clone the repository, set up your Python environment, and run them interactively to explore or modify the simulation and verification steps.
:::
