import ApplyDiscount from "@/components/ApplyDiscount";
import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container";
import Input from "@/components/Input";
import Meta from "@/components/Meta"
import { iranCity, iranTowns } from "@/utils/iranCity";
import { toPersianDigits, toPersianDigitsWithComma } from "@/utils/toPersianDigits";
import { useFormik } from "formik";
import {  useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
// Images
import tipax from "@assets/images/imgBlog/tipax.png";
import pishtaz from "@assets/images/imgBlog/Iran-Post-Pishtaz-logo.png";
import barbari from "@assets/images/imgBlog/barbarikaj_barbari.png";
import { TiArrowBack } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as Yup from "yup"
import { createOrder, getProductFromCart, updatedCart } from "@/features/CartSlice/CartSlice";
import { getOrderByUser, payment, saveAddress } from "@/features/userSlice/userSlice";
 


const sendMethods = [
    { id: "sendMethod1", label: "تیپاکس", cost: 110000,image:tipax },
    { id: "sendMethod2", label: "پست پیشتاز", cost: 80000,image:pishtaz },
    { id: "sendMethod3", label: "باربری", cost: 150000,image:barbari },
];


const Checkout = () => {

    const { cart, cartTotal,totalAfterDiscount ,cartId ,isSuccess ,order} = useSelector((state) => state.cart);
    const {user}=useSelector(state  => state.auth)

    const [step, setStep] = useState(1);
    const dispatch=useDispatch();
    
    const irTowns=iranTowns();
    const irCitys=iranCity();


    const formikStep1 = useFormik({
        enableReinitialize:true,
        initialValues: {
            city: iranTowns(user.province) ? iranTowns(user.province)?.find(item => item[1] === user.city)?.[1] : "",
            province: irCitys && user.province ? irCitys.find(item => item[1] === user.province.toString())?.[1] : "",
            phoneNumber: user.mobile || "",
            postalCode: user.postalCode ||"",
            address: user.address || "",
        },
        validationSchema: Yup.object({
            city: Yup.string().required("شهر الزامی است"),
            province: Yup.string().required("منطقه الزامی است"),
            phoneNumber: Yup.string()
            .required("شماره تلفن الزامی است")
            .matches(/^09\d{9}$/, "شماره تلفن معتبر نیست"),
            postalCode: Yup.string()
            .required("کد پستی الزامی است")
            .matches(/^\d{10}$/, "کد پستی باید 10 رقم باشد"),
            address: Yup.string().required("آدرس الزامی است"),
        }),
        onSubmit: (values) => {
            console.log("Step 1 Values: ", values);
            dispatch(saveAddress(values));
            setTimeout(() => {
                setStep(2);
                dispatch(getOrderByUser())
            }, 1000);
        },
    });

    const formikStep2 = useFormik({
        initialValues: {
            sendMethod: "",
        },
        validationSchema: Yup.object({
            sendMethod: Yup.string().required("انتخاب روش ارسال الزامی است"),
        }),
        onSubmit: (values) => {
            console.log("Step 2 Values: ", values);
            dispatch(updatedCart({id:cartId , shippingMethod : values.sendMethod}));
            dispatch(createOrder({ shippingMethod : values.sendMethod}));
            // console.log(cart)
            setTimeout(() => {
                
                if(window.innerWidth <= 1024){
                    setStep(3);
                }
            }, 1000);
        },
    });
    
    useEffect(() => {
      
        dispatch(getProductFromCart())
        
    }, [dispatch])
    

    const currentShippingCost =
        sendMethods.find((method) => method.label === formikStep2.values.sendMethod)?.cost || 0;

    const handlePayment=()=>{
        const pay={
            amount: totalAfterDiscount > 0 && totalAfterDiscount || cartTotal,
            description: `مرحله پرداخت سفارش ${order._id.slice(-4)} `,
            callbackUrl:"http://localhost:5173/PaymentCallback",
            mobile: user.mobile,
            email: user.email,
            order_id: order._id,
            shippingMethod: order.shippingMethod,
        }
        dispatch(payment(pay))
    }


    return (
        <>
         <Meta title=" سبد خرید " /> 
         <BreadCrumb title=" سبد خرید " />
         <Container class1="py-5 bg-[var(--color-f5f5f7)]">
             <div className="grid grid-cols-12 gap-5">
                     <div className={`relative col-span-12 sm-custom3:col-span-12 p-5  transition-all duration-300 ease-linear`}>        
                         
                             <div className="flex flex-col gap-2">
                                     <nav className="mb-2 block">
                                         <ol className="breadcrumb  text-base flex items-center">
                                             <li className="">
                                                 <Link to='/cart' className="text-white  "> سبد خرید</Link>
                                             </li>
                                             <li className={`${step == 1 ? 'activeStage' : 'text-white'} `}>
                                                 <Link to='/checkout' className={`  `}> اطلاعات تماس</Link>
                                             </li>
                                             <li className={`${step == 2 ? 'activeStage' : 'text-white'} `}>
                                                 <Link to='/' className="  "> شیوه ارسال</Link>
                                             </li>
                                             <li className={`${ isSuccess == true && step !== 1 && step !== 2 ? 'activeStage' : 'text-white'} `}>
                                                 <Link to='/' className="  ">   پرداخت</Link>
                                             </li>
                                         </ol>            
                                     </nav>
                                     <h4 className="font-bold">{ step == 1 ?" اطلاعات تماس " : step == 2 ? " شیوه ارسال  " : "ثبت کد تخفیف و پرداخت" }</h4>
                                     <p className="flex flex-col  md:flex-row md:items-center md:gap-5 pb-1 border-b border-b-black">حساب کاربری  <span className="sm:text-sm md:text-base text-nowrap">( hamidsmoaser@yahoo.com )</span></p>
                                    <div className={`flex items-center ${step ===3 && "justify-center"} `}>
                                        {step === 1 && (
                                            <form  onSubmit={formikStep1.handleSubmit} className="flex-1 flex flex-col lg:ml-5 ">
                                                <div className="w-full py-3 md:space-y-3 space-y-2 lg:space-y-7">
                                                    {/* انتخاب استان و شهر */}
                                                    <div className={`md:w-full  flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-5 lg:gap-10`}>    
                                                        <div className="w-full flex flex-col">
                                                                    <label htmlFor="province" className="">استان :</label>
                                                                    <select 
                                                                        value={formikStep1.values.province}
                                                                        onChange={formikStep1.handleChange}
                                                                        onBlur={formikStep1.handleBlur}
                                                                        name="province"
                                                                        id="province" 
                                                                        className="w-full  p-1 bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "
                                                                    >
                                                                            {
                                                                            irCitys.map((spec,i)=>{
                                                                                return <option key={i} value={spec[1]} className="first:text-xs">{spec[0]}</option>    
                                                                            } ) 
                                                                            }
                                                                    </select>
                                                                    <div className="text-rose-500 text-xs  min-h-[0.5rem] transition-all duration-300 ease-in-out">
                                                                        {
                                                                            formikStep1.touched.province && formikStep1.errors.province
                                                                        }
                                                                    </div>
                                                        </div>
                                                        <div className="w-full flex flex-col">
                                                            <label htmlFor="city"  className="">شهر : {formikStep1.errors.city &&' *'}</label>                
                                                            <select 
                                                                value={formikStep1.values.city}
                                                                onChange={formikStep1.handleChange}
                                                                onBlur={formikStep1.handleBlur}
                                                                name="city"
                                                                id="city" 
                                                                className="w-full p-1 bg-white  border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "
                                                            >
                                                                {
                                                                iranTowns(formikStep1.values.province).map((spec,i)=>{
                                                                    return <option key={i} value={spec[1]} className="first:text-xs">{spec[0]}</option>    
                                                                } )
                                                                }
                                                            </select>
                                                            <div className="text-rose-500 text-xs  min-h-[0.5rem] transition-all duration-300 ease-in-out">
                                                                {
                                                                    formikStep1.touched.city && formikStep1.errors.city
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>    
                                                    {/* شماره موبایل و کد پستی */}
                                                    <div className="md:w-full  flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-5 lg:gap-10">
                                                        <div className="w-full  flex flex-col">
                                                            <label htmlFor="phoneNumber" className="">شماره تماس :</label>
                                                            <Input 
                                                            value={formikStep1.values.phoneNumber}
                                                            onChange={formikStep1.handleChange}
                                                            onBlur={formikStep1.handleBlur}
                                                            name="phoneNumber"
                                                            id="phoneNumber" 
                                                            type="tel" 
                                                            class2="w-full"
                                                            className="w-full placeholder:text-sm  p-1 text-right bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "
                                                            placeholder="شماره موبایل"
                                                            />
                                                            <div className="text-rose-500 text-xs  min-h-[1rem] transition-all duration-300 ease-in-out">
                                                                {
                                                                    formikStep1.touched.phoneNumber && formikStep1.errors.phoneNumber
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="w-full  flex flex-col">
                                                            <label htmlFor="postalCode" className="">کد پستی :</label>
                                                            <Input 
                                                            value={formikStep1.values.postalCode}
                                                            onChange={formikStep1.handleChange}
                                                            onBlur={formikStep1.handleBlur}
                                                            name="postalCode" 
                                                            id="postalCode" 
                                                            type="tel" 
                                                            class2="w-full" 
                                                            className="w-full placeholder:text-sm p-1 text-right bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "  placeholder="کدپستی"
                                                            />
                                                            <div className="text-rose-500 text-xs  min-h-[1rem] transition-all duration-300 ease-in-out">
                                                                {
                                                                    formikStep1.touched.postalCode && formikStep1.errors.postalCode
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            {/* وارد کردن آدرس محل سکونت */}
                                                <div className="w-full  flex flex-col">
                                                        <label htmlFor="address" className="">آدرس محل سکونت :</label>            
                                                        <textarea
                                                        value={formikStep1.values.address}
                                                        onChange={formikStep1.handleChange}
                                                        onBlur={formikStep1.handleBlur}
                                                        className= "w-full  placeholder:text-sm  bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] " 
                                                        name="address"
                                                        id="address" 
                                                        placeholder=" آدرس محل سکونت"
                                                        />
                                                        <div className="text-rose-500 text-xs  min-h-[1rem] transition-all duration-300 ease-in-out">
                                                            {
                                                                formikStep1.touched.address && formikStep1.errors.address
                                                            }
                                                        </div>
                                                </div> 
                                                <button
                                                    type="submit"
                                                    className=" mt-4 bg-blue-500 text-white px-4 py-2 rounded self-end "
                                                >
                                                    ثبت آدرس
                                                </button>
                                            </form>
                                        )}
                                        {step === 2 && (
                                            <form  onSubmit={formikStep2.handleSubmit} className="flex-1 flex flex-col lg:ml-5">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-1">
                                                    {sendMethods.map((method) => (
                                                        <div
                                                            key={method.id}
                                                            className={`p-4 border rounded cursor-pointer flex items-center justify-between  ${
                                                                formikStep2.values.sendMethod === method.label
                                                                    ? "bg-blue-100 border-blue-500"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                formikStep2.setFieldValue("sendMethod", method.label)
                                                            }
                                                        >
                                                            <h4>{method.label}</h4>
                                                            <img src={method.image} alt={method.label} className="w-16 h-16" />
                                                        </div>
                                                    ))}
                                                    <div className="flex  items-center justify-between gap-5 border border-b-red-500 px-2 ">
                                                        <p className="text-base font-bold"> هزینه ارسال:</p>
                                                        <p className="text-base font-semibold"> {toPersianDigitsWithComma(currentShippingCost)} تومان</p>
                                                    </div>
                                                </div>
                                                {formikStep2.touched.sendMethod && formikStep2.errors.sendMethod && (
                                                    <p className="text-red-500 text-sm">{formikStep2.errors.sendMethod}</p>
                                                )}


                                                { window.innerWidth >= 1024 && isSuccess == true && order.shippingMethod ? 
                                                    <p className="text-center py-8 font-bold">صورت حساب شما آماده است لطفا پرداخت کنید</p>    
                                                     :
                                                    <div className="flex justify-between mt-4 items-center">
                                                        <button
                                                            type="button"
                                                            className="bg-gray-500 text-white px-4 py-2 rounded"
                                                            onClick={() => setStep(1)}
                                                        >
                                                            مرحله قبل
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                                        >
                                                            ثبت سفارش
                                                        </button>
                                                    </div>
                                                }
                                            </form>
                                        )}
                                        <div className={`${step === 3 ? "" : "flex-1"}  hidden lg:block space-y-5 pr-4 border-r border-r-[var(--color-999999)]  `}>
                                                <div className={`border-b-2 border-b-[var(--color-eaeaea)] flex flex-col items-center justify-center max-h-[400px] pt-2 overflow-y-auto ${step ===3 && "lg:w-1/2"} `}>
                                                        {cart &&
                                                            cart?.map(p=>{
                                                                return <div key={p.id} className="flex gap-5 pb-4">
                                                                            <div className="relative w-[20%]">
                                                                                <img src={p.img} alt={p.title} className="" />
                                                                                <div className="w-6 h-6 absolute -top-2 -left-2 font-bold  rounded-full bg-black/20 inline-flex items-center justify-center">
                                                                                        <p className="text-white text-xs">{toPersianDigitsWithComma(p.quantity)}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="w-[60%] flex flex-col justify-center gap-3">
                                                                                <h5 className="line-clamp-2">{p.name}</h5>
                                                                                <p className="text-[var(--color-999999)] text-sm"> رنگ : {p.color} </p>
                                                                            </div>
                                                                            <div className="w-[10%] flex items-center justify-center">{toPersianDigitsWithComma(p.price)} تومان</div>
                                                                    </div>
                                                            })
                                                        }
                                                </div>   
                                        </div>
                                    </div>
                                    <div className="hidden lg:flex flex-col md:items-center p-5 gap-5 border-2 border-[var(--color-eaeaea)]">
                                            <div className="md:w-1/2 flex  items-center justify-between gap-5">
                                                <p className="text-base font-bold">جمع سبد خرید</p>
                                                <p className="text-base font-semibold"> {toPersianDigitsWithComma(cartTotal)} تومان</p>
                                            </div> 
                                            <div className="md:w-1/2 flex  items-center justify-between gap-5">
                                                <p className="text-base font-bold"> هزینه ارسال:</p>
                                                <p className="text-base font-semibold"> {toPersianDigitsWithComma(currentShippingCost)} تومان</p>
                                            </div>
                                            <ApplyDiscount />
                                            <div className="md:w-1/2 flex  items-center justify-between gap-5">
                                                <p className="text-base font-bold"> تخفیف:</p>
                                                <p className="text-base font-semibold"> {totalAfterDiscount ? toPersianDigitsWithComma(cartTotal - totalAfterDiscount): toPersianDigits(0)} تومان</p>
                                            </div>
                                            <div className="text-center rounded-md p-1 border-2 border-rose-500">
                                                <p className="text-base font-bold  ">
                                                    <strong>مجموع نهایی خرید: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {totalAfterDiscount ? toPersianDigitsWithComma(totalAfterDiscount + currentShippingCost): toPersianDigitsWithComma(cartTotal + currentShippingCost)} &nbsp; تومان</strong>
                                                </p>
                                            </div> 
                                            <div className="w-1/2 flex items-center justify-center mx-3">
                                                <button
                                                    onClick={handlePayment}
                                                    disabled={isSuccess === false}
                                                    className={` ${isSuccess === false && "cursor-not-allowed bg-green-500/30"} w-full bg-green-500 text-white px-4 py-2 rounded`}
                                                >
                                                    پرداخت
                                                </button>
                                            </div>  
                                    </div>
                                    {step === 3 && (
                                        <div className={` col-span-12 lg:hidden space-y-5 pr-4 border-r border-r-[var(--color-999999)] `}>
                                                        
                                                            <div className="border-b-2 pt-2 border-b-[var(--color-eaeaea)] flex flex-col items-center justify-center h-auto  overflow-y-auto">
                                                                    {cart &&
                                                                        cart?.map(p=>{
                                                                            return <div key={p.id} className="flex gap-5 pb-4">
                                                                                        <div className="relative w-[20%]">
                                                                                            <img src={p.img} alt={p.title} className="" />
                                                                                            <div className="w-6 h-6 absolute -top-2 -left-2 font-bold  rounded-full bg-black/20 inline-flex items-center justify-center">
                                                                                                    <p className="text-white text-xs">{toPersianDigitsWithComma(p.quantity)}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="w-[60%] flex flex-col justify-center gap-3">
                                                                                            <h5 className="line-clamp-2">{p.name}</h5>
                                                                                            <p className="text-[var(--color-999999)] text-sm"> رنگ : {p.color} </p>
                                                                                        </div>
                                                                                        <div className="w-[10%] flex items-center justify-center">{toPersianDigitsWithComma(p.price)} تومان</div>
                                                                                </div>
                                                                        })
                                                                    }
                                                            </div>
                                                            <div className="flex flex-col pb-5 gap-5 border-b-2 border-b-[var(--color-eaeaea)]">
                                                                <div className="flex  items-center justify-between gap-5">
                                                                    <p className="text-base font-bold">جمع سبد خرید</p>
                                                                    <p className="text-base font-semibold"> {toPersianDigitsWithComma(cartTotal)} تومان</p>
                                                                </div> 
                                                                <div className="flex  items-center justify-between gap-5">
                                                                    <p className="text-base font-bold"> هزینه ارسال:</p>
                                                                    <p className="text-base font-semibold"> {toPersianDigitsWithComma(currentShippingCost)} تومان</p>
                                                                </div>
                                                                <ApplyDiscount />
                                                                <div className="flex  items-center justify-between gap-5">
                                                                    <p className="text-base font-bold"> تخفیف:</p>
                                                                    <p className="text-base font-semibold"> {totalAfterDiscount ? toPersianDigitsWithComma(cartTotal - totalAfterDiscount): toPersianDigits(0)} تومان</p>
                                                                </div>
                                                                <div className="text-center rounded-md p-1 border-2 border-rose-500">
                                                                    <p className="text-base font-bold  ">
                                                                        <strong>مجموع نهایی خرید: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {totalAfterDiscount ? toPersianDigitsWithComma(totalAfterDiscount + currentShippingCost): toPersianDigitsWithComma(cartTotal + currentShippingCost)} &nbsp; تومان</strong>
                                                                    </p>
                                                                </div>   

                                                            </div>
                                                            <div className="flex items-center justify-center mx-3">
                                                                <button
                                                                    onClick={handlePayment}
                                                                    className="w-[80%]  bg-green-500 text-white px-4 py-2 rounded"
                                                                >
                                                                    پرداخت
                                                                </button>
                                                            </div>
                                                        
                                        </div>
                                    )}  
                             </div>  
                         
                     </div>
             </div>
         </Container>    
        </>
        
    );
};


export default Checkout;
