# Math Reference

> A comprehensive mathematical appendix compiling normal distribution probability theory, symmetries, moments, and calculus rules.

## 1. Standard Normal

> We define the probability density and cumulative distribution functions of the standard Gaussian variable.

A standard normal random variable $Z$ has a mean of $0$ and a variance of $1$.

### Probability Density Function (PDF)

The PDF, denoted by $\phi(z)$, represents the relative likelihood of the variable taking a value $z$:

$$\phi(z) = \frac{1}{\sqrt{2\pi}} \exp\left(-\frac{z^2}{2}\right)$$

### Cumulative Distribution Function (CDF)

The CDF, denoted by $\Phi(z)$, represents the probability that the variable is less than or equal to $z$:

$$
\begin{aligned}
\Phi(z) &= \mathbb{P}(Z \le z) = \int_{-\infty}^{z} \phi(u)\,du \\
&= \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{z} \exp\left(-\frac{u^2}{2}\right)du
\end{aligned}
$$

## 2. General Normal

> Transforming general normal variables to standard normal coordinates simplifies probability computations and derivatives.

A general normal random variable $X$ has a mean $\mu$ (location parameter) and a variance $\sigma^2$ (scale parameter, where $\sigma > 0$ is the standard deviation).

### Standardization

Any general normal variable $X \sim \mathcal{N}(\mu, \sigma^2)$ can be mapped to a standard normal variable $Z \sim \mathcal{N}(0, 1)$ via the transformation:

$$Z = \frac{X - \mu}{\sigma}$$

### PDF and CDF of $X$

Using the standardization relation, the CDF of $X$ is:

$$
\begin{aligned}
F_X(x) &= \mathbb{P}(X \le x) = \mathbb{P}\left(\frac{X - \mu}{\sigma} \le \frac{x - \mu}{\sigma}\right) \\
&= \Phi\left(\frac{x - \mu}{\sigma}\right)
\end{aligned}
$$

Differentiating the CDF with respect to $x$ (applying the chain rule) gives the PDF $f(x)$:

$$
\begin{aligned}
f(x) &= \frac{d}{dx} F_X(x) = \frac{d}{dx} \Phi\left(\frac{x - \mu}{\sigma}\right) \\
&= \phi\left(\frac{x - \mu}{\sigma}\right) \cdot \frac{1}{\sigma}
\end{aligned}
$$

Substituting the expression for $\phi$:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x - \mu)^2}{2\sigma^2}\right)$$

## 3. Core Properties

> We prove key normal probability properties, including cumulative distribution symmetry and important threshold limits.

### Symmetry of the PDF

The standard normal PDF is perfectly symmetric around $z = 0$, meaning:

$$\phi(z) = \phi(-z)$$

### The Complementary CDF Identity

Because the total area under the PDF curve is $1$, and due to the symmetry of $\phi(z)$, we have the fundamental identity:

$$\Phi(-z) = 1 - \Phi(z)$$

#### Mathematical Proof

By definition:
$$\Phi(-z) = \int_{-\infty}^{-z} \phi(u)\,du$$

We apply a change of variables by letting $v = -u$, which gives $du = -dv$. The integration limits change:

* When $u \to -\infty \implies v \to \infty$.
* When $u = -z \implies v = z$.

$$\Phi(-z) = \int_{\infty}^{z} \phi(-v)(-dv) = \int_{z}^{\infty} \phi(-v)\,dv$$

Since $\phi(-v) = \phi(v)$ (by symmetry):

$$\Phi(-z) = \int_{z}^{\infty} \phi(v)\,dv$$

Since the total integral over the entire real line is $1$:

$$\int_{-\infty}^{\infty} \phi(v)\,dv = 1 \implies \int_{z}^{\infty} \phi(v)\,dv = 1 - \int_{-\infty}^{z} \phi(v)\,dv = 1 - \Phi(z)$$

Therefore:
$$\boxed{\ \ \vphantom{\Big|} \Phi(-z) = 1 - \Phi(z)\ \ }$$

### Key Threshold Values

* **Total Probability**: $\Phi(\infty) = 1$ and $\Phi(-\infty) = 0$.
* **Median Value**: $\Phi(0) = 0.5$ (exactly half the probability lies on each side of the mean).

## 4. Normal Moments

> We derive odd and even normal moments using standard symmetry arguments and moment generating functions.

The $k$-th moment of a random variable $Z$ is defined as $\mathbb{E}[Z^k]$. For a standard normal variable $Z \sim \mathcal{N}(0, 1)$:

### Odd Moments

By symmetry, every odd moment of the standard normal distribution is zero:

$$\mathbb{E}[Z^{2n+1}] = \int_{-\infty}^{\infty} z^{2n+1} \phi(z)\,dz = 0 \quad \text{for } n = 0, 1, 2, \dots$$

This is because the integrand $g(z) = z^{2n+1} \phi(z)$ is an odd function ($g(-z) = -g(z)$), and integrating an odd function over symmetric limits $[-\infty, \infty]$ always yields zero.

