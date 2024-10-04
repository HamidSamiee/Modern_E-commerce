import { useState } from 'react';


const ImageMagnifier = (Props) => {

  const { src, alt }=Props;  
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [magnifierStyle, setMagnifierStyle] = useState({});

  const handleMouseMove = (e) => {

    if (!isMagnifying) return;

    const img = e.target;
    const { left, top, width, height } = img.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // محاسبه موقعیت پس‌زمینه بر اساس موقعیت ماوس
    const backgroundX = (x / width) * 100;
    const backgroundY = (y / height) * 100;

    setMagnifierStyle({
      left: `${e.clientX - 100}px`, // اندازه را بر اساس نیاز تنظیم کنید
      top: `${e.clientY -100}px`,
      backgroundImage: `url(${src})`,
      backgroundSize: `${width * 2}px ${height * 2}px`, // ضریب بزرگ‌نمایی
      backgroundPosition: `${backgroundX}% ${backgroundY}%`,
    });
  };

  return (
    <div
      className="image-container"
      onMouseEnter={() => setIsMagnifying(true)}
      onMouseLeave={() => setIsMagnifying(false)}
      onMouseMove={handleMouseMove}
    >
      <img src={src} alt={alt} className="main-image" />
      {isMagnifying && (
        <div className="magnifier" style={magnifierStyle}></div>
      )}
    </div>
  );
};

export default ImageMagnifier;
