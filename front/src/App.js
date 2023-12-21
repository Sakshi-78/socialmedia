import {React} from 'react'
import {Routes,Route} from "react-router-dom";
import Login from "./MainComponents/Login";
import Signup from "./MainComponents/Signup";
import Home from "./MainComponents/Home";
import Profile from './MainComponents/Profile';
import Explore from "./MainComponents/Explore";


const App = ({ userId }) => {

  return (
    <div>
      <Routes>
      <Route path="/login" element={<Login  />} />
      <Route path="/" element={ <Home />} />
      <Route path="/explore" element={<Explore />}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/:id" element={<Profile />} />
      </Routes>

      
    </div>
  )
}

export default App