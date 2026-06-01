---
layout: home

hero:
  name: Black-Scholes-Merton Explorer
  text: Option pricing from first principles
  tagline: >
    A layered journey from Itô's Lemma through the BSM PDE and Monte Carlo intuition
    to the Volatility Surface — built for students and professionals.
  image:
    src: /img/option-pricing-3d.png
    alt: Black-Scholes-Merton Option Pricing 3D Surface
  actions:
    - theme: brand
      text: Overview
      link: /overview
    - theme: alt
      text: Viewer
      link: /7-bsm-viewer

features:
  - icon: 📈
    title: 1. Itô's Lemma
    details: >
      Stochastic counterpart to the chain rule for Wiener processes.
      Rigorous evaluation of expectation, variance, and the Itô correction.
    link: /1-ito-lemma
  - icon: 📐
    title: 2. BSM PDE Derivation
    details: >
      Geometric Brownian Motion stock dynamics modeling, dynamically hedged
      portfolios, and BSM partial differential equation formulation.
    link: /2-black-scholes-merton-pde
  - icon: 🚀
    title: 3. Closed-Form Solution
    details: >
      Risk-neutral pricing measure transition, expectation integration, and call/put
      pricing formula derivation via put-call parity.
    link: /3-closed-formula
  - icon: 🏛️ 
    title: 4. Option Greeks
    details: >
      Differentiating call/put analytical pricing formulas to derive closed-form
      sensitivities (Delta, Gamma, Vega, Theta, Rho) via the density lemma.
    link: /4-greeks
  - icon: 📋
    title: 5. Theory Reference
    details: >
      A consolidated mathematical reference sheet summarizing all stochastic dynamics,
      closed-form solutions, and option Greeks in clear, structured formula cards.
    link: /5-theory-reference
  - icon: 🎲
    title: 6. Intuition & Monte Carlo
    details: >
      Deconstructing the expected payoff present-value area under the contribution
      curve, and numeric lognormal stochastic path simulations.
    link: /6-pricing-intuition
  - icon: 🖥️
    title: 7. BSM Viewer
    details: >
      Interactive analytical dashboard to visualize option pricing and Greek
      sensitivity curves across spot, rate, and volatility dimensions.
    link: /7-bsm-viewer
  - icon: 🎢
    title: 8. Volatility Surface
    details: >
      Market implied volatility smiles and skews, Newton-Raphson solvers,
      and extracting probability densities via the Breeden-Litzenberger theorem.
    link: /8-vol-surface
---
