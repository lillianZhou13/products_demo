import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import './App.scss';
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ShoppingCart from "./pages/ShopingCart/ShoppingCart";
import SignUpForm from "./pages/Auth/SignUpForm";
import LogInForm  from './pages/Auth/LogInForm';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const  store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
    );

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
            <React.Fragment>
                <Header/>
                <Switch>
                    <Route exact path={'/'} render={() => {
                        return <Redirect to={'/products'}/>
                    }}/>
                    <Route exact path={'/products/:id'} component={ProductDetail}/>
                    <Route exact path={'/products'} component={Home}/>
                    <Route exact path={'/cart'} component={ShoppingCart}/>
                    <Route exact path={'/signup'} component={SignUpForm}/>
                    <Route exact path={'/login'} component={LogInForm}/>
                </Switch>
                <Footer/>
            </React.Fragment>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
