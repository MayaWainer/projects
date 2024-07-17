function isValidTaxId(taxId?: string): boolean {
    if (isEmpty(taxId)) return false;
    length = taxId.length; // const
    var isValid = false;
    if (length == 9) {
        var aggr = 0;
        for (var i = 0; i < length; i++) {
            var char = taxId.substr(i, 1);
            var mul = (1 + (i % 2)) * parseInt(char); if (mul >= 9) {
                mul -= 9;
            }
            aggr += mul;
        }
        isValid = (aggr % 10 == 0);
    }
    return isValid;
}
function isEmpty(text?: string): boolean {
    return text === null || typeof text === 'undefined' || text.length === 0 || (typeof text === 'string' && text.trim() === '');
}

