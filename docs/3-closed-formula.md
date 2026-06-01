# 3. Closed-Form Solution

> We derive the closed-form analytical call and put pricing formulas by integrating the discounted option payoffs under risk-neutral probability.

## 1. Prerequisites

> We establish the risk-neutral stochastic framework and change of measure that simplify options pricing.

In [Part 2](./2-black-scholes-merton-pde.md), we established the following:

* Under the physical measure, the stock price dynamics follow **Geometric Brownian Motion (GBM)** with dividends:
    $$dS = (\mu - q)S\,dt + \sigma S\,dW$$
* Applying Itô's Lemma and constructing a delta-hedged portfolio led to the **Black-Scholes-Merton (BSM) PDE**:
    $$\frac{\partial V}{\partial t} + (r-q)S\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - rV = 0$$

A key observation is that the real-world drift $\mu$ has completely vanished from the BSM PDE. Since the option's value is independent of the expected return of the stock, we can use the **Change of Measure** technique.

## 2. Risk-Neutral Framework

> Transitioning to the Q-measure simplifies pricing: the expected return of all assets becomes the risk-free rate.

By moving from the physical measure to the **risk-neutral measure** $\mathbb{Q}$, we assume that the expected return of all assets is the risk-free rate $r$. The stock dynamics under $\mathbb{Q}$ are:

$$dS = (r - q) S\,dt + \sigma S\,dW$$

where $dW$ is the standard Wiener process increment (for fundamental properties of the standard normal distribution driving $dW$, see [Annex A: Normal Distribution & Calculus Reference](./annex-math.md)).

::: info Intuitive Concept: What is a Measure? 🤔

* **What is a Probability Measure?** In probability theory, a "measure" is simply a mathematical rule that assigns a numerical probability (between 0 and 1) to every possible future event.
* **The Physical Measure ($\mathbb{P}$)**: This represents the real-world probabilities. Under $\mathbb{P}$, the stock price drifts at the expected rate of return $\mu$. This return is highly subjective because it depends on investors' risk aversion and the risk premium they demand.
* **The Risk-Neutral Measure ($\mathbb{Q}$)**: This is a hypothetical "pricing world" where we assume all investors are risk-neutral (indifferent to risk). In this world, investors do not demand a risk premium for volatility. Consequently, all assets grow at exactly the same risk-free rate ($r$, or $r - q$ if the stock pays dividends).
* **Why is this change of measure valid?** In **Part 2**, we proved via delta hedging that constructing a dynamically rebalanced portfolio cancels out both the random Wiener process ($dW$) and the subjective real-world drift ($\mu$). Because the option price does not depend on $\mu$, we are mathematically permitted to choose *any* drift to price the derivative. The risk-neutral world ($\mathbb{Q}$) is the most convenient choice because it enables the **Fundamental Theorem of Asset Pricing**: the fair price today is the expected future payoff under $\mathbb{Q}$ discounted at the risk-free rate $r$.
:::

Under this risk-neutral framework, the fair price of a European call option with strike price $K$ and maturity $T$ is:
$$C = e^{-rT} \mathbb{E}^{\mathbb{Q}}\left[ \max(S_T - K, 0) \right]$$

Using the continuous probability density function (PDF) $f(S_T)$ of the stock price at maturity:

$$C = e^{-rT} \int_{K}^{\infty} (S_T - K) f(S_T)\,dS_T$$

To evaluate this integral, we must first derive the PDF $f(S_T)$ of the stock price under Geometric Brownian Motion.

## 3. Lognormal PDF

> Applying Itô's lemma to logarithmic stock prices resolves the SDE and reveals the exact future price probability density.

::: tip Mathematical Reference: The Normal Distribution 🤔
Before we proceed with normal probabilities, we introduce the two key probability functions used throughout this derivation:

1. **Probability Density Function (PDF) $\phi(z)$**: Represents the standard normal bell curve:
    $$\phi(z) = \frac{1}{\sqrt{2\pi}} \exp\left(-\frac{z^2}{2}\right)$$
2. **Cumulative Distribution Function (CDF) $\Phi(z)$**: Represents the probability that a standard normal variable is less than or equal to $z$ (the area under the bell curve from $-\infty$ to $z$):
    $$\Phi(z) = \int_{-\infty}^{z} \phi(u)\,du$$

