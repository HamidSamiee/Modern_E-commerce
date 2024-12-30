import React from "react";

const Input =React.memo((Props) => {

    const {name,id,type,className,placeholder,value,onChange,onBlur,onInput,pattern,class2,disabled}=Props;

  return (
    <div className={class2}>
        <input 
            id={id}
            name={name}
            type={type}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onInput={onInput}
            pattern={pattern}
            disabled={disabled}
        />
    </div>
  )

})

Input.displayName = "Input";

export default Input