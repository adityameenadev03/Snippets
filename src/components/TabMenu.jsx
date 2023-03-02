import React, { useRef } from 'react'
import { MdOutlineAddCircle, MdDeleteOutline, MdPhotoCamera } from "react-icons/md";
import Input from './Input';

const TabMenu = ({ codeSnippet, setCodeSnippet, tab, activeTab, setActiveTab, editingTab, setEditingTab }) => {
    const handleTabClick = id => {
        setActiveTab(id);
    };
    const handleTabEdit = id => {
        setEditingTab(id);
    };

    const inputRef = useRef(null);

    const handleTabTitleChange = (event, id) => {
        event.preventDefault()
        const newTabs = codeSnippet.tabs.map(tab => {
            if (tab.id === id) {
                tab.title = event.target.value;
            }
            return tab;
        });
        // setTabs(newTabs);
        setCodeSnippet(prev => ({ ...prev, tabs: newTabs }))

    };

    const handleTabEditSave = id => {
        setEditingTab(null);
    };

    const handleKeyDown = (event, id) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setEditingTab(null);
        }
    };


    function handleTabDelete(tabId) {
        if(tab.id > 1){
            const newSnippet = codeSnippet.tabs.filter(tab => tab.id !== tabId)
            setCodeSnippet(prev => ({ ...prev, tabs: [...newSnippet] }))
            setTimeout(() => {
                setActiveTab(newSnippet.length);
            })
        }
      
    }
    return (
        <div
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
        >
            {editingTab === tab.id ? (
                <Input
                    value={tab.title}
                    className="tabEdit_input"
                    ref={inputRef}
                    onFocus={() => inputRef.current.select(0, inputRef.length)}
                    onChange={event => handleTabTitleChange(event, tab.id)}
                    onBlur={() => handleTabEditSave(tab.id)}
                    onKeyDown={event => handleKeyDown(event, tab)}
                />
            ) : (
                <div className="tab_wrapper">
           
                    <span className='tab_title' onDoubleClick={() => handleTabEdit(tab.id)}> {tab.title} </span>
                    <MdDeleteOutline
                        onClick={() => handleTabDelete(tab.id)}
                        className="icon delete_icon" />
                </div>
            )}
        </div>
    )
}

export default TabMenu