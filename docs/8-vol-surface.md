# 8. Volatility Surface

> We bridge theory with reality, using market options prices to back out implied volatility and recover the true risk-neutral distribution.

## 1. Implied Volatility

> Since the analytical formula cannot be inverted for volatility, we employ iterative solvers like Newton-Raphson to find implied volatility.

Given a market-observed price $C_{\text{mkt}}$ for a European call option, the **implied volatility** $\sigma_{\text{impl}}$ is the unique volatility parameter that, when plugged into the BSM formula, reproduces the market price:

$$\text{BS}\left(S_0, K, T, r, q,\; \sigma_{\text{impl}}\right) = C_{\text{mkt}}$$

Because the BSM option price is a strictly increasing function of volatility ($\text{Vega} > 0$), there is a unique implied volatility for every valid option price. However, since the BSM formula cannot be analytically inverted to solve for $\sigma$, we must use numerical root-finding algorithms.

### The Newton-Raphson Solver

The standard method for solving implied volatility is the **Newton-Raphson method**. It uses the option Greek **Vega ($\nu$)** as the derivative to iteratively converge to the root:

$$\sigma_{n+1} = \sigma_n - \frac{\text{BS}\left(\sigma_n\right) - C_{\text{mkt}}}{\nu\left(\sigma_n\right)}$$

### Step-by-Step Algorithm

1. **Initialize**: Set an initial guess $\sigma_0$. A standard choice is the at-the-money (ATM) approximation:
    $$\sigma_0 \approx \sqrt{\frac{2\pi}{T}} \cdot \frac{C_{\text{mkt}}}{S_0}$$
2. **Evaluate**: Compute the BSM price $\text{BS}(\sigma_n)$ and the BSM Vega $\nu(\sigma_n) = S_0 e^{-qT} \phi(d_1) \sqrt{T}$ using the current guess.
3. **Iterate**: Calculate the next guess $\sigma_{n+1}$ using the Newton-Raphson formula.
4. **Terminate**: Repeat steps 2 and 3 until the absolute price error $|\text{BS}(\sigma_n) - C_{\text{mkt}}|$ falls below a small tolerance limit (e.g., $10^{-8}$). Because Vega is largest ATM, the algorithm converges extremely rapidly (typically in 3 to 5 iterations).

## 2. Smiles & Skews

> Plotting implied volatilities against strikes reveals market deviations from flat constant volatility, reflecting fear and tail risk.

Under BSM assumptions, implied volatility should be flat across all strikes $K$ and maturities $T$. In practice, plotting $\sigma_{\text{impl}}$ against the strike price $K$ reveals non-flat shapes:

* **Volatility Smile (Common in FX)**: Both out-of-the-money (OTM) puts ($K < S_0$) and OTM calls ($K > S_0$) trade at higher implied volatilities than at-the-money options, forming a U-shaped "smile."
* **Volatility Skew (Common in Equities)**: Implied volatility is highly asymmetric, sloping downwards. OTM puts trade at much higher implied volatilities than OTM calls. This "skew" reflects the market's heightened fear of large downward price jumps (often referred to as *crashophobia*).

This non-flat shape tells us that the market's true risk-neutral probability distribution has **fatter tails** (higher kurtosis) and a **fatter left tail** (negative skewness) than the theoretical lognormal distribution.

## 3. Breeden-Litzenberger

> This elegant theorem proves that the second derivative of call prices with respect to strike yields the exact risk-neutral probability density.

$$\boxed{\ \ \vphantom{\int} f_{\mathbb{Q}}(K) = e^{rT} \frac{\partial^2 C}{\partial K^2}\ \ }$$

### Formal Mathematical Proof

We begin with the risk-neutral pricing integral for a European call option as a function of the strike price $K$:

$$C(K) = e^{-rT} \int_{K}^{\infty} \left(S_T - K\right) f_{\mathbb{Q}}\left(S_T\right) dS_T$$

We differentiate the call price $C(K)$ with respect to $K$ by applying **Leibniz's Rule** for differentiating under the integral sign (for the general formulation and a rigorous multivariable chain rule proof, see [Annex A: Normal Distribution & Calculus Reference](./annex-math.md#5-leibniz-integral-rule-differentiating-under-the-integral-sign)):

$$\frac{d}{dx} \int_{g(x)}^{h(x)} H(x, y)\,dy = H\left(x, h(x)\right)h'(x) - H\left(x, g(x)\right)g'(x) + \int_{g(x)}^{h(x)} \frac{\partial H(x, y)}{\partial x}\,dy$$

Here, our integrand is $H(K, S_T) = (S_T - K) f_{\mathbb{Q}}(S_T)$, with integration limits $g(K) = K$ and $h(K) = \infty$.

