import React,{Component} from "react";
class VideoPlayer extends Component{
    constructor(props){
        super(props);
        this.video=null;
    }
    render(){
        return (<div>
                <video src={this.video}>
                </video>
            </div>)
    }
}

export default VideoPlayer;