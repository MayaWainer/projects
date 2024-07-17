function isValidTaxId(taxId?: string, countryCode?: string): boolean {
    return !isEmpty(taxId) && !isEmpty(countryCode) && isValidByCountryRules(taxId!, countryCode!) && isValidByLuhnAlgorithm(taxId!)
}


const isEmpty = (text?:string): boolean => {
    return text === null || typeof text === 'undefined' || text.length === 0 || (typeof text === 'string' && text.trim() === '')
}

function isValidByCountryRules(id: string, countryCode: string): boolean {
    switch (countryCode) {
        case 'IL': return validateIsraelsId(id)
        case 'DE': return validateGermanId(id)
        case 'AT': return validateAustrianId(id)
        default: return false
    }
}

function validateIsraelsId(id: string): boolean {
    return id.length === 9
}

function validateGermanId(id: string): boolean {
    return id.length === 10
}

function validateAustrianId(id: string): boolean {
    if (id.length !== 8) return false
    const firstTwoDigitsSum = parseInt(id.charAt(0), 10) + parseInt(id.charAt(1), 10)
    return firstTwoDigitsSum % 2 !== 0
}

function isValidByLuhnAlgorithm(id: string): boolean {
    let aggr = 0
    for (let i = 0; i < id.length; i++) {
        let char = id.charAt(i)
        let mul = (1 + (i % 2)) * parseInt(char, 10)
        if (mul >= 9) {
            mul -= 9
        }
        aggr += mul
    }
    return (aggr % 10 === 0)
}


//test
console.log(isValidTaxId('', 'IL'))
