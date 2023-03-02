import React, { useRef, useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { MdModeEdit, MdDelete, MdSettingsBackupRestore, MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import SearchInput from './SearchInput'

const Card = ({ snippets, searchSnippets, folders, handleDelete, handleRestore, handleFavorite,handleRemoveFavorite,handlePermanentDelete,active }) => {

    const navigate = useNavigate();

    const cardRef = useRef(null);

    function handleDragStart(e,id) {
        e.dataTransfer.setData('text/plain', id);
    }

    return (
        <div className="cards_container">
            <div className="cards_row">
                <div className="cards__header">
                    <SearchInput searchSnippets={searchSnippets} />
                </div>
                <div className='cards'>
                    {snippets?.map((slice, i) => {
                        return <div key={slice.id} 
                        className='card'
                        ref={cardRef}
                        draggable="true"
                        onDragStart={(e)=> handleDragStart(e,slice.id)}
                        >
                            <Link to={`/edit/${slice?.id}`}>
                              {/* {slice?.images.map((url,i)=>  )} */}
                              <img src={slice?.images?.[0]} alt='' />
                            </Link>

                            <div className='snippet_detail'>
                            <h3 className='link'>{slice?.title}</h3>
                            {slice?.tags?.slice(0,5).map(tag=> <span className='snippet_tag'>{tag}</span>)}
                            </div>
                            <div className="bottom_links" >
                                {folders?.filter(folder => folder.id == slice?.folderId).map(folder => <span className='button' key={folder.id}>{folder.name}</span>)}

                                <div className="edit-button">
                                    <Link to={`/edit/${slice.id}`}
                                    >
                                        <FiEdit
                                            className='icon edit-icon'
                                        />
                                    </Link>
                                    

                                    {slice.isDeleted ? "" : slice?.isFavorites ? <MdFavorite className='icon' style={{ color: "red" }}
                                        onClick={(e) => handleRemoveFavorite(slice?.id)}
                                    /> : <MdOutlineFavoriteBorder className='icon'
                                        onClick={(e) => handleFavorite(slice?.id)}
                                    />}


                                    {slice?.isDeleted == true ? <> <MdSettingsBackupRestore className='icon restore_icon'
                                        onClick={(e) => handleRestore(slice?.id)} /> 
                                        <RiDeleteBin7Fill className='icon delete_icon' onClick={(e)=> handlePermanentDelete(slice.id)}/>
                                        </>
                                        
                                        : <MdDelete className='icon delete_icon'
                                            onClick={(e) => handleDelete(slice?.id)} />
                                        
                                            }
                                </div>

                            </div>
                        </div>
                    })}
                    {active != 4 && snippets.length <=0 && <h1 style={{marginTop:"130px"}}>No snippets to show here, <Link to={`./create`} style={{color:"#1397e9", textDecoration:"none"}}> Create</Link> Some</h1> }
                    {active == 4 && <h1 style={{marginTop:"150px"}}>Check your  <span style={{color:"#1397e9"}}> Download</span> section for the progress.</h1> }
                </div>
            </div>

        </div>


    )
}

export default Card