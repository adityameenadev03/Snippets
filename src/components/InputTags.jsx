import React, { useEffect, useState } from "react";

const InputTags = ({ updateData }) => {
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);

    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };
    useEffect(() => {
        updateData(prev => ({ ...prev, tags: tags }))
    }, [tags])
    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if ((key === 'Enter' || key === ',') && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }
    return (
        <div className="container tags">
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="tag"
                >
                    {tag}
                    <button onClick={() => deleteTag(index)}>x</button>
                </div>
            ))}
            <input
                value={input}
                placeholder="Add a Tag"
                onKeyDown={onKeyDown}
                onChange={onChange}
            />
        </div>
    );
};

export default InputTags;