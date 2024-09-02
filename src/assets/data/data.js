import { toPersianDigits, toPersianDigitsWithComma } from "@/utils/toPersianDigits"
import {zephyrus ,samsungWatch,surfacePro9,smartphones} from "@utils/myimages"
import {speaker,digitalCamra,redmi13,motorola,miXiaomi,ipad,speakerB,digitalCamraB,redmi13B,motorolaB,miXiaomiB,ipadB} from "@utils/myimages"
import {SPORT,AirPodsPro,Opo,s24,hp,tcl,SPORTB,AirPodsPro2,OpoB,s24B,hpB,tclB} from "@utils/myimages"
import {AppleWatch,LaptopAsus,XiaomiHedest,Iphone13} from "@utils/myimages"




export const blogs=[
    {
        img:zephyrus,
        date: "پنجشنبه 8 شهریور ۱۴۰۳",
        title:"بررسی لپ‌تاپ ایسوس Zephyrus G14 2024 رقیب مک‌بوک پرو گیمینگ",
        description:"ایسوس با Zephyrus G14 2024 گام‌هایی بلند در مسیری درست برداشته و لپ‌‌تاپ ۱۴ اینچی محبوبش را به حریفی شایسته برای مک‌بوک پرو ۱۴ بدل کرده است...",
    },
    {
        img:samsungWatch,
        date:"پنجشنبه 8 شهریور ۱۴۰۳",
        title:"بررسی گلکسی واچ اولترا؛‌ چیزی فراتر از یک تقلید",
        description:"گلکسی واچ اولترا، رقیب مستقیم اپل واچ اولترا، در برخی موارد به ساعت اپل شبیه است؛ اما قابلیت‌هایی دارد که آن را از اپل واچ متمایز می‌کند.",
    },
    {
        img:surfacePro9,
        date:"پنجشنبه 8 شهریور ۱۴۰۳",
        title:"بررسی آپدیت ۲۰۲۴ ویندوز ۱۱؛ از تغییرات فایل اکسپلورر تا ویژگی‌های انحصاری هوش مصنوعی",
        description:"به‌روزرسانی ۲۰۲۴ ویندوز ۱۱ شامل پیشرفت سیستم‌عامل و معرفی قابلیت‌های جدید هوش مصنوعی است و تمرکز ویژه‌ای بر سیستم‌های مبتنی بر آرم دارد.",
    },
    {
        img:smartphones,
        date:"پنجشنبه 8 شهریور ۱۴۰۳",
        title:"بهترین گوشی‌های موبایل بازار ایران [شهریور ۱۴۰۳]",
        description:"در مقاله‌ی پیش‌ رو با در نظر گرفتن پارامترهای تأثیرگذار بر تجربه‌ی کاربر، بهترین گوشی‌های بازار ایران را در بازه‌های قیمتی مختلف معرفی می‌کنیم.",
    },
]

export const selectionProduct=[
    {
        imgA:motorola,
        imgB:motorolaB,
        brand: "موتورولا",
        title:"هدفون موتورولا مدل Pulse M",
        price:toPersianDigitsWithComma(6690000),
    },
    {
        imgA:miXiaomi,
        imgB:miXiaomiB,
        brand:"شیائومی",
        title:"مچ بند هوشمند شیائومی مدل Mi Band 8 گلوبال",
        price:toPersianDigitsWithComma(1721000),
    },
    {
        imgA:digitalCamra,
        imgB:digitalCamraB,
        brand:"سونی",
        title:"دوربین دیجیتال بدون آینه سونی مدل Alpha A6400 به همراه لنز 16-50 میلی متر OSS",
        price:toPersianDigitsWithComma(57120000),
    },
    {
        imgA:speaker,
        imgB:speakerB,
        brand:"تی & جی",
        title:"اسپیکر بلوتوثی قابل حمل تی اند جی مدل Tg-113",
        price:toPersianDigitsWithComma(145040),
    },
    {
        imgA:redmi13,
        imgB:redmi13B,
        brand:"شیائومی",
        title:"گوشی موبایل شیائومی مدل Redmi 13 دو سیم کارت ظرفیت 256 گیگابایت و رم 8 گیگابایت",
        price:toPersianDigitsWithComma(8699000),
    },
    {
        imgA:ipad,
        imgB:ipadB,
        brand:"اپل",
        title:"تبلت اپل مدل iPad (9th Generation) 10.2-Inch Wi-Fi (2021) ظرفیت 64 گیگابایت",
        price:toPersianDigitsWithComma(16790000),
    },
]

