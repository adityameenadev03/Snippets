import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import EditCodeSnippet from '../components/EditCodeSnippet'

const EditSnippet = () => {
  return (
    <div className="edit-snippet">
    <NavBar />
    <main className='main'>
        <EditCodeSnippet />
    </main>
</div>
  )
}

export default EditSnippet