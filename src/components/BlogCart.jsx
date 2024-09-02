// import { toPersianDigits } from "@/utils/toPersianDigits"
import { Link } from "react-router-dom"


const BlogCart = (Props) => {
    const {dataBlog}=Props;
    const {img,date,title,description}=dataBlog;
  return (
    <div className="col-span-3  ">
        <div className="bg-white shadow-lg overflow-hidden rounded-lg">
            <div className="">
                <img src={img} alt={title} className="" />
            </div>
            <div className="flex flex-col gap-2  p-4">
                <p className="text-xs text-gray-400">{date} </p>
                <h5 className="font-extrabold text-lg mb-2 line-clamp-2">{title}</h5>
                <p className="text-base line-clamp-4 mb-2">{description}</p>
                <Link to='' className="self-end px-2 py-1 rounded-full font-bold bg-[var(--color-febd69)]">
                    ادامه مطلب
                </Link>
            </div>
        </div>
    </div>
  )
}

export default BlogCart