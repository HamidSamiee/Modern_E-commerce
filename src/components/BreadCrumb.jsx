import { Link } from "react-router-dom";


const BreadCrumb = (Props) => {
    const {title}=Props;
  return (
    <div className="py-4">
        <div className="container xl:max-w-screen-xl">
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <p className="flex items-center gap-3">
                        <Link to='/' className="">
                           خانه 
                        </Link>
                        <span className="">
                        / 
                        </span>
                        {title}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BreadCrumb