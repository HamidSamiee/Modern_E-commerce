import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const DatePickerField = (Props) => {
    const {label,formik} = Props;

    const handleDateChange = (date) => {
        if (date) {
          // تبدیل تاریخ انتخابی به میلادی
          const gregorianDate = date.toDate(); // تبدیل به Date میلادی
          const formattedDate = `${gregorianDate.getFullYear()}-${(gregorianDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${gregorianDate.getDate().toString().padStart(2, "0")}`;
          // ذخیره تاریخ میلادی در فرمیک
          formik.setFieldValue("expiry", formattedDate);
        } else {
          formik.setFieldValue("expiry", "");
        }
      };

  return (
      <div>
          <label
        //    className="block text-lg font-base mb-1 text-right"
          >
              {label}
          </label>
          <DatePicker
              inputClass="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
              containerClassName="w-full"
              format="YYYY/MM/DD"
              calendarPosition="bottom-cenrer"
              value={formik.values.expiry ? new Date(formik.values.expiry) : null} // تبدیل به میلادی برای مقدار پیش‌فرض
              onChange={handleDateChange}
              calendar={persian}
              locale={persian_fa}
          />
          <div className="text-rose-500 text-xs">
                  {
                    formik.touched.expiry && formik.errors.expiry
                  }
          </div>
    </div>
  )
}

export default DatePickerField