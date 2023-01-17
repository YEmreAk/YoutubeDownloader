import React from "react";
import axios from "axios";

function ContentItem(props) {

    // https://stackoverflow.com/a/53230807/9770490
    const downloadContentHandler = (url, filename) => {
        axios.get(url, {
            responseType: "blob",
        }).then((response) => {
            const href = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', filename); //or any other extension
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        }).catch((error) => {
            document.location.href = url;
            console.log(error);
        });
    }
    return (
        <div>
            <p>
                <span> {props.content.format_note} {props.content.resolution}</span>
                {/* <span style={{ fontWeight: "bold, underline" }}> {props.content.filesize}</span>
                <span style={{ fontWeight: "bold, underline" }}> {props.content.url}</span> */}
                <button onClick={() => downloadContentHandler(props.content.url, `${props.filename}.${props.content.ext}`)} className="btc btn-outline-danger my-2 mx-2" style={{ borderRadius: "30px" }}>↓</button>
                <span>({Math.ceil(props.content.filesize / 10000) / 100}mb)</span>
            </p>
        </div>
    )
}


export default ContentItem;
