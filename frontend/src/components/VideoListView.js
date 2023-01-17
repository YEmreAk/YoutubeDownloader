import VideoItem from "./Video";

function VideoListView(props) {
    return (
        <div>
            {props.videoList.map((video, index) => <VideoItem video={video} key={index} />)}
        </div>
    )
}

export default VideoListView;
