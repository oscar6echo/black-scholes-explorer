# 1. Itô's Lemma

> We derive Itô's Lemma step-by-step as the stochastic counterpart to the classical calculus chain rule for continuous, non-differentiable processes.

## 1. Classical Calculus

> Classical calculus assumes variables are smooth and differentiable. We review total derivatives and Taylor series expansions as a baseline.

To understand how stochastic calculus differs from ordinary calculus, we begin with two key concepts from classical calculus: the **total derivative** and the **Taylor series expansion**.

### The Total Derivative

In ordinary calculus, if we have a smooth function $f(t, x)$ that depends on two variables, time $t$ and position $x$, the total derivative of $f$ can be written using the chain rule as:

$$df = \frac{\partial f}{\partial t}\,dt + \frac{\partial f}{\partial x}\,dx$$

### Taylor Series Expansion

A Taylor series allows us to expand a smooth function $f(x)$ around a specific point $x = a$:

$$f(x) = f(a) + \frac{1}{1!}f'(a)(x - a) + \frac{1}{2!}f''(a)(x - a)^2 + \frac{1}{3!}f'''(a)(x - a)^3 + \cdots$$

If we want to expand the function around $a + \Delta x$ (where $\Delta x = x - a$ is a small change), we get:

$$f(a + \Delta x) = f(a) + \frac{1}{1!}f'(a)\Delta x + \frac{1}{2!}f''(a)(\Delta x)^2 + \cdots$$

Taking $f(a)$ to the other side to define the increment $\Delta f = f(a + \Delta x) - f(a)$, we obtain:

$$\Delta f = \frac{1}{1!}f'(a)\Delta x + \frac{1}{2!}f''(a)(\Delta x)^2 + \cdots$$

In the infinitesimal limit as $\Delta x \to 0$, we replace $\Delta x$ with $dx$ and $\Delta f$ with $df$. For a function of two variables $t$ and $x$, we expand around both variables simultaneously:

$$df = \frac{\partial f}{\partial t}\,dt + \frac{\partial f}{\partial x}\,dx + \frac{1}{2!}\frac{\partial^2 f}{\partial t^2}\,(dt)^2 + \frac{\partial^2 f}{\partial t\,\partial x}\,dt\,dx + \frac{1}{2!}\frac{\partial^2 f}{\partial x^2}\,(dx)^2 + \cdots$$

In ordinary calculus, when taking the limit as $dt \to 0$ and $dx \to 0$, higher-order terms like $(dt)^2$, $dt\,dx$, and $(dx)^2$ go to zero much faster than $dt$ and $dx$. They are therefore discarded, leaving only the first-order terms.

## 2. The Itô Process

> Stochastic processes are continuous but nowhere differentiable. We model asset prices using drift and diffusion dynamics.

In stochastic calculus, we introduce randomness by making the variable $x$ a stochastic process $X_t$. Consequently, the function $f(t, X_t)$ also becomes a stochastic process.

The dynamics of an **Itô process** are described by a stochastic differential equation (SDE) composed of a **drift** term and a **diffusion** term:

$$dx = a\,dt + b\,dW$$

Where:

* $a$ is the drift coefficient (rate of average change).
* $b$ is the diffusion coefficient (scaling factor for volatility).
* $W$ is a **Wiener process** (standard Brownian motion).

::: info The Wiener Process 🤔
The infinitesimal increment of a Wiener process, $dW$, is defined as:

$$dW = \epsilon \sqrt{dt}$$

where $\epsilon \sim \mathcal{N}(0, 1)$ is sampled from a standard normal distribution. For a detailed reference on standard normal distribution definitions and properties, see the [Annex A: Normal Distribution & Calculus Reference](./annex-math.md).
:::

The presence of the square root of time $\sqrt{dt}$ is a crucial feature of stochastic processes. It arises because for independent random variables, **variances are additive**, whereas standard deviations are not. To ensure that the variance of the process scales linearly with time ($Var(W_t) = t$), the standard deviation of the increment must be proportional to $\sqrt{dt}$.

## 3. Taylor Series in 2D

> Substituting stochastic variables into Taylor expansions reveals why higher-order terms can no longer be discarded.

We now substitute our stochastic increment $dx = a\,dt + b\,dW$ into the Taylor series expansion of $df$.

First, we write out the expansion, keeping terms up to second order:

$$df = \frac{\partial f}{\partial t}\,dt + \frac{\partial f}{\partial x}\,dx + \frac{1}{2!}\frac{\partial^2 f}{\partial t^2}\,(dt)^2 + \frac{\partial^2 f}{\partial t\,\partial x}\,dt\,dx + \frac{1}{2!}\frac{\partial^2 f}{\partial x^2}\,(dx)^2$$

Next, we evaluate the behavior of each term as $dt \to 0$:

1. **Time quadratic term**: $(dt)^2 \to 0$ extremely fast ($O(dt^2)$) and is discarded.
2. **Cross term**: $dt\,dx = dt(a\,dt + b\,dW) = a(dt)^2 + b\,dt\,dW$. Since $dW \propto \sqrt{dt}$, the term $dt\,dW$ is proportional to $dt^{3/2}$. As $dt \to 0$, $dt^{3/2} \to 0$ faster than $dt$, so this term is also discarded.
3. **Space quadratic term**:
    $$(dx)^2 = (a\,dt + b\,dW)^2 = a^2(dt)^2 + 2ab\,dt\,dW + b^2(dW)^2$$
    * $a^2(dt)^2$ is $O(dt^2)$, which vanishes.
    * $2ab\,dt\,dW$ is $O(dt^{3/2})$, which vanishes.
    * This leaves only the $b^2(dW)^2$ term.

