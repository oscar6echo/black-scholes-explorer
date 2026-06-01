# 4. Option Greeks

> We mathematically derive the option Greeks, which represent the risk sensitivities of the option price to market parameters.

* **Delta ($\Delta$)**: Sensitivity to the underlying stock price.
* **Gamma ($\Gamma$)**: Curvature (sensitivity of Delta to the stock price).
* **Vega ($\nu$)**: Sensitivity to stock volatility.
* **Theta ($\Theta$)**: Sensitivity to the passage of time (time decay).
* **Rho ($\rho$)**: Sensitivity to the risk-free interest rate.
* **Voma ($\text{Voma}$)**: Second-order sensitivity to stock volatility (volatility curvature).

Building upon the closed-form option pricing solutions derived in [Part 3: BSM Closed-Form](./3-closed-formula.md), we show how all BSM Greeks can be derived cleanly using a single fundamental probability identity.

## 1. The BSM Density Lemma

> A crucial algebraic transition identity links the standard normal densities of d1 and d2, simplifying the differentiation of cumulative distributions.

$$\boxed{\ \ \vphantom{\Big|} S_0 e^{-qT} \phi(d_1) = K e^{-rT} \phi(d_2)\ \ }$$

### Mathematical Proof

Recall the definitions of the integration limits:
$$d_1 = \frac{\ln(S_0/K) + \left(r - q + \frac{1}{2}\sigma^2\right)T}{\sigma\sqrt{T}}$$
$$d_2 = d_1 - \sigma\sqrt{T}$$

Using the standard normal probability density function $\phi(z) = \frac{1}{\sqrt{2\pi}} \exp\left(-\frac{z^2}{2}\right)$, we examine the ratio of densities:

$$\frac{\phi(d_1)}{\phi(d_2)} = \frac{\exp\left(-\frac{d_1^2}{2}\right)}{\exp\left(-\frac{d_2^2}{2}\right)} = \exp\left( -\frac{1}{2}\left(d_1^2 - d_2^2\right) \right)$$

Next, we evaluate the exponent term $d_1^2 - d_2^2$ using the difference of squares:
$$d_1^2 - d_2^2 = \left(d_1 - d_2\right)\left(d_1 + d_2\right) = \sigma\sqrt{T}\left( 2d_1 - \sigma\sqrt{T} \right)$$

Substitute the explicit formula for $2d_1$:
$$
\begin{aligned}
d_1^2 - d_2^2 &= \sigma\sqrt{T} \left[ \frac{2\ln(S_0/K) + 2(r - q)T + \sigma^2 T}{\sigma\sqrt{T}} - \sigma\sqrt{T} \right] \\
&= 2\ln(S_0/K) + 2(r - q)T + \sigma^2 T - \sigma^2 T \\
&= 2\ln(S_0/K) + 2(r - q)T
\end{aligned}
$$

Substituting this back into the exponential ratio:
$$
\begin{aligned}
\frac{\phi(d_1)}{\phi(d_2)} &= \exp\left( -\frac{1}{2}\left( 2\ln(S_0/K) + 2(r - q)T \right) \right) \\
&= \exp\left(-\ln(S_0/K)\right) \exp\left(-(r - q)T\right)
\end{aligned}
$$

$$\frac{\phi(d_1)}{\phi(d_2)} = \frac{K}{S_0} e^{-rT} e^{qT}$$

Multiplying both sides by $S_0 e^{-qT} \phi(d_2)$ yields the dividend-adjusted density lemma:
$$S_0 e^{-qT} \phi(d_1) = K e^{-rT} \phi(d_2) \quad \checkmark$$

## 2. Call Greeks

> We compute the first-order derivatives of the European call formula with respect to spot, volatility, time, and rate.

Recall the closed-form BSM Call pricing formula with dividends:
$$C(S_0, T) = S_0 e^{-qT} \Phi(d_1) - K e^{-rT} \Phi(d_2)$$

### A. Call Delta ($\Delta_C$)

Delta is the first-order partial derivative of the option price with respect to the stock price:
$$\Delta_C = \frac{\partial C}{\partial S_0} = e^{-qT} \Phi(d_1) + S_0 e^{-qT} \frac{\partial \Phi(d_1)}{\partial S_0} - K e^{-rT} \frac{\partial \Phi(d_2)}{\partial S_0}$$

