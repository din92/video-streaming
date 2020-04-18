import React,{Component} from "react";
class UploadVideo extends Component{
    constructor(props){
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
        this.elem=null;
    }
    handleUpload(e){
        let fd = new FormData();
        fd.append("video",e.target.files[0]);
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST","/uploadFile");
        xmlHttp.send(fd);
        xmlHttp.onreadystatechange=function(){
            if(this.readyState===4 && this.status===200 ){
                console.log("file upload success");
            }
        }
    }

    render(){
        return (
            <div>
                <label>Upload your video here</label>
                <input type="file" onChange={(e)=>this.handleUpload(e)}></input>
            </div>
        )
    }
}

export default UploadVideo;