### Even Moments

The even moments are given by:

$$\mathbb{E}[Z^{2n}] = \frac{(2n)!}{2^n n!} = (2n - 1)!!$$

where $!!$ denotes the double factorial (the product of all odd integers up to $2n-1$).

#### Deriving the Even Moments via the Moment Generating Function (MGF)

The MGF of a standard normal random variable is:

$$M_Z(t) = \mathbb{E}\left[e^{tZ}\right] = \exp\left(\frac{t^2}{2}\right)$$

We can expand the exponential function as a Taylor series:

$$M_Z(t) = \sum_{k=0}^{\infty} \frac{1}{k!} \left(\frac{t^2}{2}\right)^k = \sum_{k=0}^{\infty} \frac{t^{2k}}{2^k k!}$$

We also know that the MGF can be expanded in terms of the moments:

$$M_Z(t) = \mathbb{E}\left[ \sum_{m=0}^{\infty} \frac{(tZ)^m}{m!} \right] = \sum_{m=0}^{\infty} \frac{\mathbb{E}[Z^m]}{m!} t^m$$

By matching the coefficients of $t^m$ in the two expansions:

1. All odd coefficients $t^{2k+1}$ are zero, so $\mathbb{E}[Z^{2k+1}] = 0$.
2. For even coefficients $t^{2n}$ (letting $m = 2n$):

$$\frac{\mathbb{E}[Z^{2n}]}{(2n)!} = \frac{1}{2^n n!} \implies \mathbb{E}[Z^{2n}] = \frac{(2n)!}{2^n n!}$$

#### Specific Values

* **First Even Moment ($n=1$)**:
    $$\mathbb{E}[Z^2] = \frac{2!}{2^1 \cdot 1!} = 1$$
    This is the variance of the standard normal variable.
* **Second Even Moment ($n=2$)**:
    $$\mathbb{E}[Z^4] = \frac{4!}{2^2 \cdot 2!} = \frac{24}{8} = 3$$
    ::: tip Application in Itô's Lemma 🤔
    This fourth moment $\mathbb{E}[\epsilon^4] = 3$ is directly used in **Video 1 (Section 4)** to derive the variance of the squared Wiener increment:
    $$\text{Var}(\epsilon^2) = \mathbb{E}[\epsilon^4] - (\mathbb{E}[\epsilon^2])^2 = 3 - 1^2 = 2$$
    which proves that $\text{Var}((dW)^2) = 2\,dt^2$.
    :::
* **Third Even Moment ($n=3$)**:
    $$\mathbb{E}[Z^6] = \frac{6!}{2^3 \cdot 3!} = \frac{720}{48} = 15$$

## 5. Leibniz Rule

> Differentiating definite integrals with variable limits requires a powerful calculus tool, which we formulate and prove.

Leibniz's rule defines how to differentiate a definite integral whose integration limits and integrand both depend on the differentiating variable.

### The Theorem

$$\frac{d}{dx} \int_{g(x)}^{h(x)} H(x, y)\,dy = H\left(x, h(x)\right)h'(x) - H\left(x, g(x)\right)g'(x) + \int_{g(x)}^{h(x)} \frac{\partial H(x, y)}{\partial x}\,dy$$

### Mathematical Proof

Let $I(x, u, v)$ be a function of three variables defined as:
$$I(x, u, v) = \int_{u}^{v} H(x, y)\,dy \quad \text{where } u = g(x) \text{ and } v = h(x)$$

By the multivariable chain rule, the total derivative of $I$ with respect to $x$ is:
$$\frac{dI}{dx} = \frac{\partial I}{\partial x} \frac{dx}{dx} + \frac{\partial I}{\partial u} \frac{du}{dx} + \frac{\partial I}{\partial v} \frac{dv}{dx}$$

Since $\frac{dx}{dx} = 1$:

1. **Integrand derivative**: The partial derivative with respect to the parameter $x$ is:
    $$\frac{\partial I}{\partial x} = \int_{u}^{v} \frac{\partial H(x, y)}{\partial x}\,dy$$
2. **Limits derivatives**: By the Fundamental Theorem of Calculus:
    $$\frac{\partial I}{\partial u} = -H(x, u) \quad \text{and} \quad \frac{\partial I}{\partial v} = H(x, v)$$

Substituting these back into the total derivative chain:
$$\frac{dI}{dx} = \int_{g(x)}^{h(x)} \frac{\partial H(x, y)}{\partial x}\,dy - H(x, g(x)) g'(x) + H(x, h(x)) h'(x)$$

Rearranging the terms yields Leibniz's Integral Rule:
$$\boxed{\ \ \vphantom{\int} \frac{d}{dx} \int_{g(x)}^{h(x)} H(x, y)\,dy = H\left(x, h(x)\right)h'(x) - H\left(x, g(x)\right)g'(x) + \int_{g(x)}^{h(x)} \frac{\partial H(x, y)}{\partial x}\,dy\ \ } \quad \checkmark$$
