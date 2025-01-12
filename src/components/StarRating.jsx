import { Rate } from 'antd';

const StarRating = (Props) => {
    const { star, setStar } = Props;

    const handleRating = (value) => {
        setStar(value);
    };

    return (
        <Rate 
            allowHalf 
            defaultValue={star}
            onChange={handleRating} // تنظیم عملکرد تغییر امتیاز
            disabled={setStar == null}
            style={{ fontSize: '15px' }} // اندازه ستاره‌ها را تنظیم می‌کند
            className="custom-rate" 
        />
    );
};

export default StarRating;