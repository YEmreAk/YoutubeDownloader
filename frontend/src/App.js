import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoListView from './components/VideoListView';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [videoList, setVideoList] = useState([])
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=QH2-TGUlwu4');

  // useEffect(() => {
  //   axios.get('http://localhost:8000/contents')
  //     .then(res => { setContentList(res.data) })
  //     .catch(err => { console.log(err) })
  // })

  const extractVideosHandler = () => {
    axios.post(`http://localhost:8000/videos?video_url=${url}`)
      .then(res => { setVideoList(res.data) })
      .catch(err => { console.log(err) })
  }

  return (
    <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{ "width": "400px", "backgroundColor": "white", "marginTop": "15px" }}>

      <h1 className='card text-white bg-primary mb-1'>Youtube Downloader</h1>
      <h6 className='card text-white bg-primary mb-3'>FastAPI - React - Youtube-Dl</h6>

      <div className="card-body">
        <img src="logo.png" className="App-logo" alt="logo" style={{ width: "400px" }} />

        <h5 className='card text-white bg-dark mb-3'>Enter a Youtube URL to extract downloadable contents</h5>
        <span className="card-text">
          <input className="mb-2 form-control titleIn" onChange={event => setUrl(event.target.value)} placeholder='https://www.youtube.com/watch?v=QH2-TGUlwu4' />
          <button className="btn btn-outline-primary mx-2 mb-3" onClick={extractVideosHandler} style={{ "borderRadius": "30px", "fontWeight": "bold" }}>Extract</button>
        </span>

        <h5 style={{ fontWeight: "bold, underline" }} className="card text-white bg-dark mb-3">Downloadable contents</h5>
        <div>
          <VideoListView videoList={videoList} />
        </div>

        <h6 className="card text-dark bg-warning py-1 mb-0">CopyRight 2022 ~ YEmreAk.com, All rights reserved &copy;</h6>
      </div>
    </div>
  );
}

export default App;
