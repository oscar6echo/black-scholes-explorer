# 6. Intuition & Monte Carlo

> We explore the geometric representation of options pricing as an area under a curve and numerically simulate prices via Monte Carlo.

An option price is mathematically defined as a definite integral. While the analytical formulas derived in [Part 3: BSM Analytical Pricing Formulas](./3-closed-formula.md) solve this integral exactly, this section explores a powerful geometric representation that makes options pricing visible and intuitive.

## 1. Pricing as an Area

> Representing the expectation integral as a continuous product transforms option pricing into a visual area-under-the-curve problem.

Under the risk-neutral measure $\mathbb{Q}$, the fair value today of a European call option is the discounted expected payoff:

$$C = e^{-rT} \int_{K}^{\infty} \left(S_T - K\right) f_{\mathbb{Q}}\left(S_T\right) dS_T$$

We can rewrite this pricing integral as a single continuous product over the entire price domain $[0, \infty)$:

$$C = \int_{0}^{\infty} \max\left(S_T - K,\, 0\right) \cdot e^{-rT} \cdot f_{\mathbb{Q}}\left(S_T\right) dS_T$$

This expression reveals that the option price is exactly the **area under a curve**, which we call the **Contribution Curve**.

## 2. The Four-Panel View

> We break down the mathematical components of the call price integrand to construct the option's contribution curve.

To understand how this area is built, we decompose the integrand layer by layer into **Four Panels**:

### Panel A: Future Price Distribution

We start with the risk-neutral lognormal probability density function $f_{\mathbb{Q}}(S_T)$ of the stock price at maturity $T$, incorporating the continuous dividend yield $q$:

$$f_{\mathbb{Q}}(S_T) = \frac{1}{S_T \sigma \sqrt{2\pi T}} \exp\left( -\frac{\left(\ln(S_T/S_0) - \left(r - q - \frac{1}{2}\sigma^2\right)T\right)^2}{2\sigma^2 T} \right)$$

This curve tells us **how likely each future stock price scenario is** under the pricing measure $\mathbb{Q}$. The distribution has a floor at zero ($S_T > 0$) and is skewed to the right.

### Panel B: Discounted Density

Next, we multiply the future probability density by the risk-free discount factor $e^{-rT}$:

$$\text{PV-weighted density} = e^{-rT} \cdot f_{\mathbb{Q}}(S_T)$$

This operation shifts probability mass from the future to today. It does not alter the skew or shape of the lognormal curve; it simply scales it down to represent the **present-value weight** attached to each future price scenario.

### Panel C: Payoff Overlay

We introduce the European call option payoff function:
$$\text{Payoff}(S_T) = \max(S_T - K, 0)$$

The payoff is strictly zero to the left of the strike price $K$ (where the option expires out-of-the-money) and rises linearly with a slope of $1$ to the right of $K$ (where the option expires in-the-money). Overlaying the payoff curve highlights **which stock price scenarios contribute to the option's value** and which contribute nothing.

### Panel D: The Contribution Curve

Finally, we multiply the payoff by the discounted density:

$$\text{Contribution}(S_T) = \max\left(S_T - K,\, 0\right) \cdot e^{-rT} \cdot f_{\mathbb{Q}}\left(S_T\right)$$

This product forms the **Contribution Curve**:

1. **Left of the Strike ($S_T \le K$)**: The contribution is exactly $0$ because the payoff is zero.
2. **Right of the Strike ($S_T > K$)**: The curve rises as the payoff increases, peaks, and then falls back toward zero as the probability of reaching extremely high stock prices decays exponentially.

The fair price of the call option is the **area under this contribution curve**. Each point on this curve represents the present-value contribution of a specific future price scenario to today's option value.

<IframeViewer src="/widgets/four-panel.html" height="720px" title="Option Pricing Geometry (Four-Panel)" />

::: tip Companion Jupyter Notebook 📓
For a downloadable, pre-rendered Python implementation of this geometric pricing visualizer (complete with convergence error plots comparing Plain MC and Antithetic Variates, the Four-Panel subplots, and Greek deformation curves), see the companion [3-monte-carlo-pricing.ipynb](https://github.com/oscar6echo/black-scholes-explorer/blob/main/python/3-monte-carlo-pricing.ipynb) notebook.
:::

## 3. Monte Carlo Pricing

> When analytical solutions are out of reach, we can numerically approximate the pricing area using stochastic path simulation.

Rather than solving the BSM PDE or integrating analytically, **Monte Carlo simulation** computes option prices by numerically approximating this geometric area.

### Step-by-Step Monte Carlo Algorithm

1. **Simulate Paths**: Draw $N$ random samples of stock price $S_T^{(i)}$ at maturity $T$ under the risk-neutral measure $\mathbb{Q}$:
    $$S_T^{(i)} = S_0 \exp\left( \left(r - q - \frac{1}{2}\sigma^2\right)T + \sigma \sqrt{T} Z^{(i)} \right)$$
    where $Z^{(i)} \sim \mathcal{N}(0, 1)$ are independent standard normal variables.
2. **Evaluate Payoff**: Compute the payoff $\max(S_T^{(i)} - K, 0)$ for each simulated stock price.
3. **Average and Discount**: Take the average payoff across all simulations and discount it to the present:
    $$\hat{C} = e^{-rT} \cdot \frac{1}{N} \sum_{i=1}^{N} \max\left(S_T^{(i)} - K, \, 0\right)$$

By the **Law of Large Numbers**, as the number of simulated paths $N \to \infty$, the sample average $\hat{C}$ converges exactly to the analytical area under the Contribution Curve ($C$).

## 4. Curve Deformation

> Option Greeks represent the sensitivity of the contribution curve's geometric shape to changes in market parameters.

We can understand the option Greeks geometrically by observing how changing different market parameters deforms the area under the Contribution Curve (Panel D):

* **Spot Price $S_0$ (Delta)**: Increasing $S_0$ shifts the lognormal price distribution (Panel A) to the right. This moves the bulk of the probability mass above the strike price $K$, expanding the area under the Contribution Curve and increasing the option price.
* **Strike Price $K$**: Increasing $K$ shifts the payoff cutoff (Panel C) to the right. This truncates the left side of the Contribution Curve, reducing the overall area and lowering the option price.
* **Volatility $\sigma$ (Vega)**: Increasing $\sigma$ flattens and widens the lognormal distribution (Panel A). Although the peak of the probability density drops, the right tail becomes significantly fatter. Since options have unlimited upside and capped downside (losses are limited to zero), this wider spread increases the area under the curve, raising the option price.
* **Time to Maturity $T$ (Theta)**: As time passes (maturity $T$ decreases), the lognormal distribution collapses toward the forward stock price, reducing uncertainty. The distribution narrows, which shrinks the fatter right tail and collapses the area under the Contribution Curve, causing option value decay.
* **Dividend Yield $q$**: Increasing $q$ lowers the risk-neutral drift ($r - q$), which shifts the future stock price distribution (Panel A) to the left. This reduces the probability of in-the-money scenarios, decreasing the area under the curve and lowering the call price.

### Next Steps

In the next section, [7. BSM Viewer](./7-bsm-viewer.md), we will introduce a 2D interactive analytics dashboard to visualize BSM option prices and Greek sensitivity profiles across multiple spot, rate, and volatility dimensions.
