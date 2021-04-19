import '../css/Admin.css';
import AWS from "aws-sdk"
import Amplify, {Auth, graphqlOperation} from 'aws-amplify';
import API from "../utils/API"
import {listGames} from "../graphql/queries";
import {updateGame, createGame} from "../graphql/mutations";
import { useState, useContext, useEffect } from "react";
import Book from "../components/Book"
import AWSContext from "../context/auth/AWSContext";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import {Paper} from "@material-ui/core";
import Create from "../components/admin/Create"
import Edit from "../components/admin/Edit"
const Admin = () => {  
  const awsContext = useContext(AWSContext); 
  const {user} = awsContext;
  let userId;
  const [adminState, setAdminState] = useState("create");
  const [gameState, setGames]=useState([]);
  const [bookDisplay, setBook]=useState("none");
  const [gameId, setEdit]=useState("");


  // When the user changes, get the titles of the games they have created
  useEffect(()=>{
    if(user.attributes){
      userId=user.attributes.sub;
      fetchGames(user.signInUserSession.idToken.jwtToken);  
    }
  },[user]);
    
  // Turn the loading icon ("book") on or off
  useEffect(()=>{    
    document.getElementById("book").style.display=bookDisplay;
    console.log(bookDisplay);
    console.log(document.getElementById("book").style.display=bookDisplay);

  },[bookDisplay]);

  // Return an array of gmes created by this user
  async function fetchGames(idToken:String){
    let ug=updateGame;  
    API.getGames(idToken)
    .then((gameData)=>{
      console.log(gameData);
      const gameList:any=(gameData as any).data.titles;
      setGames(gameList);
      let dropDown="";
      if(gameList.length>0){
        dropDown="<label for='selectGame'>Edit: </label>";
        dropDown+=`<select onChange="()=>{updateEdit(this.value);}" name='selectGame' id='selectGame'>`;
        for(let game of gameList){
          dropDown+=`<option value="${game.id}">${game.title}</option>`;
        }
        dropDown+="</select>"
        setEdit(gameList[0].id);
      }
      document.getElementById("textarea").innerHTML=dropDown;
    })
    .catch((err)=>{
      console.error(err);
    });
  }
  function updateEdit(val:String){
    console.log(val);
    console.log("Hi?");
  }
  // This could probably be greatly simplified, right?
  function loading(show:Boolean){
    if(show) setBook("block");
    else {
       setBook("none");
      }
  }
  function editButton(){
    let gameToEdit=(document.getElementById("selectGame") as HTMLInputElement).value;
    setEdit(gameToEdit);      
    setAdminState("edit");
  }
  return (
    <>
      <NavBar />
        <Book display={bookDisplay}/>
        <div className="main">
          <div className="adminNav">
            <button onClick={()=>{setAdminState("create")}}>Create game</button>
            <button onClick={editButton}>Edit Game</button>
            <div id="textarea"><label htmlFor='selectGame'>Edit:</label><select name='selectGame' id='selectGame'></select></div>
          </div>
          {adminState==="create" ? (<Create user={user} refresh={fetchGames} loadScreen={loading}/>) : (<></>)}
          {adminState==="edit" ? (<Edit user={user} gameId={gameId}/>) : (<></>)}
        </div>
    </>
  );
};

export default Admin;
