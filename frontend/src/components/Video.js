import React from "react";
import ContentListView from "./ContentListView";

function VideoItem(props) {

    return (
        <div>
            <h5 className="card text-dark bg-light py-1 mb-0"> {props.video.filename}</h5>
            <ContentListView contentList={props.video.contents} filename={props.video.filename} />
        </div>
    )
}


export default VideoItem;
