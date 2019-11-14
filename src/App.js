import React from 'react';
import './App.css';
import Test from './components/test';
import Header from './components/header/Header';
import Login from './components/auth/LoginPage'
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import SignUp from './components/auth/SignUpPage';

import { Provider } from "react-redux";
import configureStore from './redux/store'
import Home from './components/home/Home';
import AddQuestion from './components/question/addQuestion/AddQuestion';
import OneQuestion from './components/question/oneQuestion/OneQuestion';
// import {setUser,setLoginState} from './redux/actions'
const store = configureStore;
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
// store.dispatch(setLoginState(true))

function App() {
  return (
    <Provider store={store}> 
      <div className="App" >
        <BrowserRouter>
                <Header/>
              <Switch >
                <Route exact path = "/" component={()=><Test />} />
                <Route exact path = "/login" component={()=><Login />} />
                <Route exact path = "/signup" component={()=><SignUp />} />
                <Route exact path = "/home" component={()=><Home />} />
                <Route exact path = "/addQuestion" component={()=><AddQuestion />} />
                <Route exact path = "/oneQuestion" component={()=><OneQuestion />} />
            </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
