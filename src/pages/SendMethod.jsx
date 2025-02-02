import BreadCrumb from "@components/BreadCrumb";
import Container from "@components/Container";
import Input from "@components/Input";
import Meta from "@components/Meta";
import { toPersianDigitsWithComma } from "@utils/toPersianDigits";
import { useFormik } from "formik";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as Yup from "yup";

// Images
import tipax from "@assets/images/imgBlog/tipax.png";
import pishtaz from "@assets/images/imgBlog/Iran-Post-Pishtaz-logo.png";
import barbari from "@assets/images/imgBlog/barbarikaj_barbari.png";

const AddProductSchema = Yup.object({
    sendMethod: Yup.string().required("انتخاب شیوه ارسال الزامی است"),
});

const sendMethods = [
    { id: "sendMethod1", label: "ارسال با تیپاکس", image: tipax },
    { id: "sendMethod2", label: "ارسال با پست پیشتاز", image: pishtaz },
    { id: "sendMethod3", label: "ارسال با باربری", image: barbari },
];

const SendMethod = () => {
    const { cart, cartTotal } = useSelector((state) => state.cart);
    const [grid, setGrid] = useState(8);
    const clacGrid = 12 - grid;

    const location=useLocation();

    const toggleGrid = () => setGrid(grid === 8 ? 4 : 8);

    const formik = useFormik({
        initialValues: { sendMethod: "" },
        validationSchema: AddProductSchema,
        onSubmit: (values) => console.log(values),
    });

    const handleDivClick = (value) => {
        formik.setFieldValue("sendMethod", value);
    };

        // محاسبه هزینه ارسال بر اساس روش انتخاب شده
        const shippingCost = 
        formik.values.sendMethod === "sendMethod1"
            ? 110000
            : formik.values.sendMethod === "sendMethod2"
            ? 80000
            : formik.values.sendMethod === "sendMethod3"
            ? 150000
            : 0;

    // محاسبه مجموع نهایی
    const finalTotalPrice = cartTotal + shippingCost;

    return (
        <>
            <Meta title="سبد خرید" />
            <BreadCrumb title="سبد خرید" />
            <Container class1="py-5 bg-[var(--color-f5f5f7)]">
                <div className="grid grid-cols-12 gap-5">
                    <div
                        className={`relative col-span-12 sm:col-span-${grid} lg:col-span-6 transition-all duration-300 ease-linear`}
                    >
                        {grid !== 8 && window.innerWidth >= 640 && window.innerWidth < 1024 ? (
                            <div
                                className="w-full h-full flex items-center justify-center"
                                onClick={toggleGrid}
                            >
                                <p className="text-2xl">
                                    برای <br /> وارد کردن <br /> نحوه ارسال کالا <br /> کلیک کنید
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <nav className="mb-2 hidden lg:block">
                                    <ol className="lg:breadcrumb text-base flex items-center">
                                        <li>
                                            <Link to="/cart" className="lg:text-white">
                                                سبد خرید
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/checkout" className="lg:text-white">
                                                اطلاعات تماس
                                            </Link>
                                        </li>
                                        <li
                                            className={`${
                                                location.pathname === "/sendMethod" ? "activeStage" : "lg:text-white"
                                            }`}
                                        >
                                            <Link to="/sendMethod">شیوه ارسال</Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="lg:text-white">
                                                پرداخت
                                            </Link>
                                        </li>
                                    </ol>
                                </nav>
                                <h4 className="font-bold">شیوه ارسال</h4>
                                <p className="flex flex-col md:flex-row md:items-center md:gap-5">
                                    حساب کاربری <span className="sm:text-sm md:text-base text-nowrap">( hamidsmoaser@yahoo.com )</span>
                                </p>
                                <form className="w-full py-3 md:space-y-3 space-y-2">
                                    <div className=" md:w-full lg:w-[90%] flex flex-col md:flex-row items-center gap-5 lg:gap-10 overflow-x-auto">
                                        {sendMethods.map((method) => (
                                            <div
                                                key={method.id}
                                                className="w-[70%] md:w-full flex flex-col items-center gap-1 border border-gray-400 rounded-md p-2 h-32"
                                                onClick={() => handleDivClick(method.id)}
                                            >
                                                <div className="w-full flex items-center gap-5">
                                                    <label htmlFor={method.id} className="text-nowrap cursor-pointer">
                                                        {method.label} :
                                                    </label>
                                                    <Input
                                                        checked={formik.values.sendMethod === method.id}
                                                        value={method.id}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        name="sendMethod"
                                                        id={method.id}
                                                        type="radio"
                                                        className="w-full placeholder:text-sm p-1 bg-white border-none rounded-lg focus:ring-[var(--color-febd69)]"
                                                    />
                                                </div>
                                                <img src={method.image} alt={method.label} className="w-20 h-20" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-rose-500 text-xs min-h-[0.5rem] transition-all duration-300 ease-in-out">
                                        {formik.touched.sendMethod && formik.errors.sendMethod}
                                    </div>
                                    <div className="md:w-full lg:w-[90%] flex items-center justify-center md:justify-between md:gap-5 lg:gap-10">
                                        <Link
                                            to="/cart"
                                            className="hidden md:flex items-center gap-1 p-2 text-xs text-black"
                                        >
                                            <TiArrowBack className="w-4 h-4 scale-x-[-1]" /> بازگشت به سبد خرید
                                        </Link>
                                        <Link
                                            to="/"
                                            className="sm-custom2:w-full sm-custom3:w-[70%] sm-custom3:mt-5 self-end w-52 bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white text-center px-2 py-1 rounded-xl transition-all duration-300 ease-in-out"
                                        >
                                            پرداخت سفارش
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        )}
                        <button
                            className="hidden sm:flex items-center justify-center lg:hidden absolute top-1/2 -left-8 w-6 h-6 rounded-full bg-[var(--color-febd69)] transition-all duration-300 ease-linear animate-pulse hover:bg-black hover:text-[var(--color-febd69)]"
                            onClick={toggleGrid}
                        >
                            {grid === 8 ? <FaArrowRight /> : <FaArrowLeft />}
                        </button>
                    </div>
                    <div
                        className={`col-span-12 sm:col-span-${clacGrid} lg:col-span-6 space-y-5 pr-4 border-r border-[var(--color-999999)]`}
                    >
                        {clacGrid !== 8 && window.innerWidth >= 640 && window.innerWidth < 1024 ? (
                            <div
                                className="w-full h-full flex items-center justify-center"
                                onClick={toggleGrid}
                            >
                                <p className="text-2xl">
                                    برای <br /> نمایش <br />سبد خرید <br />کلیک کنید
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="border-b-2 border-b-[var(--color-eaeaea)]">
                                    {cart.map((p) => (
                                        <div key={p.id} className="flex gap-5 pb-4">
                                            <div className="relative w-[20%]">
                                                <img src={p.img} alt={p.title} />
                                                <div className="w-6 h-6 absolute -top-2 -left-2 font-bold rounded-full bg-black/15 inline-flex items-center justify-center">
                                                    <p className="text-white text-xs">
                                                        {toPersianDigitsWithComma(p.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-[60%]">
                                                <h5 className="line-clamp-2">{p.name}</h5>
                                                <p className="text-[var(--color-999999)] text-sm">
                                                    {p.color === "silver"
                                                        ? "نقره ای"
                                                        : p.color === "blue"
                                                        ? "آبی"
                                                        : p.color === "green"
                                                        ? "سبز"
                                                        : p.color === "red"
                                                        ? "قرمز"
                                                        : p.color === "white"
                                                        ? "سفید"
                                                        : p.color === "black"
                                                        ? "مشکی"
                                                        : p.color === "pink"
                                                        ? "صورتی"
                                                        : "--"} / سایز {p.size}
                                                </p>
                                            </div>
                                            <div className="w-[10%] flex items-center justify-center">
                                                {toPersianDigitsWithComma(p.price)} تومان
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col pb-5 gap-5 border-b-2 border-b-[var(--color-eaeaea)]">
                                    <div className="flex items-center justify-between gap-5">
                                        <p className="text-base font-bold">جمع سبد خرید</p>
                                        <p className="text-base font-semibold">
                                            {toPersianDigitsWithComma(cartTotal)} تومان
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-5">
                                        <p className="text-base font-bold">هزینه ارسال</p>
                                        <p className="text-base font-semibold">
                                            { toPersianDigitsWithComma(shippingCost)}
                                             &nbsp; تومان 
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-5">
                                    <p className="text-base font-bold">مجموع :</p>
                                    <p className="text-base font-semibold">
                                        {toPersianDigitsWithComma(finalTotalPrice)} تومان
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SendMethod; 