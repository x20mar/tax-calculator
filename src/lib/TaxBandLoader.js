var fs = require('fs')
const { ResourceNotFoundError } = require('./errors')

class TaxBandLoader {

    constructor() {
        this.taxBands = null
        let filePath = `${__dirname}/../data/tax_bands.json`
        try {
            let contents = fs.readFileSync(filePath)
            this.taxBands = JSON.parse(contents)
        }
        catch (e) {
            throw new ResourceNotFoundError(filePath)
        }
    }

    /**
     * Returns tax bands config for specific Year
     * @param {Interger} year
     */
    getConfigForYear(year) {
        let config = null
        this.taxBands.map(function(c) {
            if(c.tax_year === year){
                config = c
            }
        })
        if(!config) {
            throw new ResourceNotFoundError(`Tax Year ${year}`)
        }
        return config
    }
}

module.exports = TaxBandLoader