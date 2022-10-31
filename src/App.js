import './App.css';

import Home from './routes/Home/Home.component';
import Signin from './routes/Sign-in/Signin.component';
import Navigation from './components/navigation/navigation.component';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home />} />
        <Route path='Sign-In' element={<Signin/>}/>
      </Route>
      
    </Routes>
  )
};

export default App;