Applying the chain rule (since $d\Phi / dx = \phi(x)$):
$$\Delta_C = e^{-qT} \Phi(d_1) + S_0 e^{-qT} \phi(d_1) \frac{\partial d_1}{\partial S_0} - K e^{-rT} \phi(d_2) \frac{\partial d_2}{\partial S_0}$$

We calculate the partial derivatives of $d_1$ and $d_2$:
$$\frac{\partial d_1}{\partial S_0} = \frac{\partial d_2}{\partial S_0} = \frac{1}{S_0 \sigma\sqrt{T}}$$

Substituting this back:
$$\Delta_C = e^{-qT} \Phi(d_1) + \left[ S_0 e^{-qT} \phi(d_1) - K e^{-rT} \phi(d_2) \right] \frac{1}{S_0 \sigma\sqrt{T}}$$

By applying our **BSM Density Lemma**, the bracketed term is exactly zero:
$$\boxed{\ \ \vphantom{\Big|} \Delta_C = e^{-qT} \Phi(d_1)\ \ }$$

### B. Call Gamma ($\Gamma_C$)

Gamma is the second-order partial derivative of the option price with respect to the stock price (or the first derivative of Delta):
$$\Gamma_C = \frac{\partial \Delta_C}{\partial S_0} = \frac{\partial}{\partial S_0} \left[ e^{-qT} \Phi(d_1) \right] = e^{-qT} \phi(d_1) \frac{\partial d_1}{\partial S_0}$$

Substitute $\frac{\partial d_1}{\partial S_0}$:
$$\boxed{\ \ \vphantom{\int} \Gamma_C = \frac{e^{-qT} \phi(d_1)}{S_0 \sigma \sqrt{T}}\ \ }$$

### C. Call Vega ($\nu_C$)

Vega is the sensitivity of the option price to the underlying stock volatility $\sigma$:
$$\nu_C = \frac{\partial C}{\partial \sigma} = S_0 e^{-qT} \phi(d_1) \frac{\partial d_1}{\partial \sigma} - K e^{-rT} \phi(d_2) \frac{\partial d_2}{\partial \sigma}$$

Since $d_2 = d_1 - \sigma\sqrt{T}$, its volatility derivative is:
$$\frac{\partial d_2}{\partial \sigma} = \frac{\partial d_1}{\partial \sigma} - \sqrt{T}$$

Substituting this in:
$$\nu_C = S_0 e^{-qT} \phi(d_1) \frac{\partial d_1}{\partial \sigma} - K e^{-rT} \phi(d_2) \left( \frac{\partial d_1}{\partial \sigma} - \sqrt{T} \right)$$

$$\nu_C = \left[ S_0 e^{-qT} \phi(d_1) - K e^{-rT} \phi(d_2) \right] \frac{\partial d_1}{\partial \sigma} + K e^{-rT} \phi(d_2) \sqrt{T}$$

Applying the Density Lemma, the bracketed term vanishes:
$$\nu_C = K e^{-rT} \phi(d_2) \sqrt{T}$$

Applying the Density Lemma one more time to replace $K e^{-rT} \phi(d_2)$ with $S_0 e^{-qT} \phi(d_1)$:
$$\boxed{\ \ \vphantom{\Big|} \nu_C = S_0 e^{-qT} \phi(d_1) \sqrt{T}\ \ }$$

### D. Call Theta ($\Theta_C$)

Theta is the sensitivity of the option price to the passage of time. Defining the time-to-maturity as $\tau = T - t$, we analyze $\Theta_C = -\partial C / \partial \tau$:
$$
\begin{aligned}
\frac{\partial C}{\partial \tau} &= -q S_0 e^{-q\tau} \Phi(d_1) + S_0 e^{-q\tau} \phi(d_1) \frac{\partial d_1}{\partial \tau} \\
&\quad + r K e^{-r\tau} \Phi(d_2) - K e^{-r\tau} \phi(d_2) \frac{\partial d_2}{\partial \tau}
\end{aligned}
$$

