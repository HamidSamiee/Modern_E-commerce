const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(n) {
    if (n == null || undefined) return ''; 
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)])
}

export function numberWithComma(value) {
    if (value == null) return ''; // مدیریت مقادیر null یا undefined
    if (typeof value !== 'string') {
      value = String(value); // تبدیل مقدار به رشته اگر عدد یا نوع دیگری باشد
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


export function toPersianDigitsWithComma(x) {
    const numWithComma = numberWithComma(x);
    const persianNumbers = toPersianDigits(numWithComma);
    return persianNumbers
}

// export function toPersianDigitsWithComma2(num) {
//     const persianNumbers = '۰۱۲۳۴۵۶۷۸۹';
//     const formattedNumber = num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     return formattedNumber.replace(/\d/g,(x) => persianNumbers[x]);
// }
export function toPersianDigitsWithComma2(num) {
  const persianNumbers = '۰۱۲۳۴۵۶۷۸۹';
  // ابتدا مطمئن می‌شویم که ورودی یک رشته است
  num = String(num);
  
  // حذف تمامی کاراکترهای غیر عددی
  const cleanNumber = num.replace(/[^\d]/g, '');
  
  // از چپ به راست کاماها را اضافه می‌کنیم
  const formattedNumber = cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // تبدیل اعداد انگلیسی به فارسی
  return formattedNumber.replace(/\d/g, (x) => persianNumbers[x]);
}

// export function removeCommasAndPersianDigits(value) {
//     const englishDigits = '0123456789';
//     const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
//     const cleanValue = value.replace(/,/g, '').replace(/[۰-۹]/g, (digit)=>englishDigits[persianDigits.indexOf(digit)]);
//     return cleanValue;
// }

export function removeCommasAndPersianDigits(value) {
    if (value == null) return ''; // مدیریت مقادیر null یا undefined
    if (typeof value !== 'string') {
      value = String(value); // تبدیل مقدار به رشته اگر عدد یا نوع دیگری باشد
    }
  
    const englishDigits = '0123456789';
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const cleanValue = value
      .replace(/,/g, '') // حذف کاماها
      .replace(/[۰-۹]/g, (digit) => englishDigits[persianDigits.indexOf(digit)]); // جایگزینی اعداد فارسی با انگلیسی
  
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

// export const toEnglishDigits = (num) => {
//   return num.replace(/[۰-۹]/g, (d) => "0123456789"[d]);
// };

export const toEnglishDigits = (str) => {
  // تبدیل اعداد فارسی به انگلیسی
  const persianToEnglishMap = {
      '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
      '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
  };

  return str.split('').map(char => persianToEnglishMap[char] || char).join('');
};