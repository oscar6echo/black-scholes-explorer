# Black-Scholes Explorer

A VitePress documentation site covering option pricing from first principles — PDE, lognormal distributions, Monte Carlo simulation, Greeks, and volatility surfaces — built around three interactive quantitative widgets and an 8-chapter options math course.

**Live site → [oscar6echo.github.io/black-scholes-explorer](https://oscar6echo.github.io/black-scholes-explorer/)**

---

## Site overview

| Section | URL | Contents |
| --- | --- | --- |
| **Overview** | `/overview` | Introduction to options modeling, boundary limits, and course syllabus |
| **Theory (Ch. 1–5)** | `/1-ito-lemma` to `/5-theory-reference` | Stochastic derivation of the BSM PDE, analytical pricing integrals, closed-form Greeks, and consolidated mathematical formula sheets |
| **Intuition & MC (Ch. 6–7)** | `/6-pricing-intuition` to `/7-bsm-viewer` | Geometric deconstruction of the option value contribution curve, Monte Carlo path simulations, and the interactive quantitative terminal |
| **Extensions (Ch. 8)** | `/8-vol-surface` | Volatility surface modeling, implied volatility smile/skew, Newton-Raphson solver, and the Breeden-Litzenberger probability density extraction |
| **Math Annex** | `/annex-math` | Mathematical reference of the standard normal distribution functions, integrals, and calculus properties |
| **Python Annex** | `/annex-python` | Symbolic options calculus using SymPy to derive closed-form formulas and sensitivities |

### Options theory chapters

| Chapter | Title | Key topics |
| :--- | :--- | :--- |
| **1** | Itô's Lemma | Drift-diffusion, Wiener process increments, expectations, variance, and the stochastic Itô correction |
| **2** | BSM PDE Derivation | Geometric Brownian Motion stock dynamics, dynamically hedged portfolios, and risk-free replication |
| **3** | Closed-Form Solution | Transition to risk-neutral measures, expectation integrals, and Put-Call Parity derivation |
| **4** | Option Greeks | Closed-form sensitivity formulas (Delta, Gamma, Vega, Theta, Rho) derived via the density lemma |
| **5** | Theory Reference | A consolidated mathematical reference table summarizing all stochastic dynamics, formulas, and sensitivities |
| **6** | Intuition & Monte Carlo | Area under the scenario contribution curve, and numeric lognormal stochastic path simulations |
| **7** | BSM Viewer | Interactive quantitative terminal to sweep parameters and visualize 2D curves and 3D surface deformations |
| **8** | Volatility Surface | Implied volatility, Newton-Raphson solvers, and probability density extraction via Breeden-Litzenberger |

---

## Repository layout

```txt
.
├── .github/
│   └── workflows/
│       └── deploy-pages.yml      # GitHub Actions deployment workflow
├── .vitepress/
│   ├── config.ts                 # VitePress configuration (TypeScript)
│   └── theme/
│       ├── components/
│       │   └── IframeViewer.vue  # Interactive widget Vue container
│       ├── custom.css            # Dark-only styling rules & math custom scrolls
│       └── index.js              # Theme initialization & global component registration
├── docs/
│   ├── 1-ito-lemma.md            # Options stochastic chapters (Markdown + MathJax)
│   ├── 2-black-scholes-merton-pde.md
│   ├── 3-closed-formula.md
│   ├── 4-greeks.md
│   ├── 5-theory-reference.md
│   ├── 6-pricing-intuition.md
│   ├── 7-bsm-viewer.md           # Interactive dashboard page
│   ├── 8-vol-surface.md
│   ├── annex-math.md             # Normal distribution annex
│   ├── annex-python.md           # SymPy derivations annex
│   ├── overview.md               # Overview course introduction
│   ├── index.md                  # Homepage configuration
│   └── public/
│       ├── icons/                # Home features custom icons
│       ├── img/                  # 3D surface diagram assets
│       └── widgets/              # Standalone embedded HTML/JS widgets
│           ├── bsm-viewer.html   # 2D/3D Quantitative Terminal (Vue + Observable Plot + Vis.js)
│           ├── four-panel.html   # Contribution Curve PDF viewer (Vue + Observable Plot)
│           └── lognormal.html    # Lognormal Stock PDF distribution (Vue + Observable Plot)
├── python/                       # Companion Jupyter Notebooks (MC, PDEs, Greeks)
├── package.json
└── pnpm-lock.yaml
```

---

## Local development

```bash
pnpm install          # install dependencies (Node 24+, pnpm)
pnpm run dev          # dev server at http://localhost:5173
pnpm run build        # production build → .vitepress/dist
pnpm run preview      # preview production build
```

---

## Deployment

Pushes to `main` that touch `docs/**`, `package.json`, or `pnpm-lock.yaml` automatically redeploy to GitHub Pages via `.github/workflows/deploy-pages.yml`.

**One-time setup:** in repo **Settings → Pages → Source**, select **GitHub Actions**.
