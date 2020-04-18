import React,{Component} from "react";
import ReactDom from "react-dom"
import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import {Provider} from "react-redux"
import Main from "./components/main";
import {getVideoStream} from "./action";
let store = createStore(reducers,applyMiddleware(thunk));
console.log(store.getState());
// let unsubscribe = store.subscribe(()=>console.log(store.getState()));
// store.dispatch(getVideoStream()); 
// unsubscribe();
ReactDom.render(<Provider store={store}><Main></Main></Provider>,document.getElementById("root"));