$$
\begin{aligned}
\frac{\partial C}{\partial \tau} &= \left[ S_0 e^{-q\tau} \phi(d_1) - K e^{-r\tau} \phi(d_2) \right] \frac{\partial d_1}{\partial \tau} \\
&\quad + K e^{-r\tau} \phi(d_2) \left(\frac{\partial d_1}{\partial \tau} - \frac{\partial d_2}{\partial \tau}\right) \\
&\quad + r K e^{-r\tau} \Phi(d_2) - q S_0 e^{-q\tau} \Phi(d_1)
\end{aligned}
$$

Since $d_1 - d_2 = \sigma\sqrt{\tau}$, we have:
$$\frac{\partial d_1}{\partial \tau} - \frac{\partial d_2}{\partial \tau} = \frac{\partial}{\partial \tau}\left(\sigma\sqrt{\tau}\right) = \frac{\sigma}{2\sqrt{\tau}}$$

Using the Density Lemma, the first term vanishes:
$$\frac{\partial C}{\partial \tau} = K e^{-r\tau} \phi(d_2) \frac{\sigma}{2\sqrt{\tau}} + r K e^{-r\tau} \Phi(d_2) - q S_0 e^{-q\tau} \Phi(d_1)$$

Apply the Density Lemma to the first term ($K e^{-r\tau} \phi(d_2) = S_0 e^{-q\tau} \phi(d_1)$):
$$\frac{\partial C}{\partial \tau} = \frac{S_0 e^{-q\tau} \phi(d_1) \sigma}{2\sqrt{\tau}} + r K e^{-r\tau} \Phi(d_2) - q S_0 e^{-q\tau} \Phi(d_1)$$

Since $\Theta_C = -\frac{\partial C}{\partial \tau}$:
$$\boxed{\ \ \vphantom{\int} \Theta_C = -\frac{S_0 e^{-qT} \phi(d_1) \sigma}{2\sqrt{T}} - r K e^{-rT} \Phi(d_2) + q S_0 e^{-qT} \Phi(d_1)\ \ }$$

### E. Call Rho ($\rho_C$)

Rho measures the option sensitivity to the risk-free interest rate $r$:
$$\rho_C = \frac{\partial C}{\partial r} = S_0 e^{-qT} \phi(d_1) \frac{\partial d_1}{\partial r} - \left( -T K e^{-rT} \Phi(d_2) + K e^{-rT} \phi(d_2) \frac{\partial d_2}{\partial r} \right)$$

$$
\begin{aligned}
\rho_C &= \left[ S_0 e^{-qT} \phi(d_1) - K e^{-rT} \phi(d_2) \right] \frac{\partial d_1}{\partial r} \\
&\quad + K e^{-rT} \phi(d_2) \left(\frac{\partial d_1}{\partial r} - \frac{\partial d_2}{\partial r}\right) \\
&\quad + T K e^{-rT} \Phi(d_2)
\end{aligned}
$$

Since $d_1 - d_2 = \sigma\sqrt{T}$ does not contain $r$, its derivative $\partial d_1 / \partial r - \partial d_2 / \partial r = 0$. Using the Density Lemma:
$$\boxed{\ \ \vphantom{\Big|} \rho_C = K T e^{-rT} \Phi(d_2)\ \ }$$

## 3. Put Greeks via Parity

> Leveraging the linear relationship of put-call parity allows us to immediately obtain the put sensitivities from the call results.

Once the Call Greeks are derived, we can compute the Put Greeks instantly by differentiating both sides of **Put-Call Parity with dividends**:

$$P = C - S_0 e^{-qT} + K e^{-rT}$$

### A. Put Delta ($\Delta_P$)

Differentiating parity with respect to $S_0$:
$$\Delta_P = \frac{\partial P}{\partial S_0} = \frac{\partial C}{\partial S_0} - e^{-qT} = \Delta_C - e^{-qT}$$

Substitute $\Delta_C = e^{-qT} \Phi(d_1)$ and apply standard normal CDF properties ($\Phi(z) - 1 = -\Phi(-z)$):
$$\Delta_P = e^{-qT} \Phi(d_1) - e^{-qT} = e^{-qT} \left( \Phi(d_1) - 1 \right)$$
$$\boxed{\ \ \vphantom{\Big|} \Delta_P = -e^{-qT} \Phi(-d_1)\ \ }$$

