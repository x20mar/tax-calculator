const TaxBandLoader = require('./TaxBandLoader')
const InternalError = require('./errors')

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
        return this.writer()
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
        return this.taxableIncome
    }

    calcTaxBands() {
        let running_tax_total = 0
        this.config.tax_bands.forEach( tb => {
            if (tb.to_gross_salary && this.taxableIncome >= tb.to_gross_salary) {
                let band = {
                    name: tb.name,
                    rate: tb.rate,
                    amount_taxed: tb.to_gross_salary - tb.from_gross_salary
                }
                running_tax_total += band.amount_taxed
                band.sub_tax = (band.rate / 100) * band.amount_taxed
                this.totalTaxDue += band.sub_tax
                this.taxBandList.push(band)
            } else if (this.taxableIncome >= tb.from_gross_salary && (tb.to_gross_salary === null || this.taxableIncome <= tb.to_gross_salary)) {
                let band = {
                    name: tb.name,
                    rate: tb.rate,
                    amount_taxed: this.taxableIncome - running_tax_total
                }
                band.sub_tax = (band.rate / 100) * band.amount_taxed
                this.totalTaxDue = this.totalTaxDue + band.sub_tax
                this.taxBandList.push(band)
            }
        })
        return this.taxBandList
    }

    formatCurrency(amount) {

        const formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        })
        return formatter.format(amount)
    }

    writer() {
        let endTaxYear = this.taxYear + 1

        let output = `Tax Year: ${this.taxYear}-${endTaxYear}\n`
        output += `Gross Salary: ${this.formatCurrency(this.grossIncome)}\n\n`
        output += `Personal Allowance: ${this.formatCurrency(this.getPersonalAllowance())}\n\n`
        output += `Taxable Income: ${this.formatCurrency(this.taxableIncome)}\n\n`

        this.taxBandList.forEach(band => {
            output += `${band.name}: ${this.formatCurrency(band.amount_taxed)} @ ${band.rate}% = ${this.formatCurrency(band.sub_tax)}\n`
        })

        output += `\nTotal Tax Due: ${this.formatCurrency(this.totalTaxDue)}\n`

        return  output
    }

}

module.exports = Calculator