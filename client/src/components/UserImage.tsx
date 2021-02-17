// import React from "react";
interface Props{
    image:string;
}
export default function UserImage(props:Props) {


    return(
        <span>
            <img src={props.image} />
        </span>
    );
}