Thus, the quadratic variation term simplifies to:

$$(dx)^2 \approx b^2(dW)^2$$

Unlike in ordinary calculus where $(dx)^2$ is discarded, in stochastic calculus, $(dW)^2$ cannot be ignored because $dW \propto \sqrt{dt}$, meaning $(dW)^2$ is proportional to $dt$.

## 4. Wiener Increment $(dW)^2$

> The core of stochastic calculus rests on proving that the squared random Wiener increment acts deterministically in the limit.

The core step in deriving Itô's lemma is showing that $(dW)^2$ can be replaced by $dt$. To prove this rigorously, we examine the expectation and variance of $(dW)^2$.

### Step 1: Expected Value of $(dW)^2$

Recall that $dW = \epsilon \sqrt{dt}$, where $\epsilon \sim \mathcal{N}(0, 1)$. Squaring both sides gives:

$$(dW)^2 = \epsilon^2\,dt$$

Taking the expected value:

$$\mathbb{E}[(dW)^2] = \mathbb{E}[\epsilon^2\,dt] = \mathbb{E}[\epsilon^2]\,dt$$

Since $\epsilon$ is a standard normal variable, its mean is $\mathbb{E}[\epsilon] = 0$ and its variance is $\text{Var}(\epsilon) = 1$. Using the variance formula $\text{Var}(\epsilon) = \mathbb{E}[\epsilon^2] - (\mathbb{E}[\epsilon])^2$, we have:

$$1 = \mathbb{E}[\epsilon^2] - 0 \implies \mathbb{E}[\epsilon^2] = 1$$

Substituting this back gives:

$$\mathbb{E}[(dW)^2] = dt$$

### Step 2: Variance of $(dW)^2$

To determine how much $(dW)^2$ fluctuates around its expected value, we compute its variance:

$$\text{Var}((dW)^2) = \text{Var}(\epsilon^2\,dt) = dt^2\,\text{Var}(\epsilon^2)$$

Using the variance formula for $\epsilon^2$:

$$\text{Var}(\epsilon^2) = \mathbb{E}[\epsilon^4] - (\mathbb{E}[\epsilon^2])^2$$

The fourth moment of a standard normal distribution is a known result:

$$\mathbb{E}[\epsilon^4] = 3$$

Substituting the values:

$$\text{Var}(\epsilon^2) = 3 - (1)^2 = 2$$

Thus, the variance of the squared increment is:

$$\text{Var}((dW)^2) = 2\,(dt)^2$$

### Conclusion

As $dt \to 0$, the variance of $(dW)^2$ (which is proportional to $dt^2$) approaches zero much faster than its expected value $dt$. Because the fluctuations of $(dW)^2$ become mathematically negligible in the continuous limit, it ceases to behave stochastically. We can therefore treat $(dW)^2$ as deterministic and replace it with its expected value:

$$\boxed{\ \ \vphantom{\Big|} (dW)^2 = dt\ \ }$$

## 5. Itô's Lemma

> Combining the Taylor expansion and the deterministic Wiener square yields the stochastic counterpart to the classical chain rule.

We now substitute $(dx)^2 = b^2\,dt$ and $dx = a\,dt + b\,dW$ back into our Taylor expansion for $df$:

$$df = \frac{\partial f}{\partial t}\,dt + \frac{\partial f}{\partial x}\left(a\,dt + b\,dW\right) + \frac{1}{2!}\frac{\partial^2 f}{\partial x^2}\left(b^2\,dt\right)$$

Grouping the deterministic ($dt$) and stochastic ($dW$) terms together yields the final expression:

$$\boxed{\ \ \vphantom{\int} df(t, x) = \left( \frac{\partial f}{\partial t} + a\frac{\partial f}{\partial x} + \frac{1}{2}b^2\frac{\partial^2 f}{\partial x^2} \right)dt + b\frac{\partial f}{\partial x}\,dW\ \ }$$

This is **Itô's Lemma** (often written with explicit function arguments for $a(t, x)$ and $b(t, x)$).

## 6. Context & Summary

> Derived by Kiyoshi Itô in 1951, this lemma is the foundational engine behind options pricing and stochastic optimization.

Itô's lemma was first derived by Japanese mathematician **Kiyoshi Itô** in 1951.

::: tip Kiyoshi Itô on Wall Street
Because of its extensive application in financial engineering—most notably in option pricing via the derivation of the Black-Scholes-Merton partial differential equation—Kiyoshi Itô is often affectionately referred to as *"the most famous Japanese on Wall Street"*.
:::

### Summary of Differences

* **Ordinary Calculus**: Second-order terms vanish, leading to the classical chain rule.
* **Stochastic Calculus**: The high volatility of Brownian motion ensures that the second-order term $\frac{1}{2}b^2\frac{\partial^2 f}{\partial x^2}$ (known as the **Itô correction**) survives the limit and must be included to account for path curvature.

---

### What's Next?

In the next section, [2. BSM PDE Derivation](./2-black-scholes-merton-pde.md), we will apply Itô's Lemma to model stock price dynamics under Geometric Brownian Motion and derive the famous Black-Scholes-Merton partial differential equation.
