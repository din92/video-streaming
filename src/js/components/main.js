import React,{Component} from "react";
import Navigation from "./navigation";
import PlayVideo from "./play_video";
class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            <Navigation/>
            <PlayVideo/>
        </div>)
    }
}

export default Main;