1. **First Derivative ($\partial C / \partial K$)**:
    $$
    \begin{aligned}
    \frac{\partial C}{\partial K} &= e^{-rT} \left[ \lim_{S_T \to \infty} (S_T - K) f_{\mathbb{Q}}(S_T) \cdot (0) - (K - K) f_{\mathbb{Q}}(K) \cdot (1) \right. \\
    &\quad \left. + \int_{K}^{\infty} \frac{\partial}{\partial K} \left[ (S_T - K) f_{\mathbb{Q}}(S_T) \right] dS_T \right]
    \end{aligned}
    $$
    * The term at the upper limit vanishes because the probability density $f_{\mathbb{Q}}(S_T)$ decays to zero exponentially faster than the payoff grows.
    * The term at the lower limit vanishes because $(K - K) = 0$.
    * Evaluating the partial derivative inside the remaining integral:
        $$\frac{\partial}{\partial K} \left[ (S_T - K) f_{\mathbb{Q}}(S_T) \right] = -f_{\mathbb{Q}}(S_T)$$

    Substituting these back gives the first derivative:
    $$\frac{\partial C}{\partial K} = -e^{-rT} \int_{K}^{\infty} f_{\mathbb{Q}}\left(S_T\right) dS_T = -e^{-rT} \mathbb{P}^{\mathbb{Q}}\left(S_T > K\right)$$

    ::: info Probabilistic Insight 🤔
    The derivative of a call option price with respect to its strike price is proportional to the negative of the **risk-neutral probability** that the option expires in-the-money.
    :::

2. **Second Derivative ($\partial^2 C / \partial K^2$)**:
    We differentiate $\partial C / \partial K$ with respect to $K$ once more, applying Leibniz's Rule to the integral $\int_{K}^{\infty} f_{\mathbb{Q}}(S_T)\,dS_T$:
    $$\frac{\partial^2 C}{\partial K^2} = -e^{-rT} \frac{\partial}{\partial K} \int_{K}^{\infty} f_{\mathbb{Q}}\left(S_T\right) dS_T$$
    $$\frac{\partial^2 C}{\partial K^2} = -e^{-rT} \left[ 0 - f_{\mathbb{Q}}(K) \cdot (1) + 0 \right] = e^{-rT} f_{\mathbb{Q}}(K)$$

    Rearranging this yields the Breeden-Litzenberger Theorem:
    $$f_{\mathbb{Q}}(K) = e^{rT} \frac{\partial^2 C}{\partial K^2} \quad \checkmark$$

## 4. Implied Densities

> We outline the practical steps to numerically construct risk-neutral probability distributions from discrete market option quotes.

In practice, quantitative analysts use this theorem to extract the market's true probability distribution:

1. **Interpolate Volatilities**: Gather market implied volatilities $\sigma_{\text{impl}}(K)$ and interpolate them over a dense grid of strikes.
2. **Calculate Prices**: Compute BSM Call prices $C(K)$ across the strike grid using the interpolated volatilities.
3. **Numerical Differentiation**: Compute the second-order finite difference of the prices:
    $$\frac{\partial^2 C}{\partial K^2} \approx \frac{C(K + \Delta K) - 2C(K) + C(K - \Delta K)}{(\Delta K)^2}$$
4. **Construct Density**: Multiply by $e^{rT}$ to yield the **implied risk-neutral density** $f_{\mathbb{Q}}(K)$.

Comparing this implied density to the BSM flat-vol lognormal density highlights exactly how the market price incorporates jump risks and extreme events, showing that the volatility smile is the market's elegant correction to the lognormal approximation.

## Summary of the Series

This concludes our eight-part mathematical tutorial on options pricing:

1. **[Part 1: 1. Itô's Lemma](./1-ito-lemma.md)**: We derived the stochastic chain rule, showing why the continuous but volatile path of Brownian motion requires a second-order Itô correction.
2. **[Part 2: 2. BSM PDE Derivation](./2-black-scholes-merton-pde.md)**: We modeled asset prices under Geometric Brownian Motion with continuous dividends and constructed Merton's dynamically hedged risk-free portfolio to cancel out uncertainty, giving rise to the BSM PDE.
3. **[Part 3: 3. Closed-Form Solution](./3-closed-formula.md)**: We solved the PDE by transitioning to the risk-neutral pricing measure and integrating the lognormal stock distribution step-by-step using change of variables and completing the square.
4. **[Part 4: 4. Option Greeks](./4-greeks.md)**: We proved the BSM Density Lemma and differentiated the call and put formulas to derive closed-form sensitivities (Delta, Gamma, Vega, Theta, Rho).
5. **[Part 5: 5. Theory Reference](./5-theory-reference.md)**: We consolidated all stochastic, partial differential, closed-form, and Greek formulas into a compact, scroll-free table for easy reference.
6. **[Part 6: 6. Intuition & Monte Carlo](./6-pricing-intuition.md)**: We explored the geometric representation of the pricing integral as the area under the Contribution Curve and outlined how Monte Carlo simulation numerically samples this area.
7. **[Part 7: 7. BSM Viewer](./7-bsm-viewer.md)**: We introduced a 2D interactive analytics dashboard to visualize options prices and Greek sensitivity profiles across multiple spot, rate, and volatility dimensions.
8. **[Part 8: 8. Volatility Surface](./8-vol-surface.md)**: We bridged theory with reality by examining how implied volatility is computed numerically using Newton-Raphson, and proved the Breeden-Litzenberger Theorem to extract market-implied probability densities.

This unified quantitative framework serves as the absolute foundation for modern derivatives trading, risk management, and financial engineering.
