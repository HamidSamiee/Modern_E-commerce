

const FamousProduct = (Props) => {

    const {dataFamous}=Props;
    const {imgA,type,title,description} = dataFamous;

  return (
    <div className='sm-custom2:col-span-12 sm-custom2:mx-5 col-span-6 md:col-span-3 rounded-lg overflow-hidden h-[400px] bg-white first:bg-black first:text-white '>
        <div className="relative  p-4 pb-0 ">
            <div className=" flex flex-col gap-2">
                <h5 className="text-sm font-light">
                    {type}
                </h5>
                <h6 className="line-clamp-1 font-extrabold">
                    {title}    
                </h6>
                <p className="text-xs line-clamp-2 font-light">
                    {description}
                </p>
            </div>
            <img src={imgA} alt={title} className="w-64 absolute top-36 left-[50%] -translate-x-[50%]  [&:nth-child(3)]:w-72" />
        </div>
    </div>
  )
}

export default FamousProduct