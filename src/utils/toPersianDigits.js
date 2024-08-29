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