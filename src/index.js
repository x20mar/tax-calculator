var program = require('commander')
import Calculator from './lib/Calculator'

program.version('1.0.0')
    .description('Calculates the amount of income tax due in a given tax year for a given salary.')
    .arguments('<taxYear> <grossIncome>', 'Tax Year Gross Income')
    .action(function (taxYear, grossIncome) {
        try {
            const calc = new Calculator(taxYear, grossIncome)
            calc.call()
        } catch (e) {
            console.error(e.message)
            process.exit(1)
        }
    })

program.parse(process.argv)