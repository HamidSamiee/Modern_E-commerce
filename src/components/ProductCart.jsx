import ReactStars from "react-rating-stars-component";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import compare from "@assets/images/comparing.png"
import cart from "@assets/images/cart.png"

const ProductCart = (Props) => {
    const {dataSelection}=Props;
    const {imgA,imgB,brand,title,price}=dataSelection;

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
       
  return (
    <Link to="" className="col-span-2  ">
        <div className="product_cart relative bg-white shadow-lg overflow-hidden rounded-lg">
            <Link className="absolute top-[2%] right-2 ">
                     <CiHeart className="hover:text-red-500" />
            </Link>
            <div className=" flex items-center justify-center pt-10 pb-7 ">
                <img src={imgA} alt={title} className="imgA w-36 transition-all ease-in-out duration-500" />
                <img src={imgB} alt={title} className="imgB scale-0 hidden w-36 transition-all ease-in-out duration-500" />
            </div>
            <div className="flex flex-col gap-3 p-4">
                <h6 className="text-xs text-[var(--color-bf4800)]">{brand} </h6>
                <h5 className="font-extrabold text-[var(--color-131921)] text-base line-clamp-2">{title}</h5>
                <div className="self-end">
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
                <p className="text-base self-end ">{price}</p>
            </div>
            <div className="action_bar absolute top-[8%] -right-5 transition-all ease-in-out duration-300">
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