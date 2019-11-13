import React from 'react';
import './App.css';
import Test from './components/test';
import Header from './components/header/Header';
import Login from './components/auth/LoginPage'
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import SignUp from './components/auth/SignUpPage';

import { Provider } from "react-redux";
import configureStore from './redux/store'
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
            </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
