import {connect} from "react-redux";
import VideoPlayer from "./video_player";
import {getVideoStream} from "../action";
let mapStateToProps=(state,props)=>{
    return{
        video:state.video
    }
}
let mapDispatchToProps=(dispatch,props)=>{
    return{
        getStream: dispatch(getVideoStream())
    }
}

let PlayVideo= connect(mapStateToProps,mapDispatchToProps)(VideoPlayer);
export default PlayVideo;