#!/usr/bin/env node

var program = require('commander')
var Calculator = require('../lib/Calculator')

program
    .version('1.0.0')
    .description('Calculates the amount of income tax due in a given tax year for a given salary.')
    .arguments('<taxYear> <grossIncome>', 'Tax Year Gross Income')
    .action(function (taxYear, grossIncome) {
        let calc = new Calculator(taxYear, grossIncome)
        calc.call()
    })

program.parse(process.argv)