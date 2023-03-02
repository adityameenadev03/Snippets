import React from 'react'

const Input = ({type,placeholder,name,value,onChange,onPaste,onBlur,onKeyDown,className}) => {
    
  return (
    <>
    <input
    className={className}
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    onPaste={onPaste}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
/>
    </>
  )
}

export default Input