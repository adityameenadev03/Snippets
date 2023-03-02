import React, { useEffect, useState } from "react";
import { MdOutlineAddCircle, MdDeleteOutline, MdPhotoCamera } from "react-icons/md";
import { FaClipboard } from "react-icons/fa";
import Input from "./Input";
import Image from "./Image";
import TabMenu from "./TabMenu";
import InputTags from "./inputTags";
import Beautify from "./Beautify";
import Textarea from "./Textarea";
import { addSnippet, editSnippet } from "../reducers/snippetSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import InputImages from "./InputImages";

const EditCodeSnippet = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const snippets = useSelector(store => store.snippets.snippetsArr)

    let edit = JSON.parse(JSON.stringify(snippets.find(snip => snip.id == id)))
    const [codeSnippet, setCodeSnippet] = useState(edit);

    const [showImage, setShowImage] = useState(false)
    const [activeTab, setActiveTab] = useState(codeSnippet.tabs[0].id);
    const [editingTab, setEditingTab] = useState(null);
    const [showCodeImage, setShowCodeImage] = useState(false)
    const [copiedMessage, setCopiedMessage] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setCodeSnippet(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleAddTab = () => {
        const newId = codeSnippet.tabs.length + 1;
        setCodeSnippet(prev => ({ ...prev, tabs: [...prev.tabs, { id: newId, title: 'Snippet ' + newId, content: '' }] }))
        setActiveTab(newId)

    };

    function saveToClipboard(textToCopy) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopiedMessage('"Copied!"')
                setTimeout(() => {
                    setCopiedMessage('')
                }, 2000)
            })
            .catch(err => console.error("Error copying text: ", err));
    }

    const handleTabContentChange = (event, id) => {
        const newTabs = codeSnippet.tabs.map(tab => {
            if (tab.id === id) {
                tab.content = event.target.value;
            }
            return tab;
        });
        setCodeSnippet(prev => ({ ...prev, tabs: newTabs }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(editSnippet(codeSnippet))
    };

    return (
        <div className="createNote">
            <form action=""
                onSubmit={handleSubmit}>
                <div className="inputTitle">
                    <Input
                        type={"text"}
                        placeholder={"Snippet Title"}
                        name={"title"}
                        value={codeSnippet.title}
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Save Snippet</button>

                </div>
                <InputImages
                    setCodeSnippet={setCodeSnippet}
                    codeSnippet={codeSnippet}
                />

                <div className="note_container">
                    <div className="tabs">
                        {codeSnippet?.tabs && codeSnippet?.tabs.map((tab, i) => {
                            return <TabMenu
                                key={tab.id}
                                tab={tab}
                                codeSnippet={codeSnippet}
                                setCodeSnippet={setCodeSnippet}
                                activeTab={activeTab}
                                editingTab={editingTab}
                                setActiveTab={setActiveTab}
                                setEditingTab={setEditingTab}
                            />
                        })}
                        <MdOutlineAddCircle
                            onClick={handleAddTab}
                            className="add_icon"
                        />
                        <MdPhotoCamera
                            onClick={() => setShowCodeImage(!showCodeImage)}
                            className="add_icon" />
                    </div>
                    <InputTags updateData={setCodeSnippet} />
                    {codeSnippet?.tabs.map(tab => {
                        if (tab.id === activeTab) {
                            return (
                                <div key={tab.id}>
                                    <span className="copy_text" >{copiedMessage}</span>
                                    <FaClipboard
                                        onClick={() => saveToClipboard(tab.content)}
                                        className="copy_icon"
                                    />
                                    {!showCodeImage && <Textarea
                                     className={`scrollbar `}
                                        key={tab.id}
                                        placeholder="// paste snippet here..."
                                        spellCheck={false}
                                        value={tab.content}
                                        onChange={event => handleTabContentChange(event, tab.id)}
                                    />}

                                    {showCodeImage && <Beautify code={tab.content} />}
                                </div>

                            );
                        }
                        return null;
                    })}
                </div>
             
                <button type="submit">Save Note</button>

            </form>

        </div>
    )
}

export default EditCodeSnippet