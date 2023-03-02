import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import CreateCodeSnippet from '../components/CreateCodeSnippet'

const CreateSnippet = () => {
    return (
        <div className="create-snippet">
      <NavBar />
            <main className='main'>
                <CreateCodeSnippet />
            </main>
        </div>

    )
}

export default CreateSnippet