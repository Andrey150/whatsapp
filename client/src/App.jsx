import {Routes, Route} from 'react-router-dom'
import Layout from './components/layout/layout'
import Registration from "./components/registration/registration";
import Login from "./components/login/login";
import {useDispatch, useSelector} from "react-redux";
import Text from "./components/text/text";
import {useEffect} from "react";
import {auth} from "./actions/user";

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
