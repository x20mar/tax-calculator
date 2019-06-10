
/**
 * Formats number to GBP
 * @param {Integer} amount
 */
export function formatCurrency(amount) {

    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
    })
    return formatter.format(amount)
    // return amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
}