# 2. BSM PDE Derivation

> We model stock prices via Geometric Brownian Motion and construct a dynamically hedged risk-free portfolio to derive the BSM partial differential equation. BSM stands for Black Scholes Merton (see [why](#7-takeaways--limits)).

## 1. Prerequisites

> We review the stochastic drift-diffusion Wiener increments and standard normal properties that serve as our building blocks.

Before starting the derivation, we recall the key elements of stochastic processes established in [Part 1](./1-ito-lemma.md):

* An **Itô process** is a general drift-diffusion process:
    $$dx = a\,dt + b\,dW$$
* The **Wiener process increment** $dW$ is:
    $$dW = \epsilon \sqrt{dt}, \quad \text{where } \epsilon \sim \mathcal{N}(0, 1)$$
    For a comprehensive review of standard normal probability functions, definitions, and properties, see the [Annex A: Normal Distribution & Calculus Reference](./annex-math.md).
* **Itô's Lemma** provides the stochastic total derivative for any function $V(S, t)$ depending on an Itô process $S$:
    $$dV = \left(\frac{\partial V}{\partial t} + a\frac{\partial V}{\partial S} + \frac{1}{2}b^2\frac{\partial^2 V}{\partial S^2}\right)dt + b\frac{\partial V}{\partial S}\,dW$$

## 2. Stock Price Dynamics

> We introduce Geometric Brownian Motion to model multiplicative stock price returns with shareholder limited liability.

To derive the pricing equation, we must first choose a mathematical model for the underlying stock price $S_t$.

### The Naive Model (And Why It Fails)

A simple assumption would be that the stock price changes by a constant amount plus some constant random fluctuation:
$$dS = \mu\,dt + \sigma\,dW$$

If we look at the percentage returns by dividing by $S$:
$$\frac{dS}{S} = \frac{\mu}{S}\,dt + \frac{\sigma}{S}\,dW$$

This is a poor model because as the stock price $S$ grows, the percentage return drops towards zero. In reality, investors expect the same percentage return regardless of the stock's absolute price level. For instance, two companies with identical business fundamentals should yield similar percentage returns, even if one trades at \$10 and the other at \$20.

### Geometric Brownian Motion (GBM) with Dividends

To fix this, we scale both the drift and diffusion terms by the stock price $S$. Furthermore, we incorporate a continuous **dividend yield** $q$ paid by the stock. The dividends continuously reduce the stock price. The resulting SDE for the stock price itself is:

$$dS = (\mu - q)S\,dt + \sigma S\,dW$$

Dividing by $S$ gives a constant expected price return and a constant percentage volatility:

$$\frac{dS}{S} = (\mu - q)\,dt + \sigma\,dW$$

Where:

* $\mu$ is the expected total rate of stock return (drift, representing capital gain plus reinvested dividends).
* $q$ is the continuous dividend yield paid to shareholders.
* $\sigma$ is the volatility of the stock price (diffusion).

::: tip Why "Per Year"? (Annualization) 🤔
In quantitative finance, the parameters $\mu$, $q$, and $\sigma$ are conventionally expressed **"per year"** (annualized). This is because the time variable $t$ is measured in years (where $t = 1.0$ is exactly one year).
This time measurement convention is critical for consistent scaling:

1. **Drift scales linearly with time**: Expected return over time $dt$ is $\mu\,dt$. For example, an annual return of $10\%$ ($\mu = 0.10$) scales to a daily return of $0.10 / 252 \approx 0.04\%$ (assuming 252 trading days).
2. **Volatility scales with the square root of time**: The standard deviation of stock returns over $dt$ is $\sigma\sqrt{dt}$. For example, an annual volatility of $20\%$ ($\sigma = 0.20$) scales to a daily volatility of $0.20 / \sqrt{252} \approx 1.26\%$.

Measuring these parameters on an annualized basis ensures mathematical consistency for any maturity $T$ (e.g., $T=0.25$ for a 3-month option) and allows comparison of volatility across different financial instruments.
:::

### Why Stock Prices are Lognormally Distributed

Under this Geometric Brownian Motion model, stock prices follow a **lognormal distribution**. Let's examine the mathematical and physical reasons for this in detail.

#### 1. Mathematical Proof (Integrating the SDE)

Using Itô's Lemma, we can solve the SDE $dS = (\mu - q)S\,dt + \sigma S\,dW$. Let $Y = \ln S$. The partial derivatives are:
$$\frac{\partial Y}{\partial S} = \frac{1}{S}, \quad \frac{\partial^2 Y}{\partial S^2} = -\frac{1}{S^2}, \quad \frac{\partial Y}{\partial t} = 0$$

Applying Itô's Lemma:
$$d(\ln S) = \left(0 + (\mu - q) S \left(\frac{1}{S}\right) + \frac{1}{2}\sigma^2 S^2 \left(-\frac{1}{S^2}\right)\right)dt + \sigma S \left(\frac{1}{S}\right)dW$$

$$d(\ln S) = \left(\mu - q - \frac{1}{2}\sigma^2\right)dt + \sigma\,dW$$

Integrating both sides from $0$ to $t$:
$$\ln S_t - \ln S_0 = \left(\mu - q - \frac{1}{2}\sigma^2\right)t + \sigma W_t$$

$$\ln\left(\frac{S_t}{S_0}\right) = \left(\mu - q - \frac{1}{2}\sigma^2\right)t + \sigma W_t$$

Since the Wiener process $W_t$ is normally distributed with mean $0$ and variance $t$ ($W_t \sim \mathcal{N}(0, t)$), the log stock price $\ln S_t$ is normally distributed:
$$\ln S_t \sim \mathcal{N}\left(\ln S_0 + \left(\mu - q - \frac{1}{2}\sigma^2\right)t, \, \sigma^2 t\right)$$

Because the *logarithm* of the stock price is normally distributed, the stock price itself is **lognormally distributed**:
$$S_t = S_0 \exp\left(\left(\mu - q - \frac{1}{2}\sigma^2\right)t + \sigma W_t\right)$$

#### 2. Physical and Economic Intuition

* **Strict Positivity (Equity Limited Liability)**: The stock price is given by $S_t = S_0 e^{\text{Normal}}$. Since the exponential function $e^x$ is strictly positive for any real value of $x$, the stock price $S_t$ can never fall below zero ($S_t > 0$). This perfectly reflects the limited liability of shareholders, who cannot lose more than their initial investment. (Under the naive additive model $dS = \mu\,dt + \sigma\,dW$, stock prices are normally distributed and can become negative, which is economically impossible).
* **Compounding (Central Limit Theorem)**: Over time, stock returns are compounded multiplicatively:
    $$S_t = S_0 \times (1 + R_1) \times (1 + R_2) \times \cdots \times (1 + R_n)$$
    Taking the natural logarithm of both sides transforms multiplication into addition:
    $$\ln S_t = \ln S_0 + \ln(1+R_1) + \ln(1+R_2) + \cdots + \ln(1+R_n)$$
    By the Central Limit Theorem, the sum of a large number of independent random log-returns converges to a normal distribution. Therefore, $\ln S_t$ becomes normally distributed, and the stock price $S_t$ becomes lognormally distributed.

<IframeViewer src="/widgets/lognormal.html" height="445px" title="Lognormal PDF Explorer" />

::: info Geometric Relationship: Mean, Median, and Mode 🤔
Because stock prices modeled by Geometric Brownian Motion cannot fall below zero (shareholder limited liability) but have unbounded positive potential, the resulting lognormal probability distribution is **positively skewed** (skewed to the right). This skewness creates a distinct geometric separation between three key central metrics:

* **Mode ($S_0 e^{(\mu - q - 1.5\sigma^2)T}$)**: The peak of the curve—representing the single most probable terminal stock price.
* **Median ($S_0 e^{(\mu - q - 0.5\sigma^2)T}$)**: The 50th percentile—exactly half of the simulated price paths end up below this value and half above.
* **Mean ($S_0 e^{(\mu - q)T}$)**: The expected value under the probability measure, heavily pulled to the right by a few extremely high-priced paths, making it the largest of the three.

As volatility ($\sigma$) or maturity ($T$) increases, the skewness of the distribution intensifies. This causes the peak (**Mode**) to shift sharply to the left towards zero, while the **Mean** remains constant or increases. In high-volatility environments, the single most likely outcome (Mode) is very close to zero, even though the expected value (Mean) remains high due to a tiny probability of astronomical positive returns.
:::

::: tip Companion Jupyter Notebook 📓
For an interactive Python implementation of this SDE simulation (complete with path generators, terminal price histograms, and parameter sensitivity plots), you can view the <a href="/notebooks/2-lognormal-simulation.html" target="_blank" rel="noopener noreferrer">Pre-rendered Simulation Page</a> online, or download the raw [2-lognormal-simulation.ipynb](https://github.com/oscar6echo/black-scholes-explorer/blob/main/python/2-lognormal-simulation.ipynb) notebook to run locally.
:::

## 3. Constructing the Delta-Hedged Portfolio

> By combining the derivative and the underlying stock, Merton constructed a dynamically hedged portfolio that eliminates risk.

Robert C. Merton's key insight was to construct a portfolio that eliminates all stochastic uncertainty ($dW$) by combining the option and the underlying stock.

Consider a portfolio $\Pi$ constructed today at time $t$ consisting of:

1. **Long** 1 unit of the derivative $V(S, t)$ (an asset, $+V$).
2. **Short** $\Delta$ units of the underlying stock $S$ (a liability, $-\Delta S$).

The value of this portfolio is:

$$\Pi = V - \Delta \cdot S$$

Over an infinitesimal time step $dt$, two changes affect the portfolio value:

1. The changes in the capital value of the assets ($dV - \Delta\,dS$).
2. The dividend payment that must be paid to the lender of the shorted stock over $dt$, which costs us $-\Delta \cdot q S\,dt$.

Thus, the total change in the portfolio value $d\Pi$ is:

$$d\Pi = dV - \Delta\,dS - \Delta \cdot q S\,dt$$

::: info Dynamic Hedging 🤔
Comparing our dividend-adjusted stock price SDE $dS = (\mu - q)S\,dt + \sigma S\,dW$ to the general Itô process SDE $dS = a\,dt + b\,dW$, we have:
$$a = (\mu - q)S \quad \text{and} \quad b = \sigma S$$
:::

## 4. Applying Itô's Lemma

> We apply the stochastic chain rule to compute the change in the derivative's value over an infinitesimal time step.

Applying Itô's lemma to the derivative value $V(S, t)$ gives the change in option price $dV$:

$$dV = \left(\frac{\partial V}{\partial t} + (\mu - q) S\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}\right)dt + \sigma S\frac{\partial V}{\partial S}\,dW$$

Now, we substitute $dV$, the stock dynamics $dS = (\mu - q)S\,dt + \sigma S\,dW$, and the short dividend payment $-\Delta \cdot q S\,dt$ into our portfolio change equation $d\Pi = dV - \Delta\,dS - \Delta \cdot q S\,dt$:

$$d\Pi = \left(\frac{\partial V}{\partial t} + (\mu - q) S\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}\right)dt + \sigma S\frac{\partial V}{\partial S}\,dW - \Delta \left( (\mu - q)S\,dt + \sigma S\,dW \right) - \Delta q S\,dt$$

Grouping the terms into deterministic ($dt$) and stochastic ($dW$) components:

$$d\Pi = \left(\frac{\partial V}{\partial t} + (\mu - q) S\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - \Delta (\mu - q) S - \Delta q S\right)dt + \sigma S\left(\frac{\partial V}{\partial S} - \Delta\right)dW$$

Notice that the last two terms in the $dt$ component simplify:
$$-\Delta (\mu - q) S - \Delta q S = -\Delta \mu S + \Delta q S - \Delta q S = -\Delta \mu S$$

So, the portfolio change becomes:
$$d\Pi = \left(\frac{\partial V}{\partial t} + (\mu - q) S\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - \Delta \mu S\right)dt + \sigma S\left(\frac{\partial V}{\partial S} - \Delta\right)dW$$

To eliminate the stochastic uncertainty ($dW$), we choose the hedging ratio $\Delta$ to be:

$$\Delta = \frac{\partial V}{\partial S}$$

By setting $\Delta = \frac{\partial V}{\partial S}$, the $dW$ term vanishes:
$$\sigma S\left(\frac{\partial V}{\partial S} - \Delta\right)dW = 0$$

Simultaneously, the real-world drift terms containing $\mu$ cancel out:
$$(\mu - q) S \frac{\partial V}{\partial S} - \mu S \frac{\partial V}{\partial S} = -q S \frac{\partial V}{\partial S}$$

This leaves us with a completely deterministic change in portfolio value:

$$d\Pi = \left(\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - q S \frac{\partial V}{\partial S}\right)dt$$

Since the equation contains no $dW$ terms, the portfolio is **risk-free** over the interval $dt$.

## 5. The No-Arbitrage Condition

> Linking the dynamically hedged riskless portfolio to the risk-free rate of return eliminates any opportunities for arbitrage.

Under the no-arbitrage principle, any risk-free asset must earn the risk-free interest rate $r$. If it returned more, an investor could borrow at rate $r$ and invest in the portfolio to lock in riskless profits. If it returned less, the investor could short-sell the portfolio and invest the proceeds at rate $r$.

Therefore, the portfolio's return must satisfy:

$$d\Pi = r\Pi\,dt$$

Substituting $\Pi = V - \Delta S$ (where $\Delta = \frac{\partial V}{\partial S}$):

$$d\Pi = r\left(V - \frac{\partial V}{\partial S}S\right)dt$$

## 6. BSM PDE & Greeks

> Setting the portfolio return to the risk-free rate yields the foundational Black-Scholes-Merton partial differential equation.

We now equate the two expressions for the risk-free change $d\Pi$:

$$\left(\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - q S \frac{\partial V}{\partial S}\right)dt = r\left(V - \frac{\partial V}{\partial S}S\right)dt$$

Dividing both sides by $dt$:
$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - q S \frac{\partial V}{\partial S} = rV - rS\frac{\partial V}{\partial S}$$

Rearranging all terms to one side yields the **dividend-adjusted Black-Scholes-Merton partial differential equation**:

$$\boxed{\ \ \vphantom{\int} \frac{\partial V}{\partial t} + (r - q)S\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - rV = 0\ \ }$$

### Writing BSM via the Greeks

The BSM PDE can also be represented using standard option **Greeks**:

| Greek | Meaning | Derivative |
| :---: | :--- | :---: |
| $\Theta$ | time decay | $\partial V / \partial t$ |
| $\Delta$ | sensitivity to the stock price | $\partial V / \partial S$ |
| $\Gamma$ | rate of change of $\Delta$ | $\partial^2 V / \partial S^2$ |

$$\Theta + (r - q)S\Delta + \frac{1}{2}\sigma^2 S^2 \Gamma - rV = 0$$

::: tip Symbolic Verification
You can formally verify that our option pricing models satisfy the Black-Scholes-Merton PDE symbolically using Python and SymPy. See [Annex B: Symbolic Verification via Python & SymPy](./annex-python.md), the <a href="/notebooks/1-sympy-verification.html" target="_blank" rel="noopener noreferrer">Pre-rendered SymPy Page</a> online, or download the raw [1-sympy-verification.ipynb](https://github.com/oscar6echo/black-scholes-explorer/blob/main/python/1-sympy-verification.ipynb) notebook to run locally.
:::

## 7. Takeaways & Limits

> The BSM framework rests on critical assumptions like continuous hedging and constant volatility, which we review.

* **Drift Cancellation**: The real-world expected stock return $\mu$ does not appear in the PDE. This is because the option is priced relative to the underlying stock, and the drift is hedged away. The stock parameters that remain are the volatility $\sigma$ and dividend yield $q$.
* **Continuous Rebalancing**: The hedging ratio $\Delta = \frac{\partial V}{\partial S}$ is not constant. It changes dynamically as time passes and the stock price moves. Keeping the portfolio risk-free requires continuous rebalancing.
* **Model Assumptions**:
  * Frictionless markets (no transaction costs, taxes, or borrowing fees for shorting).
  * Constant risk-free rate $r$, dividend yield $q$, and stock volatility $\sigma$.
  * Continuous trading is possible.

::: info The Triad: Black, Scholes, and Merton 🤔
Why are three people credited with the option pricing formula, and what were their individual contributions?

1. **Fischer Black & Myron Scholes (1973)**:
   In their seminal paper *"The Pricing of Options and Corporate Liabilities"* (Journal of Political Economy), Black and Scholes developed the core mathematical model. They introduced the revolutionary concept of pricing the option relative to the stock using a replicating portfolio, which led to the formulation of the Black-Scholes partial differential equation (PDE) and its boundary conditions.

2. **Robert C. Merton (1973)**:
   Publishing *"Theory of Rational Option Pricing"* in the same year, Merton was a close collaborator who made vital conceptual and mathematical breakthroughs:
   * **Stochastic Calculus Rigor**: He formalized the model using continuous-time stochastic calculus (Itô's Lemma).
   * **Drift Cancellation Proof**: He mathematically proved that continuous, dynamic rebalancing creates a risk-free portfolio, showing that the stock's expected growth rate ($\mu$) completely cancels out.
   * **Dividends & Extensions**: He extended the model to include continuous dividend yields ($q$) and path-dependent barriers.

3. **The Nobel Prize (1997)**:
   Myron Scholes and Robert C. Merton were awarded the Nobel Prize in Economics in 1997 *"for a new method to determine the value of derivatives."* Fischer Black had unfortunately passed away in 1995 from cancer at the age of 55. The Nobel Prize is not awarded posthumously, but the Nobel Committee explicitly honored Black as a key co-founder whose contribution was of equal stature.
:::

---

### What's Next?

In the next section, [3. Closed-Form Solution](./3-closed-formula.md), we will solve this partial differential equation by transitioning to the risk-neutral measure and integrating the lognormal stock price PDF, yielding the closed-form option pricing solutions for European call and put options.
