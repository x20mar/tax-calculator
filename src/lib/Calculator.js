const TaxBandLoader = require('./TaxBandLoader')
import InternalError from './errors'
import * as Utils from './utils'

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
        this.taxableIncome = null
        this.taxBandList = []
        this.totalTaxDue = null
    }

    call() {
        this.validateInputs()
        this.loadConfigData()
        this.setTaxableIncome()
        this.calcTaxBands()
        // console.log(this.config)
        this.writer()
    }

    validateInputs() {
        if (typeof this.taxYear === 'undefined') {
            throw new InternalError('no tax year given!')
        }
        if (typeof this.grossIncome === 'undefined') {
            throw new InternalError('no gross income given')
        }

        this.taxYear = Number.parseInt(this.taxYear)
        this.grossIncome = Number.parseInt(this.grossIncome)
    }

    loadConfigData() {
        const loader = new TaxBandLoader()
        this.config = loader.getConfigForYear(Number.parseInt(this.taxYear))
    }

    getPersonalAllowance() {
        return this.config.personal_allowance
    }

    setTaxableIncome() {
        this.taxableIncome = this.grossIncome - this.getPersonalAllowance()
    }

    calcTaxBands() {
        this.config.tax_bands.forEach( tb => {
            if (tb.to_gross_salary && this.taxableIncome >= tb.to_gross_salary) {
                let band = {
                    name: tb.name,
                    rate: tb.rate,
                    amount_taxed: tb.to_gross_salary - tb.from_gross_salary
                }
                band.sub_tax = (band.rate / 100) * band.amount_taxed
                this.totalTaxDue = this.totalTaxDue + band.sub_tax
                this.taxBandList.push(band)
            } else if (tb.to_gross_salary && this.taxableIncome >= tb.from_gross_salary && this.taxableIncome <= tb.to_gross_salary) {
                let band = {
                    name: tb.name,
                    rate: tb.rate,
                    amount_taxed: this.taxableIncome - tb.from_gross_salary
                }
                band.sub_tax = (band.rate / 100) * band.amount_taxed
                this.totalTaxDue = this.totalTaxDue + band.sub_tax
                this.taxBandList.push(band)
            }
        })
    }

    writer() {
        let endTaxYear = this.taxYear + 1

        let output = `Tax Year: ${this.taxYear}-${endTaxYear}\n`
        output += `Gross Salary: ${Utils.formatCurrency(this.grossIncome)}\n\n`
        output += `Personal Allowance: ${Utils.formatCurrency(this.getPersonalAllowance())}\n\n`
        output += `Taxable Income: ${Utils.formatCurrency(this.taxableIncome)}\n\n`

        this.taxBandList.forEach(band => {
            output += `${band.name}: ${Utils.formatCurrency(band.amount_taxed)} @${band.rate}% = ${Utils.formatCurrency(band.sub_tax)}\n`
        })

        output += `\nTotal Tax Due: ${Utils.formatCurrency(this.totalTaxDue)}\n`

        console.log(output)
        process.exit(0)
    }

}

module.exports = Calculator