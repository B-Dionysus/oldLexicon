import "../css/book.css"
import booksvg from "./book.svg"
export default function Book(props:any){ 
    let d=props.display;
    let style={display:d}
    return(
        <span className="frame" style={style}>
            LOADING...
            <span className="book" >
            </span>
        </span>
    );
}; 