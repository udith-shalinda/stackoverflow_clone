import React from 'react';
import './App.css';
import Test from './components/test';
import Header from './components/header/Header';
import Login from './components/auth/LoginPage'
import { BrowserRouter , Route , Switch ,Redirect} from 'react-router-dom';
import SignUp from './components/auth/SignUpPage';

import { Provider } from "react-redux";
import configureStore from './redux/store'
import Home from './components/home/Home';
import AddQuestion from './components/question/addQuestion/AddQuestion';
import OneQuestion from './components/question/oneQuestion/OneQuestion';
import { LastLocationProvider } from 'react-router-last-location';


// import {setUser,setLoginState} from './redux/actions'
const store = configureStore;
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
// store.dispatch(setLoginState(true))


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().userId.userId !== null
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

function App() {
  return (
    <Provider store={store}> 
      <div className="App" >
        <BrowserRouter>
          <LastLocationProvider>
                <Header/>
              <Switch >
                <Route exact path = "/" component={()=><Test />} />
                <Route exact path = "/login" component={()=><Login />} />
                <Route exact path = "/signup" component={()=><SignUp />} />
                <Route exact path = "/home" component={()=><Home />} />
                <Route exact path = "/oneQuestion/:id" component={()=><OneQuestion />} />
                <PrivateRoute path='/addQuestion' component={AddQuestion} />
            </Switch>
          </LastLocationProvider>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
