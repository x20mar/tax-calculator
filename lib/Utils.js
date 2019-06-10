export default {

    /**
     * Formats number to GBP
     * @param {Integer} amount
     */
    formatCurrency(amount) {
        return amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
    }
}

// module.exports = Utils