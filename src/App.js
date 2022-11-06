import './App.css';

import Home from './routes/Home/Home.component';
import Signup from './routes/Sign-up/Signup.component';
import Navigation from './components/navigation/navigation.component';
import Login from './routes/Sign-in/Sign-in.component';

import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './contexts/user.context';

const App = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='Sign-Up' element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
        <Route path='Login' element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
      </Route>
    </Routes>
  )
};

export default App;