### B. Put Gamma ($\Gamma_P$)

Curvature is identical for calls and puts:
$$\Gamma_P = \frac{\partial \Delta_P}{\partial S_0} = \frac{\partial \Delta_C}{\partial S_0}$$
$$\boxed{\ \ \vphantom{\int} \Gamma_P = \Gamma_C = \frac{e^{-qT} \phi(d_1)}{S_0 \sigma \sqrt{T}}\ \ }$$

### C. Put Vega ($\nu_P$)

Volatility sensitivity is identical for calls and puts:
$$\nu_P = \frac{\partial P}{\partial \sigma} = \frac{\partial C}{\partial \sigma} - 0 + 0$$
$$\boxed{\ \ \vphantom{\Big|} \nu_P = \nu_C = S_0 e^{-qT} \phi(d_1) \sqrt{T}\ \ }$$

### D. Put Theta ($\Theta_P$)

Differentiating parity with respect to time-to-maturity $\tau$:
$$\frac{\partial P}{\partial \tau} = \frac{\partial C}{\partial \tau} - \left( -q S_0 e^{-q\tau} \right) + \left(-r K e^{-r\tau}\right) = \frac{\partial C}{\partial \tau} + q S_0 e^{-q\tau} - r K e^{-r\tau}$$

Since $\Theta = -\frac{\partial}{\partial \tau}$:
$$\Theta_P = \Theta_C - q S_0 e^{-qT} + r K e^{-rT}$$

Substitute $\Theta_C$ and apply normal symmetry ($1 - \Phi(d_2) = \Phi(-d_2)$ and $\Phi(d_1) - 1 = -\Phi(-d_1)$):
$$\Theta_P = \left(-\frac{S_0 e^{-qT} \phi(d_1) \sigma}{2\sqrt{T}} - r K e^{-rT} \Phi(d_2) + q S_0 e^{-qT} \Phi(d_1)\right) - q S_0 e^{-qT} + r K e^{-rT}$$
$$\Theta_P = -\frac{S_0 e^{-qT} \phi(d_1) \sigma}{2\sqrt{T}} + r K e^{-rT} \left( 1 - \Phi(d_2) \right) + q S_0 e^{-qT} \left( \Phi(d_1) - 1 \right)$$
$$\boxed{\ \ \vphantom{\int} \Theta_P = -\frac{S_0 e^{-qT} \phi(d_1) \sigma}{2\sqrt{T}} + r K e^{-rT} \Phi(-d_2) - q S_0 e^{-qT} \Phi(-d_1)\ \ }$$

### E. Put Rho ($\rho_P$)

Differentiating parity with respect to risk-free interest rate $r$:
$$\rho_P = \frac{\partial P}{\partial r} = \frac{\partial C}{\partial r} - T K e^{-rT} = \rho_C - T K e^{-rT}$$

Substitute $\rho_C = K T e^{-rT} \Phi(d_2)$:
$$\rho_P = K T e^{-rT} \Phi(d_2) - K T e^{-rT} = -K T e^{-rT} \left( 1 - \Phi(d_2) \right)$$
$$\boxed{\ \ \vphantom{\Big|} \rho_P = -K T e^{-rT} \Phi(-d_2)\ \ }$$

## 4. Higher-Order Greeks

> We explore second-order vol sensitivity (Voma), deriving its analytical formula and explaining its physical market significance.

While Delta, Gamma, Vega, Theta, and Rho represent the first-order and second-order sensitivities to stock price, time, and rate, the financial market also analyzes higher-order sensitivities. One such key second-order parameter is **Voma** (also known as *Volga*), which measures the sensitivity of Vega to changes in volatility:

$$\text{Voma} = \frac{\partial \nu}{\partial \sigma} = \frac{\partial^2 V}{\partial \sigma^2}$$

Since Vega is identical for both call and put options ($\nu_C = \nu_P = \nu$), Voma is also identical for both. We derive its analytical solution step-by-step using our existing density relations.

### Step-by-Step Derivation

We start by differentiating the Call Vega formula with respect to $\sigma$:

$$\text{Voma} = \frac{\partial}{\partial \sigma} \left[ S_0 e^{-qT} \phi(d_1) \sqrt{T} \right] = S_0 e^{-qT} \sqrt{T} \cdot \frac{\partial \phi(d_1)}{\partial \sigma}$$

