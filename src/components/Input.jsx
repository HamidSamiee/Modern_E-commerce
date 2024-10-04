
const Input = (Props) => {

    const {name,type,className,placeholder,value,onChange,onBlur,class2}=Props;

  return (
    <div className={class2}>
        <input 
            name={name}
            type={type}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    </div>

  )
}

export default Input