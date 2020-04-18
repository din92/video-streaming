export const PLAY = "PLAY";
export const STOP ="STOP";
export const SET_VIDEO_SOURCE="SET_VIDEO_SOURCE";

export function play_video(action){
    return {type:PLAY,action}
}

export function stop_video(action){
    return {type:STOP,action}
}

export function setVideoSource(src){
    return {type:SET_VIDEO_SOURCE,src}
}

export function getVideoStream(){
    return (dispatch,getState)=>{
        return new Promise((resolve,reject)=>{
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET","/downloadFile","async");
            xmlHttp.setRequestHeader("Content-Type","application/json");
            xmlHttp.send();
            xmlHttp.onreadystatechange=function(){
                if(this.readyState===4 && this.status===200){
                    // console.log("resp",this.responseText)
                    dispatch(setVideoSource(this.responseText));
                    resolve(this.responseText);
                }
            }
        });
    }
}