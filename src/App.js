import React from 'react';
import './App.css';
import Test from './components/test';
import Header from './components/header/Header';
import Login from './components/auth/LoginPage'
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import SignUp from './components/auth/SignUpPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
              <Header/>
            <Switch >
              <Route exact path = "/" component={()=><Test />} />
              <Route exact path = "/login" component={()=><Login />} />
              <Route exact path = "/signup" component={()=><SignUp />} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
