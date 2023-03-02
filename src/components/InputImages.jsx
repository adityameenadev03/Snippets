import React, { useEffect, useState } from "react";
import Image from "./Image";
import Input from "./Input";
import { RiDeleteBin7Fill } from 'react-icons/ri'


const InputImages = ({ setCodeSnippet, codeSnippet }) => {
    const [images, setImages] = useState([...codeSnippet.images]);
    const [showImage, setShowImage] = useState(true)
    const handlePaste = e => {
        const { name } = e.target
        const clipboardData = e.clipboardData || window.clipboardData;
        if (clipboardData.items[0].type.includes('image') && clipboardData.items[0].kind.includes('file')) {
            const pastedImage = clipboardData.items[0].getAsFile();
            const reader = new FileReader();
            reader.readAsDataURL(pastedImage);
            reader.onloadend = () => {
                setImages(prevState => ([...prevState, reader.result]));
                // setShowImage(true)
            };
        } else {
            console.log('not an image')
        }
    };

    useEffect(() => {
        setCodeSnippet(prev => ({ ...prev, images: images }))
    }, [images])


    const deleteImage = (index) => {
        setImages(prevState => prevState.filter((image, i) => i !== index))
    }

    return (
        <div className="input_images">
            <Input
                type={"text"}
                id={"img"}
                placeholder={"Paste one or more images "}
                name={"image"}
                onPaste={handlePaste}
            />
            {images.length > 0 && <p onClick={() => setShowImage(prev => !prev)}>show images</p> }
            
            {(showImage && <div className="images">
                {images?.map((image, index) => (<div className="image" key={index}>
                    <Image
                        src={image}
                        alt={"pastedImage"}
                    />
                    <div className="delete_image" onClick={() => deleteImage(index)}>x</div>
                </div>
                ))}
            </div>)}


        </div>

    );
};

export default InputImages;