For a comprehensive review of standard and general normal properties, complementary symmetries (like $\Phi(-z) = 1 - \Phi(z)$), and detailed moment derivations (such as the fourth moment $\mathbb{E}[Z^4] = 3$ used in Itô's Lemma), please see the [Annex A: Normal Distribution & Calculus Reference](./annex-math.md).
:::

To determine the PDF of the stock price at maturity $S_T$, we solve the risk-neutral SDE:
$$dS = (r - q) S\,dt + \sigma S\,dW$$

We apply Itô's Lemma to the function $g(S) = \ln S$. First, we compute the partial derivatives:
$$\frac{\partial g}{\partial S} = \frac{1}{S}, \quad \frac{\partial^2 g}{\partial S^2} = -\frac{1}{S^2}, \quad \frac{\partial g}{\partial t} = 0$$

Now, we substitute these into the general Itô formula:
$$dg = \frac{\partial g}{\partial t}\,dt + \frac{\partial g}{\partial S}\,dS + \frac{1}{2}\frac{\partial^2 g}{\partial S^2}\,(dS)^2$$

Substitute $dS = (r - q) S\,dt + \sigma S\,dW$ and the quadratic term $(dS)^2 = \sigma^2 S^2\,dt$:
$$d(\ln S) = 0 \cdot dt + \frac{1}{S}\left((r - q) S\,dt + \sigma S\,dW\right) + \frac{1}{2}\left(-\frac{1}{S^2}\right)\left(\sigma^2 S^2\,dt\right)$$

$$d(\ln S) = (r - q)\,dt + \sigma\,dW - \frac{1}{2}\sigma^2\,dt$$

$$d(\ln S) = \left(r - q - \frac{1}{2}\sigma^2\right)dt + \sigma\,dW$$

Integrating both sides from $t=0$ to maturity $T$:
$$\int_{0}^{T} d(\ln S_t) = \int_{0}^{T} \left(r - q - \frac{1}{2}\sigma^2\right)dt + \int_{0}^{T} \sigma\,dW_t$$

$$\ln S_T - \ln S_0 = \left(r - q - \frac{1}{2}\sigma^2\right)T + \sigma W_T$$

$$\ln\left(\frac{S_T}{S_0}\right) = \left(r - q - \frac{1}{2}\sigma^2\right)T + \sigma W_T$$

Since $W_T \sim \mathcal{N}(0, T)$, the log-return $Y = \ln(S_T / S_0)$ is normally distributed:
$$Y = \ln\left(\frac{S_T}{S_0}\right) \sim \mathcal{N}\left( m_Y, v_Y^2 \right) \quad \text{where } m_Y = \left(r - q - \frac{1}{2}\sigma^2\right)T, \,\, v_Y^2 = \sigma^2 T$$

### Finding the PDF of the Stock Price $S_T$

Let $S_T = S_0 e^Y$. We find the probability density function $f(s)$ of $S_T$ by first constructing its Cumulative Distribution Function (CDF), $F_{S_T}(s) = \mathbb{P}(S_T \le s)$, and then differentiating it.

The CDF is:
$$F_{S_T}(s) = \mathbb{P}(S_T \le s) = \mathbb{P}\left(S_0 e^Y \le s\right) = \mathbb{P}\left(e^Y \le \frac{s}{S_0}\right) = \mathbb{P}\left(Y \le \ln\left(\frac{s}{S_0}\right)\right)$$

Standardizing the normal random variable $Y \sim \mathcal{N}(m_Y, v_Y^2)$ yields:
$$F_{S_T}(s) = \Phi\left( \frac{\ln(s/S_0) - m_Y}{v_Y} \right)$$

To find the PDF $f(s)$, we differentiate the CDF with respect to $s$ by applying the chain rule. Let $u(s) = (\ln(s / S_0) - m_Y) / v_Y$. We evaluate:
$$f(s) = \frac{d}{ds} F_{S_T}(s) = \frac{d}{ds} \Phi(u(s)) = \frac{d\Phi}{du} \cdot \frac{du}{ds} = \phi(u) \cdot \frac{du}{ds}$$

Since $u(s) = \frac{\ln s - \ln S_0 - m_Y}{v_Y}$, its derivative with respect to $s$ is:
$$\frac{du}{ds} = \frac{1}{v_Y} \cdot \frac{d}{ds}(\ln s) = \frac{1}{s \cdot v_Y}$$

Substituting $\frac{du}{ds}$ and $u(s)$ back gives the lognormal PDF:
$$f(s) = \phi\left( \frac{\ln(s/S_0) - m_Y}{v_Y} \right) \cdot \frac{1}{s \cdot v_Y}$$

Substituting the explicit terms for $\phi$, $m_Y$, and $v_Y = \sigma\sqrt{T}$:
$$f(S_T) = \frac{1}{S_T \sigma \sqrt{2\pi T}} \exp\left( -\frac{\left(\ln(S_T/S_0) - \left(r - q - \frac{1}{2}\sigma^2\right)T\right)^2}{2\sigma^2 T} \right)$$

## 4. Call Pricing Integral

> We set up and simplify the expectation integral by changing variables to standard normal coordinates.

We return to the pricing integral:
$$C = e^{-rT} \int_{K}^{\infty} (S_T - K) f(S_T)\,dS_T$$

Substituting the explicit lognormal PDF $f(S_T) = \phi\left( \frac{\ln(S_T/S_0) - m_Y}{v_Y} \right) \cdot \frac{1}{S_T \cdot v_Y}$:

$$C = e^{-rT} \int_{K}^{\infty} (S_T - K) \left[ \frac{1}{S_T \sigma \sqrt{T}} \phi\left( \frac{\ln(S_T/S_0) - m_Y}{v_Y} \right) \right] dS_T$$

To simplify this integral, we apply a change of variables by letting:
$$X = \ln\left(\frac{S_T}{S_0}\right) \implies S_T = S_0 e^X \quad \text{and} \quad dS_T = S_0 e^X dX$$

We also evaluate the limits of integration for the new variable $X$:

1. **Lower limit**: When $S_T = K \implies X_K = \ln(K/S_0)$.
2. **Upper limit**: When $S_T \to \infty \implies X \to \infty$.

Now, substitute $S_T$ and $dS_T$ into the integral:

$$C = e^{-rT} \int_{X_K}^{\infty} (S_0 e^X - K) \left[ \frac{1}{(S_0 e^X) \sigma \sqrt{T}} \phi\left( \frac{X - m_Y}{v_Y} \right) \right] \left(S_0 e^X dX\right)$$

Notice that the $(S_0 e^X)$ term in the denominator of the PDF is perfectly cancelled by the $(S_0 e^X dX)$ term from the differential:

Recognizing that $f_X(X)$ is the PDF of a normal random variable $X \sim \mathcal{N}(m_X, \sigma_X^2)$ with $m_X = \left(r - q - \frac{1}{2}\sigma^2\right)T$ and $\sigma_X^2 = \sigma^2 T$:

$$f_X(X) = \frac{1}{\sigma \sqrt{T}} \phi\left( \frac{X - m_Y}{v_Y} \right)$$

$$C = e^{-rT} \int_{X_K}^{\infty} \left(S_0 e^X - K\right) f_X(X)\,dX$$

We split this integral into two parts:

$$C = S_0 e^{-rT} \underbrace{\int_{X_K}^{\infty} e^X f_X(X)\,dX}_{I_A} - K e^{-rT} \underbrace{\int_{X_K}^{\infty} f_X(X)\,dX}_{I_B}$$

$$C = S_0 e^{-rT} I_A - K e^{-rT} I_B$$

## 5. Solving Integral I_B

> The strike portion of the integral yields the risk-neutral probability that the option will expire in-the-money.

$I_B$ represents the probability that the stock price at maturity exceeds the strike price $K$ (under the risk-neutral measure):

$$I_B = \int_{X_K}^{\infty} f_X(X)\,dX = \int_{X_K}^{\infty} \frac{1}{\sigma_X \sqrt{2\pi}} \exp\left( -\frac{(X - m_X)^2}{2\sigma_X^2} \right) dX$$

We standardize the variable by letting $Z = \frac{X - m_X}{\sigma_X}$, which gives $dX = \sigma_X dZ$.
Evaluating the integration limits:

* When $X = X_K \implies Z_K = \frac{X_K - m_X}{\sigma_X}$.
* When $X \to \infty \implies Z \to \infty$.

Substituting these into the integral:

$$I_B = \int_{Z_K}^{\infty} \frac{1}{\sqrt{2\pi}} e^{-\frac{Z^2}{2}}\,dZ = \int_{Z_K}^{\infty} \phi(Z)\,dZ = 1 - \Phi(Z_K)$$

By the symmetry of the standard normal PDF (as proven in [Annex A: Normal Distribution & Calculus Reference](./annex-math.md)), $1 - \Phi(Z_K) = \Phi(-Z_K)$. We define $d_2 = -Z_K$ and calculate it explicitly:

$$d_2 = -Z_K = -\left( \frac{X_K - m_X}{\sigma_X} \right) = \frac{m_X - X_K}{\sigma_X}$$

Substitute $m_X = \left(r - q - \frac{1}{2}\sigma^2\right)T$, $\sigma_X = \sigma\sqrt{T}$, and $X_K = \ln(K/S_0) = -\ln(S_0/K)$:

$$d_2 = \frac{\left(r - q - \frac{1}{2}\sigma^2\right)T - (-\ln(S_0/K))}{\sigma \sqrt{T}}$$

$$d_2 = \frac{\ln(S_0/K) + \left(r - q - \frac{1}{2}\sigma^2\right)T}{\sigma \sqrt{T}}$$

Thus:
$$I_B = \Phi(d_2)$$

## 6. Solving Integral I_A

> Solving the stock-dependent portion of the integral requires algebraic completion of the square inside the exponential.

The integral $I_A$ contains the stock price exponent term $e^X$, which makes it more complex:

$$I_A = \int_{X_K}^{\infty} e^X f_X(X)\,dX = \int_{X_K}^{\infty} e^X \left[ \frac{1}{\sigma_X \sqrt{2\pi}} \exp\left( -\frac{(X - m_X)^2}{2\sigma_X^2} \right) \right] dX$$

$$I_A = \int_{X_K}^{\infty} \frac{1}{\sigma_X \sqrt{2\pi}} \exp\left( X - \frac{(X - m_X)^2}{2\sigma_X^2} \right) dX$$

To solve this, we must manipulate the exponent to form a complete square in terms of $X$.

### Step 1: Combine the Exponents

We combine $X$ and the quadratic term under a common denominator:

$$X - \frac{(X - m_X)^2}{2\sigma_X^2} = \frac{2\sigma_X^2 X - \left(X^2 - 2m_X X + m_X^2\right)}{2\sigma_X^2}$$

$$= -\frac{X^2 - 2m_X X - 2\sigma_X^2 X + m_X^2}{2\sigma_X^2}$$

$$= -\frac{X^2 - 2\left(m_X + \sigma_X^2\right)X + m_X^2}{2\sigma_X^2}$$

### Step 2: Complete the Square in the Numerator

Let $A = m_X + \sigma_X^2$. The expression inside the numerator is $X^2 - 2AX + m_X^2$. We complete the square for $X$:

$$X^2 - 2AX + m_X^2 = \left(X - A\right)^2 - A^2 + m_X^2$$

Now, we substitute $A = m_X + \sigma_X^2$ back into the constant part of this expression to simplify it:

$$-A^2 + m_X^2 = -\left(m_X + \sigma_X^2\right)^2 + m_X^2$$

$$= -\left(m_X^2 + 2m_X \sigma_X^2 + \sigma_X^4\right) + m_X^2$$

$$= -2m_X \sigma_X^2 - \sigma_X^4$$

Putting the numerator back into the fraction:

$$-\frac{\left[ X - \left(m_X + \sigma_X^2\right) \right]^2 - 2m_X \sigma_X^2 - \sigma_X^4}{2\sigma_X^2}$$

$$= -\frac{\left[ X - \left(m_X + \sigma_X^2\right) \right]^2}{2\sigma_X^2} + \frac{2m_X \sigma_X^2 + \sigma_X^4}{2\sigma_X^2}$$

$$= -\frac{\left[ X - \left(m_X + \sigma_X^2\right) \right]^2}{2\sigma_X^2} + m_X + \frac{1}{2}\sigma_X^2$$

### Step 3: Evaluate the Constant Term

We substitute $m_X = \left(r - q - \frac{1}{2}\sigma^2\right)T$ and $\sigma_X^2 = \sigma^2 T$ into the constant term:

$$m_X + \frac{1}{2}\sigma_X^2 = \left(r - q - \frac{1}{2}\sigma^2\right)T + \frac{1}{2}\sigma^2 T$$

$$= (r - q)T - \frac{1}{2}\sigma^2 T + \frac{1}{2}\sigma^2 T = (r - q)T$$

Therefore, the combined exponent simplifies beautifully to:

$$-\frac{\left[ X - \left(m_X + \sigma_X^2\right) \right]^2}{2\sigma_X^2} + (r - q)T$$

This allows us to pull the factor $e^{(r - q)T}$ outside the integral:

$$I_A = \int_{X_K}^{\infty} \frac{1}{\sigma_X \sqrt{2\pi}} \exp\left( -\frac{\left[ X - \left(m_X + \sigma_X^2\right) \right]^2}{2\sigma_X^2} + (r - q)T \right) dX$$

$$I_A = e^{(r - q)T} \int_{X_K}^{\infty} \frac{1}{\sigma_X \sqrt{2\pi}} \exp\left( -\frac{\left[ X - \left(m_X + \sigma_X^2\right) \right]^2}{2\sigma_X^2} \right) dX$$

### Step 4: Standardize the Integral

We standardize the integral by letting $Z = [X - (m_X + \sigma_X^2)] / \sigma_X$, which gives $dX = \sigma_X dZ$.
Evaluating the integration limits:

* When $X = X_K \implies Z'_K = [X_K - (m_X + \sigma_X^2)] / \sigma_X = (X_K - m_X) / \sigma_X - \sigma_X = Z_K - \sigma_X$.
* When $X \to \infty \implies Z \to \infty$.

Substituting these into the integral:

$$I_A = e^{(r - q)T} \int_{Z'_K}^{\infty} \frac{1}{\sqrt{2\pi}} e^{-\frac{Z^2}{2}}\,dZ = e^{(r - q)T} \int_{Z'_K}^{\infty} \phi(Z)\,dZ$$

$$I_A = e^{(r - q)T} \left[ 1 - \Phi\left(Z'_K\right) \right]$$

Applying standard normal symmetry $\left(1 - \Phi\left(Z'_K\right) = \Phi\left(-Z'_K\right)\right)$, we define $d_1 = -Z'_K$ and compute it:

$$d_1 = -Z'_K = -\left(Z_K - \sigma_X\right) = -Z_K + \sigma_X$$

Recall that $-Z_K = d_2$ and $\sigma_X = \sigma\sqrt{T}$:

$$d_1 = d_2 + \sigma \sqrt{T}$$

$$d_1 = \frac{\ln(S_0/K) + \left(r - q - \frac{1}{2}\sigma^2\right)T}{\sigma \sqrt{T}} + \sigma\sqrt{T}$$

$$d_1 = \frac{\ln(S_0/K) + \left(r - q - \frac{1}{2}\sigma^2\right)T + \sigma^2 T}{\sigma \sqrt{T}}$$

$$d_1 = \frac{\ln(S_0/K) + \left(r - q + \frac{1}{2}\sigma^2\right)T}{\sigma \sqrt{T}}$$

Thus:
$$I_A = e^{(r - q)T} \Phi(d_1)$$

## 7. Pricing & Parity

> We assemble the analytical call and put pricing formulas, leveraging put-call parity for a direct and elegant proof.

### European Call Option Formula

We substitute the solved integrals $I_A$ and $I_B$ back into the pricing equation:

$$C = S_0 e^{-rT} I_A - K e^{-rT} I_B$$

$$C = S_0 e^{-rT} \left( e^{(r-q)T} \Phi(d_1) \right) - K e^{-rT} \Phi(d_2)$$

Since $e^{-rT} e^{(r-q)T} = e^{-rT + rT - qT} = e^{-qT}$:

$$\boxed{\ \ \vphantom{\int} C(S_0, T) = S_0 e^{-qT} \Phi(d_1) - K e^{-rT} \Phi(d_2)\ \ }$$

---

### European Put Option Formula via Put-Call Parity

Rather than repeating the complex double-integration steps for a put option, we can derive its closed-form solution far more elegantly using **Put-Call Parity**. This relationship is a **model-free** result: it does not rely on the Black-Scholes model assumptions, but holds for any asset pricing model consistent with no-arbitrage.

#### 1. The No-Arbitrage Argument

Consider two portfolios constructed today at time $t=0$, both maturing at time $T$:

* **Portfolio A**: Long one European call option ($C$) and short one European put option ($P$) with the same strike $K$ and maturity $T$.
* **Portfolio B**: Long $e^{-qT}$ shares of the underlying stock (with dividends continuous reinvested to yield exactly 1 share at $T$) and short $K e^{-rT}$ of cash (borrowing the present value of the strike price at the risk-free rate $r$).

Let us evaluate the value of both portfolios at maturity $T$ under two possible market states:

| Portfolio | Composition today | Value at $T$ if $S_T > K$ | Value at $T$ if $S_T \le K$ |
| :--- | :--- | :--- | :--- |
| **Portfolio A** | Long Call ($C$), Short Put ($-P$) | $(S_T - K) - 0 = S_T - K$ | $0 - (K - S_T) = S_T - K$ |
| **Portfolio B** | Long Stock ($S_0 e^{-qT}$), Short Strike ($K e^{-rT}$) | $S_T - K$ | $S_T - K$ |

Because both portfolios yield the **exact same payoff ($S_T - K$)** in all future states of the world, their values today must be identical to prevent arbitrage. Therefore:

$$\boxed{\ \ \vphantom{\Big|} C - P = S_0 e^{-qT} - K e^{-rT}\ \ }$$

Rearranging this gives the pricing relationship:
$$P = C - S_0 e^{-qT} + K e^{-rT}$$

#### 2. Algebraic Verification from Black-Scholes

To demonstrate the internal consistency of the Black-Scholes model, we can algebraically verify that the call and put pricing formulas satisfy Put-Call Parity with dividends.

Recall the pricing formulas:

* $C = S_0 e^{-qT} \Phi(d_1) - K e^{-rT} \Phi(d_2)$
* $P = K e^{-rT} \Phi(-d_2) - S_0 e^{-qT} \Phi(-d_1)$

We compute the difference:
$$C - P = \left[ S_0 e^{-qT} \Phi(d_1) - K e^{-rT} \Phi(d_2) \right] - \left[ K e^{-rT} \Phi(-d_2) - S_0 e^{-qT} \Phi(-d_1) \right]$$

Group the stock ($S_0 e^{-qT}$) and discounted strike ($K e^{-rT}$) terms:
$$C - P = S_0 e^{-qT} \left[ \Phi(d_1) + \Phi(-d_1) \right] - K e^{-rT} \left[ \Phi(d_2) + \Phi(-d_2) \right]$$

Using the standard normal CDF complementary identity $\Phi(z) + \Phi(-z) = 1$ (proven rigorously in [Annex A: Normal Distribution & Calculus Reference](./annex-math.md)):
$$C - P = S_0 e^{-qT} (1) - K e^{-rT} (1)$$

$$C - P = S_0 e^{-qT} - K e^{-rT} \quad \checkmark$$

#### 3. Deriving the Put Formula

By rearranging Put-Call Parity, we substitute our Call pricing formula to obtain the Put option pricing formula step-by-step:

$$P = C - S_0 e^{-qT} + K e^{-rT}$$

$$P = \left( S_0 e^{-qT} \Phi(d_1) - K e^{-rT} \Phi(d_2) \right) - S_0 e^{-qT} + K e^{-rT}$$

Group the terms by $S_0 e^{-qT}$ and $K e^{-rT}$:
$$P = K e^{-rT} \left( 1 - \Phi(d_2) \right) - S_0 e^{-qT} \left( 1 - \Phi(d_1) \right)$$

Applying the standard normal symmetry property $1 - \Phi(z) = \Phi(-z)$ yields the European put option pricing formula:

$$\boxed{\ \ \vphantom{\int} P(S_0, T) = K e^{-rT} \Phi(-d_2) - S_0 e^{-qT} \Phi(-d_1)\ \ }$$

::: tip Symbolic Verification
You can formally verify that our Call and Put closed-form solutions satisfy Put-Call Parity and the BSM PDE symbolically using Python and SymPy. See [Annex B: Symbolic Verification via Python & SymPy](./annex-python.md) and the companion [1-sympy-verification.ipynb](https://github.com/oscar6echo/black-scholes-explorer/blob/main/python/1-sympy-verification.ipynb) notebook.
:::

## 8. Interpretations

> We dissect the financial meaning of d1 and d2, and discuss the practical utility of closed-form formulas.

### Economic Interpretation of the Formulas

* $\Phi(d_2)$ represents the **risk-neutral probability** that the option will expire in-the-money (i.e. that the option is exercised).
* $K e^{-rT} \Phi(d_2)$ is the discounted expected strike payment conditional on exercise.
* $S_0 e^{-qT} \Phi(d_1)$ is the present value of receiving the stock at maturity conditional on exercise, adjusted for the continuous dividend yield loss over the option's life.

### Practical Value of European Analytical Solutions

While the financial industry trades American options more frequently, the European analytical formulas remain indispensable:

1. **Sanity Bounds**: American options must always be valued greater than or equal to their European counterparts due to early exercise flexibility. European formulas provide a strict mathematical lower bound.
2. **Control Variates**: In numerical methods like binomial trees or Monte Carlo simulations, the exact European solution is used as a control variate to reduce variance and bias.
3. **Exotic Options**: The mathematical framework serves as a template to price more complex exotic derivatives.

---

In the next section, [4. Option Greeks](./4-greeks.md), we will differentiate our closed-form call and put option formulas to derive the risk sensitivities (the Greeks) using the standard normal density scaling relation.
