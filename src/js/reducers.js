import {combineReducers} from "redux";
import {stop_video,play_video,SET_VIDEO_SOURCE} from "./action"
function video(state="",action){
    switch(action.type){
        case SET_VIDEO_SOURCE:{
            return action.src;
        }
        default: return state;
    }
}

export default combineReducers({
    video
})