#### 1. Differentiating the Density Function $\phi(d_1)$

Using the definition of the standard normal PDF $\phi(z) = \frac{1}{\sqrt{2\pi}} \exp\left(-z^2/2\right)$, we apply the chain rule:

$$\frac{\partial \phi(d_1)}{\partial \sigma} = \frac{d\phi(d_1)}{d d_1} \frac{\partial d_1}{\partial \sigma}$$

Since $\phi'(z) = -z\phi(z)$:

$$\frac{\partial \phi(d_1)}{\partial \sigma} = -d_1 \phi(d_1) \frac{\partial d_1}{\partial \sigma}$$

#### 2. Evaluating the Volatility Derivative of $d_1$

We isolate $\sigma$ in the expression for $d_1$:

$$d_1 = \frac{\ln(S_0 / K) + (r - q)T}{\sigma\sqrt{T}} + \frac{1}{2}\sigma\sqrt{T}$$

Differentiating with respect to $\sigma$ yields:

$$\frac{\partial d_1}{\partial \sigma} = -\frac{\ln(S_0 / K) + (r - q)T}{\sigma^2\sqrt{T}} + \frac{1}{2}\sqrt{T}$$

#### 3. Transitioning to $d_2$

Recall the definition of $d_2$:

$$d_2 = \frac{\ln(S_0 / K) + (r - q)T}{\sigma\sqrt{T}} - \frac{1}{2}\sigma\sqrt{T}$$

Dividing both sides by $\sigma$:

$$\frac{d_2}{\sigma} = \frac{\ln(S_0 / K) + (r - q)T}{\sigma^2\sqrt{T}} - \frac{1}{2}\sqrt{T}$$

Comparing this directly to our derivative $\partial d_1 / \partial \sigma$, we discover a remarkably elegant algebraic identity:

$$\boxed{\ \ \vphantom{\frac{\partial}{\partial \sigma}} \frac{\partial d_1}{\partial \sigma} = -\frac{d_2}{\sigma}\ \ }$$

#### 4. Assembling the Final Voma Expression

Substituting this identity back into the derivative of the normal density:

$$\frac{\partial \phi(d_1)}{\partial \sigma} = -d_1 \phi(d_1) \left( -\frac{d_2}{\sigma} \right) = \frac{d_1 d_2}{\sigma} \phi(d_1)$$

Finally, we substitute this back into our expression for Voma:

$$\text{Voma} = S_0 e^{-qT} \sqrt{T} \left( \frac{d_1 d_2}{\sigma} \phi(d_1) \right)$$

By grouping terms, we recognize that the expression contains the original formula for Vega ($\nu = S_0 e^{-qT} \phi(d_1) \sqrt{T}$):

$$\boxed{\ \ \vphantom{\int} \text{Voma} = \frac{S_0 e^{-qT} \phi(d_1) \sqrt{T} d_1 d_2}{\sigma} = \frac{\nu d_1 d_2}{\sigma}\ \ }$$

### Practical Interpretation

* Voma measures the **convexity of the option price with respect to volatility**.
* Since $d_1$ and $d_2$ can have different signs depending on whether the option is in-the-money or out-of-the-money, Voma can be positive or negative. Specifically:
  * When $d_1$ and $d_2$ have the same sign (which occurs when the option is deep in-the-money or deep out-of-the-money), $d_1 d_2 > 0$ and Voma is positive. Volatility increases make the option's Vega even more sensitive.
  * When the stock price is close to the strike (at-the-money), $d_1 > 0$ and $d_2 < 0$, making $d_1 d_2 < 0$, so Voma is negative. At-the-money options have peak Vega, so their Vega decreases as volatility moves away from zero.

::: tip Symbolic Verification
You can formally verify all Greek formulas derived in this document (Delta, Gamma, Vega, Voma, Theta, Rho) symbolically using Python and SymPy. See [Annex B: Symbolic Verification via Python & SymPy](./annex-python.md) and the companion [1-sympy-verification.ipynb](https://github.com/oscar6echo/black-scholes-explorer/blob/main/python/1-sympy-verification.ipynb) notebook.
:::
