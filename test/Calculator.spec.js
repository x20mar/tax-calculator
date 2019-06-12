const Calculator = require('../src/lib/Calculator')

test('Throw an error when there is no inputs to validate', () => {
    expect(function () {
        let calc = new Calculator()
        calc.validateInputs()
    }).toThrow('InternalError')
})

test('Throw an error when there is no Gross Salary to validate', () => {
    expect(function () {
        let calc = new Calculator(2018)
        calc.validateInputs()
    }).toThrow('InternalError')
})

test('Loading calculator with valid inputs', () => {
    expect(function () {
        let calc = new Calculator(2016, 43500)
        calc.validateInputs()
    }).not.toThrow('InternalError')
})

test('Loading calculator config with an invalid year', () => {
    expect(function () {
        let calc = new Calculator(2012, 43500)
        calc.validateInputs()
        calc.loadConfigData()
    }).toThrow('Resource Tax Year 2012 was not found.')
})

test('Loading calculator config with a valid year', () => {
    expect(function () {
        let calc = new Calculator(2016, 43500)
        calc.validateInputs()
        calc.loadConfigData()
    }).not.toThrow('Resource Tax Year 2016 was not found.')
})

test('Getting the Personal Allowance for a given year' , () => {
    let calc = new Calculator(2016, 43500)
    calc.validateInputs()
    calc.loadConfigData()
    let pa = calc.getPersonalAllowance()
    expect(pa).toBe(11000)
})

test('Setting the Taxable Income for a given year and Gross Salary', () => {
    let calc = new Calculator(2016, 43500)
    calc.validateInputs()
    calc.loadConfigData()
    let taxable_income = 43500 - calc.getPersonalAllowance()

    expect(calc.setTaxableIncome()).toBe(taxable_income)
})

test('Caclulate the tax bands for a given year and Gross Salary', () => {
    let calc = new Calculator(2018, 43500)
    calc.validateInputs()
    calc.loadConfigData()
    calc.setTaxableIncome()
    let jsonOuput = JSON.stringify(calc.calcTaxBands())

    expect(jsonOuput).toBe('[{"name":"Starter Rate","rate":"19","amount_taxed":2000,"sub_tax":380},{"name":"Base Rate","rate":"20","amount_taxed":10149,"sub_tax":2029.8000000000002},{"name":"Intermediate Rate","rate":"21","amount_taxed":19429,"sub_tax":4080.0899999999997},{"name":"Higher Rate","rate":"40","amount_taxed":72,"sub_tax":28.8}]')
})

test('Formatting currency to GBP', () => {
    let calc = new Calculator(2016, 43500)
    let fmt = calc.formatCurrency(12345678)

    expect(fmt).toBe('£12,345,678.00')
})

test('The console output for a given year and Gross Salary', () => {
    let calc = new Calculator(2018, 43500)
    calc.validateInputs()
    calc.loadConfigData()
    calc.setTaxableIncome()
    calc.calcTaxBands()
    let ouput = calc.writer()

    expect(ouput).toBe(`Tax Year: 2018-2019
Gross Salary: £43,500.00

Personal Allowance: £11,850.00

Taxable Income: £31,650.00

Starter Rate: £2,000.00 @ 19% = £380.00
Base Rate: £10,149.00 @ 20% = £2,029.80
Intermediate Rate: £19,429.00 @ 21% = £4,080.09
Higher Rate: £72.00 @ 40% = £28.80

Total Tax Due: £6,518.69
`)
})

test('The console output for a given year and Gross Salary using the single call function', () => {
    let calc = new Calculator(2018, 43500)
    let ouput = calc.call()

    expect(ouput).toBe(`Tax Year: 2018-2019
Gross Salary: £43,500.00

Personal Allowance: £11,850.00

Taxable Income: £31,650.00

Starter Rate: £2,000.00 @ 19% = £380.00
Base Rate: £10,149.00 @ 20% = £2,029.80
Intermediate Rate: £19,429.00 @ 21% = £4,080.09
Higher Rate: £72.00 @ 40% = £28.80

Total Tax Due: £6,518.69
`)
})