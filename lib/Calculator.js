var TaxBandLoader = require('./TaxBandLoader')
const { InternalError } = require('./errors')
class Calculator {

    /**
    *
    * @param {Integer} taxYear
    * @param {Integer} grossIncome
    */
    constructor(taxYear, grossIncome) {
        this.taxYear = taxYear
        this.grossIncome = grossIncome
        this.config = null
    }

    call() {
        this.validateInputs()
        this.loadConfigData()
    }

    validateInputs() {
        if (typeof this.taxYear === 'undefined') {
            throw new InternalError('no tax year given!')
        }
        if (typeof this.grossIncome === 'undefined') {
            throw new InternalError('no gross income given')
        }
    }

    loadConfigData() {
        const loader = new TaxBandLoader()
        this.config = loader.getConfigForYear(Number.parseInt(this.taxYear))
    }

}

module.exports = Calculator