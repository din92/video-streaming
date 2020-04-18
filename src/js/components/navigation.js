import React,{Component} from "react";
import {BrowserRouter as Router,Switch,Link,Route} from "react-router-dom";
import VideoPlayer from "./video_player";
import PlayVideo from "./play_video";
import UploadVideo from "./upload_video";
class Navigation extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/upload">Upload Video</Link>
                        </li>
                        {/* <li>
                            <Link to="/video">Play Video</Link>
                        </li> */}
                    </ul>
                </div>
                <Switch>
                    <div>
                        <Route path="/upload" component={UploadVideo}></Route>
                    </div>
                    {/* <div>
                        <Route path="/video" component={PlayVideo}></Route>
                    </div> */}
                </Switch>

            </Router>
        );
    }
}

export default Navigation;