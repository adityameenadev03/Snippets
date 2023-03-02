import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CreateCodeSnippet from './components/CreateCodeSnippet'
import EditCodeSnippet from './components/EditCodeSnippet'
import { addSnippet, addMultipleSnippets, editSnippet } from "./reducers/snippetSlice";
import { useSelector, useDispatch } from 'react-redux'
import Home from './pages/Home'
import CreateSnippet from './pages/CreateSnippet'
import NavBar from './components/NavBar'
import EditSnippet from './pages/EditSnippet'
import SideBar from './components/SideBar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { addUser } from "./reducers/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from './firebase'
import { doc, query, where } from 'firebase/firestore/lite'
import { db, collection, getDocs, getDoc, addDoc, writeBatch } from './firebase'

function App() {
  const [fetchedSnippets, setFetchedSnippets] = useState([])
  const dispatch = useDispatch()
  const snippets = useSelector(store => store.snippets.snippetsArr)
  console.log(snippets)
  const user = useSelector(store => store.user.user)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user = user
      // console.log(user.uid)
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      // User is signed out
      localStorage.removeItem('user')
    }
  });
  const getDocum = async () => {
    const docRef = collection(db, 'snippets');
    // const docSnap = await getDocs(docRef).where("userId", "=", user.uid);
    const q = query(docRef)
    const docSnap = await getDocs(q);
    // console.log(docSnap)
    let docsArray = []
    docSnap.forEach(doc => {
      // console.log(doc.data())
      docsArray.push(doc.data())
    });
    setFetchedSnippets(docsArray)
    console.log(snippets)
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    return true
  }
  
  useEffect(() => {
    const fetchSnippets = async () => {
      const done = await getDocum()
      console.log(done)
      if (done) {
        dispatch(addMultipleSnippets(fetchedSnippets))
      }
    }
    fetchSnippets() 

  }, [])


  // useEffect(() => {
  //   const getAllDocuments = async () => {
  //     const querySnapshot = await getDocs(collection(db, "snippets"));
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       const snippets = doc.data()
  //       console.log(snippets);
  //       // dispatch(addSnippet());
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   }
  //   getAllDocuments()

  // }, [])


  return (
    <div className="app container">
      <Router>

        {/* <SideBar /> */}

        <Routes>
          <Route exact path='/' element={user ? <Home
            snippets={snippets}
          /> : <Navigate to={'/login'} />} > </Route>

          <Route exact path='/login' element={user ? <Navigate to={'/'} /> : <Login
          />}> </Route>
          <Route exact path='/signup' element={user ? <Navigate to={'/'} /> : <Signup
          />}> </Route>
          <Route exact path='/create' element={<CreateSnippet
          />}> </Route>
          <Route exact path='/edit/:id' element={<EditSnippet
          />}> </Route>
        </Routes>

      </Router>
    </div>
  )
}

export default App
