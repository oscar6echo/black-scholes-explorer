import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Black-Scholes Explorer",
    description:
        "Option pricing from first principles — PDE, lognormal, Monte Carlo, Greeks, vol surface",

    appearance: "force-dark",
    srcDir: "./docs",

    lang: "en-US",
    cleanUrls: true,
    base: "/black-scholes-explorer/",

    markdown: {
        math: true,
    },

    vite: {
        logLevel: "info",
        build: {
            chunkSizeWarningLimit: 2200,
        },
    },

    themeConfig: {
        nav: [
            { text: "Overview", link: "/overview" },
            { text: "Theory", link: "/1-ito-lemma" },
            { text: "Pricing Intuition", link: "/6-pricing-intuition" },
            { text: "Extensions", link: "/8-vol-surface" },
        ],

        sidebar: [
            { text: "Overview", link: "/overview" },
            {
                text: "Theory",
                items: [
                    { text: "1. Itô's Lemma", link: "/1-ito-lemma" },
                    {
                        text: "2. BSM PDE Derivation",
                        link: "/2-black-scholes-merton-pde",
                    },
                    {
                        text: "3. Closed-Form Solution",
                        link: "/3-closed-formula",
                    },
                    { text: "4. Option Greeks", link: "/4-greeks" },
                    {
                        text: "5. Theory Reference",
                        link: "/5-theory-reference",
                    },
                ],
            },
            {
                text: "Pricing Intuition",
                items: [
                    {
                        text: "6. Intuition & Monte Carlo",
                        link: "/6-pricing-intuition",
                    },
                    { text: "7. BSM Viewer", link: "/7-bsm-viewer" },
                ],
            },
            {
                text: "Extensions",
                items: [
                    { text: "8. Volatility Surface", link: "/8-vol-surface" },
                ],
            },
            {
                text: "Annex",
                items: [
                    { text: "Math Reference", link: "/annex-math" },
                    { text: "Python SymPy", link: "/annex-python" },
                ],
            },
        ],

        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/oscar6echo/black-scholes-explorer",
            },
        ],
    },
});
