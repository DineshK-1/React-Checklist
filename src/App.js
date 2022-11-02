import './App.css';

import Home from './routes/Home/Home.component';
import Signup from './routes/Sign-up/Signup.component';
import Navigation from './components/navigation/navigation.component';
import Login from './routes/Sign-in/Sign-in.component';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home />} />
        <Route path='Sign-Up' element={<Signup/>}/>
        <Route path='Login' element={<Login/>}/>
      </Route>
      
    </Routes>
  )
};

export default App;
