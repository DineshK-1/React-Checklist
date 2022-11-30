import './App.css';

import Home from './routes/Home/Home.component';
import Signup from './routes/Sign-up/Signup.component';
import Navigation from './components/navigation/navigation.component';
import Login from './routes/Sign-in/Sign-in.component';

import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './contexts/user.context';
import Dashboard from './components/Dashboard/Dashboard.component';
import TaskPage from './components/Dashboard/TasksPage/TasksPage.component';
import HabitsPage from './components/Dashboard/HabitsPage/HabitsPage.component';

const App = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='Dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}>
          <Route path='Tasks' element={<TaskPage />}/>
          <Route path='Habits' element={<HabitsPage />}/>
        </Route>
        <Route index element={isLoggedIn ? <Navigate to="Dashboard/Tasks" /> : <Home />} />
        <Route path='Sign-Up' element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
        <Route path='Login' element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
      </Route>
    </Routes>
  )
};

export default App;
