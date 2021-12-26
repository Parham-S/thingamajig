import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// import { UserProvider } from './contexts/UserContext';

import Nav from './components/Nav';
import RequireAuth from './components/RequireAuth';
import TokenConfirm from './components/TokenConfirm';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Home from './pages/Home';
import './app.css';

const queryClient = new QueryClient();

const App = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      {/* <UserProvider> */}
      <Router>
        <Nav />
        <main className='container'>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/redirect' element={<TokenConfirm />} />
            <Route
              path='dashboard'
              element={
                <RequireAuth redirectTo='/login'>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path='/' exact element={<Home />} />
          </Routes>
        </main>
      </Router>
      {/* </UserProvider> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);

export default App;
