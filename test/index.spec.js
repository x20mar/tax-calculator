let path = require('path')
let exec = require('child_process').exec

global.console = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
}

test('calling the cli with no TaxYear or GrossIncome', async() => {
    let result = await cli([], '.')
    console.log(result)
    expect(result.code).toBe(1)
    expect(result.error).toBe(1)
})

test('calling the cli with no GrossIncome', async() => {
    let result = await cli([2018], '.')
    expect(result.code).toBe(1)
})

// test('calling the cli with a valid TaxYear and GrossIncome', async() => {
//     let result = await cli([2018, 43500], '.')
//     expect(result.code).toBe(0)
// })

test('calling the cli with an invalid TaxYear and GrossIncome', async() => {
    let result = await cli([2019, 43500], '.')
    expect(result.code).toBe(1)
})



// test('Code should be 1', async () => {
//     let result = await cli(['-p', 'parameter'], '.')
//     expect(result.code).toBe(1)
//     expect(global.console.error).toHaveBeenCalledWith('test')
// })


function cli(args, cwd) {
    return new Promise(resolve => {
        exec(`node ${path.resolve('./index')} ${args.join(' ')}`,
            { cwd },
            (error, stdout, stderr) => {
                resolve({
                    code: error && error.code ? error.code : 0,
                    error,
                    stdout,
                    stderr
                })
            })
    })
}