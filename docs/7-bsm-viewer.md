# 7. BSM Viewer

> An interactive analytics dashboard to visualize BSM option prices and Greek sensitivity profiles across multiple dimensions.

Understanding the behavior of option pricing and risk sensitivities (the Greeks) is crucial for risk management and options trading. While deriving the analytical closed-form equations (as done in [Part 3](./3-closed-formula.md) and [Part 4](./4-greeks.md)) establishes a rigorous mathematical foundation, visualizing their dynamic profiles makes the theory concrete.

## BSM Terminal

The BSM Terminal computes the exact Black-Scholes-Merton Call and Put pricing, cumulative probability boundaries ($d_1, d_2, N(d_1), N(d_2)$), and Greek sensitivities incorporating continuous dividend yields ($q$) using the analytical derivations proven in this tutorial series.

<div class="launch-card">
  <div class="flex-1">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span class="icon-container">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </span>
      <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); border-top: none; padding-top: 0;">Interactive BSM Quantitative Terminal</h3>
    </div>
    <p style="margin: 0; font-size: 14px; color: var(--vp-c-text-2); font-weight: 300; line-height: 1.6;">
      Launch the full-screen interactive dashboard to sweep parameters dynamically, display static numerical values for all Greeks side-by-side, and visualize pricing or sensitivity surfaces along custom X, Y, and Z projection matrices in 2D Curves and 3D wireframe mesh surfaces.
    </p>
  </div>
  <div class="shrink-0">
    <a href="/black-scholes-explorer/widgets/bsm-viewer.html" target="_blank" rel="noopener noreferrer" class="launch-btn">
      Launch Fullscreen Terminal
      <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

## Option Profiles

By interacting with the dashboard, you can visually observe several fundamental option properties derived in our theoretical proofs:

### 1. Pricing Profiles as a Function of Spot ($S$)

* **Option Prices**: The European Call option price curve is bounded below by the intrinsic payoff $\max(S e^{-qT} - K e^{-rT},\, 0)$ and bounded above by the stock price itself ($S$). As spot increases, the call price converges asymptotically to a line with slope $e^{-qT}$. The Put price behaves symmetrically, bounded below by $\max(K e^{-rT} - S e^{-qT},\, 0)$.
* **Call vs. Put Delta**: The Call Delta curve starts at $0$ (deep out-of-the-money) and rises asymptotically to $e^{-qT}$ (deep in-the-money), with the strike price $K$ acting as the inflection point. The Put Delta behaves symmetrically, starting at $-e^{-qT}$ and rising to $0$.

### 2. Curvature and Volatility Sensitivity (Gamma & Vega)

* **Gamma ($\Gamma$)**: Gamma measures the acceleration of Delta (the curvature of the option price). The curve is a bell-shaped probability density curve centered near the strike price $K$. Gamma peaks when the option is **at-the-money (ATM)**, meaning ATM options have the highest rate of delta changes.
* **Vega ($\nu$)**: Vega measures sensitivity to volatility. It is identical for Calls and Puts and behaves similarly to Gamma, peaking sharply ATM. This shows that options trading near the strike are highly sensitive to market volatility changes.

### 3. Time Decay and Rates Sensitivity (Theta & Rho)

* **Theta ($\Theta$)**: Theta represents the passage of time (time decay). For standard long options, Theta is almost always negative, showing that options lose value as expiry approaches. The decay is sharpest and peaks ATM near maturity.
* **Rho ($\rho$)**: Rho measures sensitivity to the risk-free rate. Call options have positive Rho (higher interest rates increase Call values), while Put options have negative Rho (higher rates decrease Put values).

---

### What's Next?

In the final section, **[8. Volatility Surface](./8-vol-surface.md)**, we will transition from theoretical model pricing with constant parameters to the real world, exploring implied volatility smiles and skews, and proving the Breeden-Litzenberger theorem to extract true market probability densities directly from option prices.
