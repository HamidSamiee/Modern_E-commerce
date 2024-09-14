
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";


const SpecialProduct = (Props) => {

    const {dataSpecial}=Props;
    const {id,imgA,imgB,brand,title,price,discount,quantity,PriceWithDiscunt} = dataSpecial;
    const [image, setImage] = useState(imgA)
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };

  return (
    <Link to={`/product/${id}`} className='col-span-4 '>
        <div className="p-2.5 rounded-xl bg-white h-[300px] ">
            <div className="w-full h-full flex items-center justify-between gap-5">
                {/* decription section */}
                <div className="flex-1 flex flex-col gap-1 p-4">
                    <h6 className="text-xs text-[var(--color-bf4800)] mb-1">{brand} </h6>
                    <h5 className="font-extrabold text-[var(--color-131921)] text-base line-clamp-2">{title}</h5>
                    <div className="self-end ">
                        <ReactStars
                            classNames=""
                            count={5}
                            onChange={ratingChanged}
                            size={20}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />    
                    </div>
                    <div className="w-full text-left text-sm flex flex-col justify-center mb-1">
                        <div className="self-end flex items-center gap-1">
                            <strike className="text-red-500 font-light"> {PriceWithDiscunt}</strike>
                            <span className="px-2 py-0.5 pt-1 rounded-full bg-red-500 text-white font-bold ">% {discount} </span>
                        </div>
                        <p className=" ">
                            {price} تومان
                        </p>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">{toPersianDigits(50)} روز</p>
                        <div className="flex flex-row-reverse gap-1 text-white items-center text-xs">
                            <span className="w-7 h-7 p-1.5 pt-2 rounded-full flex items-center justify-center bg-red-500">{toPersianDigits(5)}</span><span className="text-black font-medium">:</span>
                            <span className="w-7 h-7 p-1.5 pt-2 rounded-full flex items-center justify-center bg-red-500">{toPersianDigits(17)}</span><span className="text-black font-medium">:</span>
                            <span className="w-7 h-7 p-1.5 pt-2 rounded-full flex items-center justify-center bg-red-500">{toPersianDigits(35)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <p className="text-xs ">تعداد محصولات : { toPersianDigits(quantity) }</p>
                        <div className=" flex flex-row-reverse overflow-hidden bg-blue-50 h-1.5 rounded-full w-full">
                            <span
                                className="h-full bg-blue-500 w-full block rounded-full"
                                style={{width: `${quantity}%`,direction: 'ltr'}}
                            >    
                            </span>
                        </div>
                    </div>
                    <button className="self-end px-2 py-1 rounded-full bg-[var(--color-febd69)] font-bold w-1/2">
                            خرید
                    </button>
                </div>
                {/* image section */}
                <div className="flex-1 flex flex-col gap-5 justify-center">
                    <img src={image} alt={title} className="w-[205px]" />
                    <div className="w-full flex items-center justify-center gap-2">
                         <Link to='' onClick={()=>setImage(imgA)} className="w-16 h-auto p-1 border border-[var(--color-ededed)] rounded-md">
                                    <img src={imgA} alt={title} className="" />
                         </Link>
                         <Link to='' onClick={()=>setImage(imgB)} className="w-16 h-auto p-1 border border-[var(--color-ededed)] rounded-md">
                                    <img src={imgB} alt={title} className="" />
                         </Link>
                                
                    </div>    
                </div>
            </div>
        </div>
    </Link>
  )
}

export default SpecialProduct