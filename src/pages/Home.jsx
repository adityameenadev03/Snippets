import React, { useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { addSnippet, editSnippet, editFolders, deleteFolder, addFolders ,deleteSnippet } from "../reducers/snippetSlice";
import { useSelector, useDispatch } from 'react-redux'


const Home = () => {
  const dispatch = useDispatch()
  const folders = useSelector(store => store.snippets.folders)
  const tools = useSelector(store => store.snippets.tools)

  const [folderArr, setFolderArr] = useState([...folders])

  const snippets = useSelector(store => store.snippets.snippetsArr)
  const [filteredSnipp, setFilteredSnipp] = useState([...snippets].filter(snippet => snippet.isDeleted !== true))
  
  const [active, setActive] = useState(localStorage.getItem('active') || 1)
  localStorage.setItem('active', active)

  const [allSnippets, setAllSnippets] = useState()

  useEffect(()=>{
    if(active > 3){
      const result = JSON.parse(JSON.stringify(snippets)).filter(snippet => {
        return snippet.folderId == active && snippet.isDeleted !== true
      })
      setFilteredSnipp(result)
      setShowMenu(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else{
      handleTool(active)
    }

  },[active] )

  function handleTool(value){
    if(value == 1) handleAllSnippets(value)
    if(value == 2) handleFavoriteSnippets(value)
    if(value == 3) handleDeletedSnippets(value)
    if(value == 4) handleDataDownload(value)

  }

  function handleAllSnippets(value) {
    setActive(value)
    setFilteredSnipp(snippets)
  }

  function handleFavoriteSnippets(value) {
    setActive(value)
    const favorites = snippets.filter(snippet => snippet.isFavorites == true);
    setFilteredSnipp(favorites)
  }

  function handleDeletedSnippets(value) {
    setActive(value)
    setFilteredSnipp([...snippets].filter(snippet => snippet.isDeleted == true))
  }

  function handleDataDownload(value){
    setActive(value)
    const db = JSON.stringify({snippets,tools,folders}) 
    const blob = new Blob([db], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    console.log(blob)
    console.log(url)
    const link = document.createElement('a');
    link.download = 'db.json';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    
  }

  function handleFolderClick(folder) {
    setActive(folder.id)
    const result = JSON.parse(JSON.stringify(snippets)).filter(snippet => {
      return snippet.folderId == folder.id && snippet.isDeleted !== true
    })
    setFilteredSnipp(result)
    setShowMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
  function searchSnippets(e) {
    // e.preventDefault()
    const searchValue = e.target.value.toLowerCase()
    if (searchValue.length < 1) {
      return setFilteredSnipp(snippets)
    }
    // const newARr = snippets.filter(snippet => snippet.title.toLowerCase().includes(searchValue))
    const titleData = snippets.filter(snippet => snippet.title.toLowerCase().includes(searchValue))
    const tabsContentData = snippets.filter(snippet => snippet.tabs.filter(tab => {
      if (tab.content.toLowerCase().includes(searchValue)) {
        return true
      }
    }
    ).length > 0)

    const data = titleData.length > 0 ? titleData : tabsContentData.length > 0 ? tabsContentData : []

    setFilteredSnipp([...data])
  }

  function handleDelete(id) {
    const result = dispatch(editSnippet({ ...filteredSnipp.find(snippet => snippet.id == id), isDeleted: true }))
    setFilteredSnipp(prev => [...prev.filter(snippet => snippet.id != result.payload.id)])
  }

  function handleRestore(id) {
    const result = dispatch(editSnippet({ ...filteredSnipp.find(snippet => snippet.id == id), isDeleted: false }))
    setFilteredSnipp(prev => [...prev.filter(snippet => snippet.id != result.payload.id)])
  }

  function handleFavorite(id) {
    const result = dispatch(editSnippet({ ...filteredSnipp.find(snippet => snippet.id == id), isFavorites: true }))
    setFilteredSnipp(prev => [...prev.map(snippet => {
      if (snippet.id == id) {
        return result.payload
      }
      return snippet
    })])
  }

  function handleRemoveFavorite(id) {
    const result = dispatch(editSnippet({ ...filteredSnipp.find(snippet => snippet.id == id), isFavorites: false }))
    if (active == 2) {
      setFilteredSnipp(prev => [...prev.filter(snippet => snippet.id != result.payload.id)])
    }
    else {
      setFilteredSnipp(prev => [...prev.map(snippet => {
        if (snippet.id == id) {
          return result.payload
        }
        return snippet
      }
      )])
    }
  }

  function createFolder(e) {
    // e.preventDefault()
    const result = dispatch(addFolders({
      name: "New Folder",
      id: Math.floor(Math.random() * 10000).toString(),
      createdAt: new Date(),
      index: folders.length
    }))
    setFolderArr(prev => ([...prev, result.payload]))

  }
  const [showMenu, setShowMenu] = useState(false);

  function handleFolderDelete(id) {
    // e.preventDefault()
    const result = dispatch(deleteFolder({ ...folderArr.find(folder => folder.id == id) }))
    setFolderArr(prev => ([...prev.filter(folder => folder.id != result.payload.id)]))
    setShowMenu(false)
  }

  function handleContextMenu(e, id) {
    e.preventDefault();
    setShowMenu(id);
    setActive(false)
    setTimeout(() => setShowMenu(false), 6000)
    (showMenu)
  }
  const cardRef = useRef(null);

  const [dragHoverClass,setDragHoverClass] = useState(false)

  function handleDragLeave(e) {
    setDragHoverClass(null)
}
  function handleDrop(e) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const card = snippets.find(card => card.id == cardId);

    const fold = folders.find(folder => folder.name == e.target.innerText.trim())
    const result = dispatch(editSnippet({ ...card,folderId:fold.id }))
    setFilteredSnipp(prev => [...prev.filter(snippet => snippet.id != result.payload.id)])
    setDragHoverClass(false)
  
  }



  function handleDragOver(e,folder) {
    e.preventDefault();
    setDragHoverClass(folder.id)
    
  }


  function handlePermanentDelete(id){
    const result = dispatch(deleteSnippet({...filteredSnipp.find(snippet => snippet.id == id)}))
    setFilteredSnipp(prev => [...prev.filter(snippet => snippet.id != result.payload.id)])
  }
  useEffect(() => {
    // setFilteredSnipp(prev=> [...prev].filter(snippet => snippet.isDeleted !== true))
  }, [snippets])

  return (
    <div className="home">
      <NavBar />
      <main className='main'>
        <SideBar
          handleFolderClick={handleFolderClick}
          active={active}
          folders={folderArr}
          createFolder={createFolder}
          handleFolderDelete={handleFolderDelete}
          handleContextMenu={handleContextMenu}
          showMenu={showMenu}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          dragHoverClass={dragHoverClass}
          handleDragLeave={handleDragLeave}
          tools={tools}
          handleTool={handleTool}
        />
        <Card
          snippets={filteredSnipp}
          searchSnippets={searchSnippets}
          folders={folderArr}
          handleDelete={handleDelete}
          handleRestore={handleRestore}
          handleFavorite={handleFavorite}
          handleRemoveFavorite={handleRemoveFavorite}
          handlePermanentDelete={handlePermanentDelete}
          active={active}
        />
      </main>
    </div>
  )
}

export default Home