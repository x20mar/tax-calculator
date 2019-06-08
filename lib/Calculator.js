class Calculator {

    /**
    *
    * @param {Integer} taxYear
    * @param {Integer} grossIncome
    */
    constructor(taxYear, grossIncome) {
        this.taxYear = taxYear
        this.grossIncome = grossIncome
    }

    call() {
        this.validateInputs()
    }

    validateInputs() {
        if (typeof this.taxYear === 'undefined') {
            console.error('no tax year given!')
            process.exit(1)
        }
        console.log('Tax Year:', this.taxYear)
        console.log('grossIncome:', this.grossIncome || 'no gross income given')
    }

}

module.exports = Calculator