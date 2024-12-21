import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Meta from "@/components/Meta"
import { toPersianDigits } from "@/utils/toPersianDigits"


const PrivacyPolicy = () => {
  return (
    <>
       <Meta title=" حریم خصوصی " /> 
       <BreadCrumb title=" حریم خصوصی" />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <div className="bg-white p-8 flex flex-col gap-8">
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(1)}. مقدمه و تأکید بر حریم خصوصی</h3>
                          <p className="text-[var(--color-777777)] text-justify">فروشگاه دیجی مارکت با تاکید بر احترامی که برای حریم شخصی کاربران قائل است، برای خرید، ثبت نظر یا استفاده از برخی امکانات وب‌سایت اطلاعاتی را از کاربران درخواست می‌کند تا بتواند خدماتی امن و مطمئن را به کاربران ارائه دهد.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(2)}. اطلاعات مورد نیاز برای پردازش و ارسال سفارش</h3>
                          <p className="text-[var(--color-777777)] text-justify">برای پردازش و ارسال سفارش، اطلاعاتی مانند آدرس، شماره تلفن و ایمیل مورد نیاز است. وارد کردن اطلاعاتی مانند نام و کد ملی برای اشخاص حقیقی یا کد اقتصادی و شناسه ملی برای خریدهای سازمانی لازم است.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(3)}. استفاده از اطلاعات برای ارسال سفارشات و تحویل</h3>
                          <p className="text-[var(--color-777777)] text-justify">مشتریان می‌توانند نام، آدرس و تلفن شخص دیگری را برای تحویل گرفتن سفارش وارد کنند و فروشگاه تنها برای ارسال همان سفارش، از این اطلاعات استفاده خواهد کرد</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(4)}. استفاده از اطلاعات برای ارتباط با مشتریان و بازاریابی</h3>
                          <p className="text-[var(--color-777777)] text-justify">فروشگاه ممکن است برای ارتباط با مشتریان، بهینه‌سازی محتوای وب‌سایت و تحقیقات بازاریابی از برخی اطلاعات استفاده کند و برای اطلاع‌رسانی رویدادها و اخبار، خدمات و سرویس‌های ویژه یا پروموشن‌ها، برای اعضای وب‌سایت ایمیل یا پیامک ارسال نماید.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(5)}. حق ویرایش و استفاده قانونی از نظرات و اطلاعات کاربران</h3>
                          <p className="text-[var(--color-777777)] text-justify">فروشگاه ممکن است نقد و نظرهای ارسالی کاربران را در راستای رعایت قوانین وب سایت ویرایش کند. در صورتی که نظر یا پیام ارسال شده توسط کاربر، مشمول مصادیق محتوای مجرمانه باشد، فروشگاه می‌تواند از اطلاعات ثبت‌شده برای پیگیری قانونی استفاده کند.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(6)}. حفظ امنیت اطلاعات کاربر</h3>
                          <p className="text-[var(--color-777777)] text-justify">حفظ و نگهداری رمز عبور و نام کاربری بر عهده کاربران است. کاربران نباید این اطلاعات را برای شخص دیگری فاش کنند. در صورت واگذاری شماره همراه، باید شماره جدیدی در پروفایل ثبت شود.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(7)}. محرمانگی اطلاعات شخصی</h3>
                          <p className="text-[var(--color-777777)] text-justify">فروشگاه اطلاعات شخصی کاربران را محرمانه می‌داند و آن را به هیچ شخص یا سازمان دیگری منتقل نمی‌کند، مگر با حکم مقام قضایی یا اداری صالحه یا طبق قوانین و مقررات رایج کشور.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(8)}. استفاده از IP و کوکی‌ها</h3>
                          <p className="text-[var(--color-777777)] text-justify">فروشگاه مانند سایر وب‌سایت‌ها از جمع‌آوری IP و کوکی‌ها استفاده می‌کند، اما تلاش می‌کند که اطلاعات کاربران را محافظت و از دسترسی‌های غیرقانونی جلوگیری کند.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(9)}. خاتمه و تغییرات در متن حریم خصوصی</h3>
                          <p className="text-[var(--color-777777)] text-justify">فروشگاه می‌تواند بدون اطلاع قبلی محتوای این متن را تغییر و بروزرسانی کند. تلاش فروشگاه برای تأمین تجربه خریدی امن، راحت و خوشایند است.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl mb-3 text-[var(--color-131921)]">{toPersianDigits(10)}. تعاریف کلیدی</h3>
                          <h4 className="font-bold text-base text-[var(--color-131921)] mb-1">تعریف وب‌سایت</h4>
                          <p className="text-[var(--color-777777)] text-justify mb-2">“وب‌سایت” به مجموعه صفحات و محتوای آنلاین تحت دامنه www.DgMarket.com اشاره دارد که توسط فروشگاه دیجی مارکت مدیریت و ارائه می‌شود.</p>
                          <h4 className="font-bold text-base text-[var(--color-131921)] mb-1">تعریف خرید اینترنتی</h4>
                          <p className="text-[var(--color-777777)] text-justify mb-2">“خرید اینترنتی” به فرآیند انتخاب، سفارش و خرید کالا یا خدمات از طریق وب‌سایت فروشگاه دیجی مارکت از راه دور و به وسیله ابزارهای دیجیتالی اشاره دارد.</p>
                          <h4 className="font-bold text-base text-[var(--color-131921)] mb-1">تعریف کاربر</h4>
                          <p className="text-[var(--color-777777)] text-justify mb-2">“کاربر” به هر شخص حقیقی یا حقوقی اشاره دارد که از وب‌سایت فروشگاه دیجی مارکت استفاده می‌کند، خواه برای مشاهده محتوا، خرید کالا یا خدمات، یا استفاده از سایر امکانات موجود در وب‌سایت.</p>
                          <h4 className="">تعریف اطلاعات شخصی</h4>
                          <p className="text-[var(--color-777777)] text-justify">“اطلاعات شخصی” به داده‌ها یا اطلاعاتی اشاره دارد که به طور مستقیم یا غیرمستقیم به شناسایی یک شخص حقیقی منجر می‌شود، مانند نام، آدرس، شماره تلفن، ایمیل، کد ملی و غیره.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(11)}. اصول و قوانین استفاده از وب‌سایت</h3>
                          <p className="text-[var(--color-777777)] text-justify">با استفاده از وب‌سایت فروشگاه دیجی مارکت، کاربران به طور خودکار با قوانین و شرایط استفاده از وب‌سایت موافقت می‌کنند. کاربران موظف به رعایت کلیه قوانین و دستورالعمل‌های اعلام‌شده از سوی فروشگاه هستند. تخطی از این قوانین می‌تواند منجر به محدودیت دسترسی به وب‌سایت یا برخورد قانونی شود. کاربران باید مسئولیت کامل رفتار خود در وب‌سایت را بپذیرند و در صورت هرگونه تخلف، ممکن است مسئولیت‌های قانونی بر عهده آن‌ها باشد.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(12)}. تغییرات در شرایط و ضوابط</h3>
                          <p className="text-[var(--color-777777)] text-justify">فروشگاه دیجی مارکت حق دارد هر زمان که لازم بداند، شرایط و ضوابط استفاده از وب‌سایت را تغییر دهد. این تغییرات از زمان اعلام رسمی بر روی وب‌سایت لازم‌الاجرا خواهند بود. کاربران موظف به دنبال کردن و آگاهی از این تغییرات هستند. عدم آگاهی یا پیگیری این تغییرات توسط کاربران، نمی‌تواند به عنوان دلیلی برای عدم پایبندی به قوانین جدید مورد استناد قرار گیرد.</p>
                        </div>
                        <div className="">
                          <h3 className="font-extrabold text-xl text-[var(--color-131921)] mb-3">{toPersianDigits(13)}. استفاده از حساب‌ها و شماره کارت‌های بانکی برای خریدهای اینترنتی</h3>
                          <p className="text-[var(--color-777777)] text-justify">برای انجام هرگونه خرید اینترنتی و پرداخت در وب‌سایت فروشگاه دیجی مارکت، کاربران باید از حساب‌ها و شماره کارت‌های بانکی به نام خود استفاده کنند. استفاده از اطلاعات بانکی شخص دیگری بدون اجازه قانونی می‌تواند منجر به مسائل حقوقی شود. فروشگاه دیجی مارکت هیچ مسئولیتی در قبال استفاده نادرست یا غیرقانونی از حساب‌ها و شماره کارت‌های بانکی توسط کاربران ندارد.</p>
                        </div>
                    </div>
                </div>
            </div>
       </Container>
    </> 
  )
}

export default PrivacyPolicy