import React,{Component} from "react";
import Navigation from "./navigation";
class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            <Navigation/>
        </div>)
    }
}

export default Main;