import ReactStars from "react-rating-stars-component";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import compare from "@assets/images/comparing.png"
import cart from "@assets/images/cart.png"

const ProductCart = (Props) => {
    const {dataSelection,grid}=Props;
    const {imgA,imgB,brand,title,description,price}=dataSelection;

    const location=useLocation();
    

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
       
  return (
    <Link to="" className={` ${location.pathname == '/shop' ? `col-span-${grid}` : "col-span-2" } `} >
        <div className={`product_cart  relative bg-white shadow-lg overflow-hidden rounded-lg ${grid == 12 && 'flex px-8'}`}>
            <Link className="absolute top-[2%] right-2 ">
                     <CiHeart className="hover:text-red-500" />
            </Link>
            <div className=" flex items-center justify-center pt-10 pb-7 ">
                <img src={imgA} alt={title} className="imgA w-36 transition-all ease-in-out duration-500" />
                <img src={imgB} alt={title} className="imgB scale-0 hidden w-36 transition-all ease-in-out duration-500" />
            </div>
            <div className=" w-full flex flex-col gap-2 p-4">
                <h6 className="text-xs text-[var(--color-bf4800)]">{brand} </h6>
                <h5 className={`${grid == 12 ? "" : "h-12"} font-extrabold text-[var(--color-131921)] text-base line-clamp-2`}>{title}</h5>
                <div className=" flex flex-col items-end ">
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
                        <p className={` ${grid == 12 ? 'block' : 'hidden'} text-xs text-justify mt-2 text-gray-400 line-clamp-2`}>{description}</p> 
                        <p className="text-base  text-nowrap">{price} تومان</p>

                </div>
            </div>
            <div className={`action_bar absolute top-8 -right-5 transition-all ease-in-out duration-300 `}>
                <div className="flex flex-col justify-center gap-3">
                  <Link className="">
                     <img src={compare} alt="" className="w-4" />
                  </Link>
                  <Link className="">
                     <IoEyeOutline className="hover:text-sky-500"/>
                  </Link>
                  <Link className="">
                    <img src={cart} alt="" className="w-4" />
                  </Link>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCart