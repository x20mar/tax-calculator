const TaxBandLoader = require('../src/lib/TaxBandLoader')

test('Loading the json config file', () => {
    expect(function () {
        new TaxBandLoader()
    }).not.toThrow()
})

test('getConfigForYear for an invalid year', () => {
    expect(function () {
        let loader = new TaxBandLoader()
        loader.getConfigForYear(1901)
    }).toThrow('Resource Tax Year 1901 was not found.')
})

test('getConfigForYear for a valid year', () => {
    let loader = new TaxBandLoader()
    let config = loader.getConfigForYear(2016)
    expect(config.tax_year).toBe(2016)
})