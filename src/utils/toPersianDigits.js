const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(n) {
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)])
}

export function numberWithComma(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


export function toPersianDigitsWithComma(x) {
    const numWithComma = numberWithComma(x);
    const persianNumbers = toPersianDigits(numWithComma);
    return persianNumbers
}

export function toPersianDigitsWithComma2(num) {
    const persianNumbers = '۰۱۲۳۴۵۶۷۸۹';
    const formattedNumber = num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedNumber.replace(/\d/g,(x) => persianNumbers[x]);
}

export function removeCommasAndPersianDigits(value) {
    const englishDigits = '0123456789';
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const cleanValue = value.replace(/,/g, '').replace(/[۰-۹]/g, (digit)=>englishDigits[persianDigits.indexOf(digit)]);
    return cleanValue;
}

export function toRial(value) {
    let str = value.replace(/,/g, '');
    const regex = new RegExp('(-?[0-9]+)([0-9]{3})');
    while (regex.test(str)) {
        str = str.replace(regex,'$1,$2');
    }
    return str;
}