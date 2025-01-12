import  toLocalDate  from "@/utils/toLocalDate";
import { Link } from "react-router-dom";

const BlogCart = (Props) => {
  const { dataBlog, grid } = Props;
  
  const { _id, images = [], createdAt, title, description } = dataBlog;

  // اطمینان از این که images آرایه است و حداقل یک عنصر دارد
  const img = Array.isArray(images) && images.length > 0 ? images[0].url : '';

  // بررسی نوع داده‌ی description
  let parsedDescription = [];
  if (typeof description === "string") {  
    try {  
        parsedDescription = JSON.parse(description);  
    } catch (error) {  
        console.error("Error parsing JSON:", error);  
        parsedDescription = [];  
    }  
} else if (Array.isArray(description)) {  
    parsedDescription = description; // اگر description از نوع آرایه باشد  
} else if (typeof description === "object") {  
    // در صورتی که description یک شیء باشد، می‌توانید تصمیم بگیرید چه کاری انجام دهید  
    // به عنوان مثال، می‌توانید فقط محتوای خاصی از آن شیء را استخراج کنید  
    parsedDescription = description.content || []; // فرض بر این است که محتوای مورد نظر در property 'content' قرار دارد  
} else {  
    console.warn("Description is not a valid type:", typeof description);  
    parsedDescription = [];  
}  

  return (
    <div className={`sm-custom:col-span-12 col-span-6 md:col-span-4`}>
      <div className="bg-white shadow-lg overflow-hidden rounded-lg">
        <div className="">
          <img src={img} alt={title} className="" />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <p className="text-xs text-gray-400">{toLocalDate(createdAt, "long")}</p>
          <h5 className={`${grid === 6 ? "h-14" : ""} font-extrabold line-clamp-2 leading-8 text-base md:text-lg mb-2`}>
            {title}
          </h5>
          <div className="text-base text-justify line-clamp-4 mb-2">
            <RenderContent content={Array.isArray(parsedDescription) ? parsedDescription : []} />
          </div>
          <Link to={`/blog/${_id}`} className="self-end px-2 py-1 rounded-full font-bold bg-[var(--color-febd69)]">
            ادامه مطلب
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCart;

// RenderContent remains the same
export const RenderContent = ({ content }) => {
  return content.map((block, index) => {
    const { type, align, children } = block;

    const childrenElements = children.map((child, childIndex) => {
      let text = child.text;

      // اضافه کردن ابزارهای فرمت‌دهی
      if (child.bold) {
        text = <strong key={childIndex}>{text}</strong>;
      }

      if (child.italic) {
        text = <em key={childIndex}>{text}</em>;
      }

      return <span key={childIndex}>{text}</span>;
    });

    // بازگرداندن المان‌های JSX با فرمت‌دهی
    switch (type) {
      case 'paragraph':
        return (
          <p key={index} style={{ textAlign: align }} >
            {childrenElements}
          </p>
        );
      // در صورت تمایل می‌توانید انواع دیگر بلوک‌های متن را نیز اضافه کنید
      default:
        return null;
    }
  });
};