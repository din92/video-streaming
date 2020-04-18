
import ReactDom from "react-dom"
import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import {Provider} from "react-redux"
import Main from "./components/main";
let store = createStore(reducers,applyMiddleware(thunk))
ReactDom.render(<Provider store={store}><Main></Main></Provider>,document.getElementById("root"));

