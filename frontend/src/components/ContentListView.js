import ContentItem from "./Content";

function ContentListView(props) {
    return (
        <div className="bg-light">
            {props.contentList.map((content, index) => <ContentItem content={content} key={index} filename={props.filename} />)}
        </div>
    )
}

export default ContentListView;
