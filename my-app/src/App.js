import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Login from './components/pages/Login';
import Posts from './components/pages/Posts';

import { fetchAuthMe } from './components/Utils/auth';
import { fetchPosts } from './components/Utils/posts';

function App() {
  const dispath = useDispatch()
  const [isAuth, setIsAuth] = useState(false) 
  const userData = useSelector((state) => state.auth)

  useEffect(() => {
    if (localStorage.getItem('isAuthId') !== null) {
      setIsAuth(false)
    } else {
      setIsAuth(true)
    }
  }, [userData])

  useEffect(() => {
      dispath(fetchAuthMe())
      dispath(fetchPosts())
  }, [])

  return (
    <>
      <Header auth={isAuth} userName = {userData} />
      
      <div className="container">
          { isAuth 
          ? <Login />
          :<Posts /> }


      </div>
    </>
  );
}

export default App;
