/**
 * ROI Calculator Defaults
 * Species-specific ranges and default values
 * Extracted from goats/index.html, sheep/index.html, technology/index.html
 */

export const ROI_DEFAULTS = {
  // Goats defaults
  goats: {
    herdMin: 10,
    herdMax: 2000,
    herdDefault: 100,
    laborMin: 6000,
    laborMax: 30000,
    laborDefault: 12000,
    lossMin: 1,
    lossMax: 20,
    lossDefault: 8,
  },

  // Sheep defaults (assumed similar, may need validation)
  sheep: {
    herdMin: 10,
    herdMax: 2000,
    herdDefault: 100,
    laborMin: 6000,
    laborMax: 30000,
    laborDefault: 12000,
    lossMin: 1,
    lossMax: 20,
    lossDefault: 8,
  },

  // Calculation formula (from site.js roiCalc function)
  // These formulas are exact as implemented in the source
  calculate: (herd, labor, lossRate) => {
    const laborSave = Math.round(labor * 12 * 0.5); // 50% labor savings annually
    const lossSave = Math.round(herd * (lossRate / 100) * 9000 * 0.47); // Animal value × loss rate × recovery rate
    const sub = Math.round(herd * 1200); // Subscription cost per animal annually (estimate)
    const net = laborSave + lossSave - sub;
    const payback =
      net > 0
        ? (sub / (net / 12)).toFixed(1).replace(/\.0$/, '') + ' months'
        : '—';

    return {
      laborSave,
      lossSave,
      sub,
      net: Math.max(net, 0),
      payback,
    };
  },
};
