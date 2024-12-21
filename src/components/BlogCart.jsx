// import { toPersianDigits } from "@/utils/toPersianDigits"
import { Link } from "react-router-dom"


const BlogCart = (Props) => {
    const {dataBlog ,grid }=Props;
    const {id,img,date,title,description}=dataBlog;
  return (
    <div className={`sm-custom:col-span-12 col-span-6  md:col-span-4  `}>
        <div className="bg-white shadow-lg overflow-hidden rounded-lg">
            <div className="">
                <img src={img} alt={title} className="" />
            </div>
            <div className="flex flex-col gap-2 p-4">
                <p className="text-xs text-gray-400">{date} </p>
                <h5 className={`${grid == 6 ? "h-14" : ""} font-extrabold leading-8 text-base md:text-lg mb-2 line-clamp-2`}>{title}</h5>
                <p className="text-base text-justify line-clamp-4 mb-2">{description.short}</p>
                <Link to={`/blog/${id}`} className="self-end px-2 py-1 rounded-full font-bold bg-[var(--color-febd69)]">
                    ادامه مطلب
                </Link>
            </div>
        </div>
    </div>
  )
}

export default BlogCart