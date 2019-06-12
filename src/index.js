#!/usr/bin/env node

var program = require('commander')
const Calculator = require('./lib/Calculator')

program.version('1.0.0')
    .description('Calculates the amount of income tax due in a given tax year for a given salary.')
    .arguments('<taxYear> <grossIncome>', 'TaxYear GrossIncome')
    .action(function (taxYear, grossIncome) {
        try {
            const calc = new Calculator(taxYear, grossIncome)
            let output = calc.call()
            console.log(output)
            process.exit(0)
        } catch (e) {
            console.error(e.message)
            process.exit(1)
        }
    })

if (!process.argv.slice(2).length) {
    program.outputHelp()
}

program.parse(process.argv)