export const discountProduct=[
    {
        imgA:SPORT,
        imgB:SPORTB,
        brand: "متفرقه",
        title:"ساعت هوشمند مدل AK56 HD SPORT، مناسب برای ورزش، روزمره، رسمی، دارای قابلیت‌های صفحه نمایش رنگی و لمسی، کنترل موسیقی، کنترل سطح اکسیژن خون، قابلیت مکالمه مستقیم، قابلیت مکالمه از طریق بلوتوث، بند سیلیکون، فرم صفحه دایره",
        price:toPersianDigitsWithComma(2950000),
        discount:toPersianDigits(17),
        quantity:50,
        PriceWithDiscunt:toPersianDigitsWithComma(2450000),
    },
    {
        imgA:AirPodsPro,
        imgB:AirPodsPro2,
        brand:"ای ان سی",
        title:"هندزفری بلوتوثی  مدل AirPods Pro 2nd Generation Type-C",
        price:toPersianDigitsWithComma(3000000),
        discount:toPersianDigits(84),
        quantity:28,
        PriceWithDiscunt:toPersianDigitsWithComma(468000),
    },
    {
        imgA:Opo,
        imgB:OpoB,
        brand:"اوپو",
        title:"گوشی موبایل اوپو مدل A16K دو سیم کارت ظرفیت 64 گیگابایت و رم 4 گیگابایت",
        price:toPersianDigitsWithComma(4499000),
        discount:toPersianDigits(9),
        quantity:78,
        PriceWithDiscunt:toPersianDigitsWithComma(4099000),
    },
    {
        imgA:s24,
        imgB:s24B,
        brand:"سامسونگ",
        title:"گوشی موبایل سامسونگ Galaxy S24 Ultra 5G ظرفیت 512 گیگابایت رم 12 گیگابایت - ویتنام",
        price:toPersianDigitsWithComma(75999000),
        discount:toPersianDigits(1),
        quantity:40,
        PriceWithDiscunt:toPersianDigitsWithComma(68399100),
    },
    {
        imgA:hp,
        imgB:hpB,
        brand:"اچ پی",
        title:"لپ تاپ اچ پی 16.1 اینچی مدل OMEN 16 wd0023nia i7 13620H 16GB 1TB RTX4050",
        price:toPersianDigitsWithComma(62000000),
        discount:toPersianDigits(1),
        quantity:20,
        PriceWithDiscunt:toPersianDigitsWithComma(55800000),
    },
    {
        imgA:tcl,
        imgB:tclB,
        brand:"تی سی ال",
        title:"گوشی موبایل تی سی ال مدل 406s دو سیم کارت ظرفیت 64 گیگابایت و رم 4 گیگابایت",
        price:toPersianDigitsWithComma(5159000),
        discount:toPersianDigits(18),
        quantity:60,
        PriceWithDiscunt:toPersianDigitsWithComma(4215000),
    },
]

export const famousProduct=[
    {
        imgA:AppleWatch,
        type: "ساعت هوشمند",
        title:"ساعت هوشمند اپل مدل Series 9 Aluminum 45mm M/L",
        description:"مناسب برای ورزش، روزمره، رسمی، دارای قابلیت‌های کنترل موسیقی، کنترل سطح اکسیژن خون، قابلیت مکالمه از طریق بلوتوث، بند سیلیکون، فرم صفحه مستطیل، فناوری GPS، با حافظه داخلی 64 گیگابایت",
    },
    {
        imgA:LaptopAsus,
        type:"لپ تاپ و الترابوک",
        title:"لپ تاپ ایسوس مدل Vivobook 15 X1504VA-NJ005W",
        description:" 15.6 اینچی i5 1335U 8GB 512SSD W",
    },
    {
        imgA:Iphone13,
        type:"گوشی موبایل",
        title:"گوشی موبایل اپل مدل iPhone 13 CH ",
        description:"دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 4 گیگابایت - با پوشش Gorilla Glass سرامیکی دارای استاندارد IP۶۸",
    },
    {
        imgA:XiaomiHedest,
        type:"هدست بلوتوثی",
        title:"هدست بلوتوثی شیائومی مدل NIB REDMI BUDS 3 PRO EARPHON 2022",
        description:"دو گوشی - بی‌سیم- Bluetooth - Noise Cancelling Headphone - مقاومت در برابر رطوبت و عرق",
    },
]
