
const Input = (Props) => {

    const {name,type,className,placeholder,class2}=Props;

  return (
    <div className={class2}>
        <input 
            name={name}
            type={type}
            className={className}
            placeholder={placeholder}
        />
    </div>

  )
}

export default Input