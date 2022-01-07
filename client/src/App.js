import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './helpers/setAuthToken';

// run setAuthToken
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// to run once on mount or unmount pass an empty array as the 2nd parameter
const App = () => {
  useEffect (() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
    <Router>
      <div className='App'>
        <Navbar />
        <section className='container'>
          <Routes>
            <Route path = '/' element={ <Home /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/login' element={ <Login /> } />
          </Routes>
        </section>
      </div>
    </Router>
    </Provider>
  );
}

export default App;