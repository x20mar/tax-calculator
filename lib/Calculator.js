const TaxBandLoader = require('./TaxBandLoader')
const { InternalError } = require('./errors')
import * as Utils from './Utils'

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
        console.log(this.config)
        this.writer()
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

    writer() {
        let grossIncome = Utils.formatCurrency(this.grossIncome)

        let output = `Tax Year: ${this.taxYear}-${this.taxYear+1}\n`
        output += `Gross Salary: ${grossIncome}\n`

        console.log(output)
    }

}

module.exports = Calculator