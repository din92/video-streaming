import React,{Component} from "react";

class VideoPlayer extends Component{
    constructor(props){
        super(props);
        this.player=null;
        this.playVideo = this.playVideo.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
    }

    playVideo(){
        this.player.play();
    }
    pauseVideo(){
        this.player.pause();
    }
    render(){
        return (<div>
            <h2>Video will be played here</h2>
            <video style={{width:"400px",height:"400px", border:"1px solid"}} src={this.props.video} ref ={(e)=>this.player=e}>
            </video>
            <button style={{border:"1px solid"}} onClick={this.playVideo}>Play</button>
            <button style={{border:"1px solid"}} onClick={this.pauseVideo}>Pause</button>
        </div>)
    }
}

export default VideoPlayer;