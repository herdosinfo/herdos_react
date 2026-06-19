/**
 * Format a number as Indian Rupees
 * @param {number} n
 * @returns {string}
 */
export function inr(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

/**
 * Format a large number with locale string
 * @param {number} n
 * @returns {string}
 */
export function formatNumber(n) {
  return n.toLocaleString('en-IN')
}
