import React from 'react'

const Textarea = ({placeholder,className, spellCheck,value,onChange,style}) => {
    return (
        <textarea
            className={className}
            // style={style}
            placeholder={placeholder}
            spellCheck={spellCheck}
            value={value}
            onChange={onChange}

        />
    )
}

export default Textarea