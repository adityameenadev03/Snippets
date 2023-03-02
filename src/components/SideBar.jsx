import React, { useState } from 'react'
import { MdOutlineFolderOpen, MdDelete, MdDownload, MdOutlineStarOutline } from 'react-icons/md'

import { FaTrashAlt } from 'react-icons/fa'
import { AiFillFolderAdd } from 'react-icons/ai'
import { GoCode } from 'react-icons/go'
const SideBar = ({ handleFolderClick, active, createFolder, handleDrop, handleDragOver, folders,  handleFolderDelete, showMenu, handleContextMenu, dragHoverClass, handleDragLeave, tools,handleTool }) => {

    return (
        <div className='sidebar'>
            <div className="tools">
                <h3>Tools</h3>

                <div className="folders tool">
                    {tools?.map(tool => {
                        return <div className={`folder ${active == tool.index && 'active_folder'}`}
                            onClick={(e) => handleTool(tool.index)}
                            key={tool.id}
                        >
                            <p
                                className={`${active == tool.index && 'active_folder'}`}
                            >
                                <span >
                                    {tool.index == 1 && <GoCode
                                        style={{ fontSize: "28px" }}
                                        className={`folder_icon ${active == tool.index && 'active_folder'}`}
                                    />}
                                    {tool.index == 2 && <MdOutlineStarOutline
                                        style={{ fontSize: "28px" }}
                                        className={`folder_icon ${active == tool.index && 'active_folder'}`}
                                    />}

                                    {tool.index == 3 && <FaTrashAlt
                                        style={{ fontSize: "18px", marginLeft: "6px" }}
                                        className={`folder_icon ${active == tool.index && 'active_folder'}`}
                                    />}
                                     {tool.index == 4 && <MdDownload
                                        style={{ fontSize: "28px",marginLeft: "2px" }}
                                        className={`folder_icon ${active == tool.index && 'active_folder'}`}
                                    />}
                                </span> {tool.name}</p>

                        </div>
                    })}

                    {/* <div className={`folder ${active == 'snippets' && 'active_folder'}`}
                        onClick={(e) => handleAllSnippets("snippets")}
                    >
                        <p
                            className={`${active == 'snippets' && 'active_folder'}`}
                        > <span ><GoCode
                            style={{ fontSize: "28px" }}
                            className={`folder_icon ${active == 'snippets' && 'active_folder'}`}
                        /> </span> All Snippet</p>

                    </div>
                    <div className={`folder ${active == 'favourite' && 'active_folder'}`}
                        onClick={(e) => handleFavoriteSnippets("favourite")}
                    >
                        <p
                            className={`${active == 'favourite' && 'active_folder'}`}
                        > <span ><MdOutlineStarOutline
                            style={{ fontSize: "28px" }}
                            className={`folder_icon ${active == 'favourite' && 'active_folder'}`}
                        /> </span> Favorites</p>

                    </div>

                    <div className={`folder ${active == 'deleted' && 'active_folder'}`}
                        onClick={(e) => handleDeletedSnippets("deleted")}
                    >
                        <p
                            className={`${active == 'deleted' && 'active_folder'}`}
                        > <span ><FaTrashAlt
                            style={{ fontSize: "18px", marginLeft: "6px" }}
                            className={`folder_icon ${active == 'deleted' && 'active_folder'}`}
                        /> </span> Deleted</p>

                    </div> */}
                </div>
            </div>

            <div className="folder_menu">
                <h3>Folders <span onClick={(e) => createFolder(e)}><AiFillFolderAdd style={{ color: "#1397e9" }} /></span></h3>
                <div className="folders">
                    {folders?.map(folder => {
                        return <div
                            className={`folder ${active == folder.id && 'active_folder'}`}
                            // id={`${folder.isOpen && 'active_folder'}`} 
                            onDrop={(e) => handleDrop(e,)}
                            onDragOver={(e) => handleDragOver(e, folder)}
                            onDragLeave={handleDragLeave}
                            onContextMenu={(e) => handleContextMenu(e, folder.id)}
                            key={folder.id}

                            
                            // window.scrollTo({ top: 0, behavior: 'smooth' });
                        >
                            <p
                                onClick={(e) => handleFolderClick(folder)}

                                className={`  ${dragHoverClass == folder.id ? 'drag-target' : null} `}
                            // onContextMenu={handleContextMenu}
                            > <span ><MdOutlineFolderOpen
                                style={{ fontSize: "28px" }}
                                className={`folder_icon ${active == folder.id && 'active_folder-icon'}`}
                            /> </span> {folder.name} </p>
                            {showMenu == folder.id && (
                                <div
                                    className='delete-menu'
                                >
                                    <MdDelete onClick={() => handleFolderDelete(folder.id)} />
                                </div>
                            )}

                        </div>

                    })}
                </div>
            </div>



        </div>
    )
}

export default SideBar