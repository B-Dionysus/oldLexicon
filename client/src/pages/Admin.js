import '../css/Admin.css';
import AWS from "aws-sdk"
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';

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
const Admin = (props) => {  
  const awsContext = useContext(AWSContext); 
  const {user} = awsContext;
  let userId;
  const [adminState, setAdminState] = useState("create");
  const [gameState, setGames]=useState([]);
  const [bookDisplay, setBook]=useState("none");
  useEffect(()=>{
    if(user.attributes){
      userId=user.attributes.sub;
      fetchGames(userId);  
    }
  },[user]);
    
  useEffect(()=>{    
    document.getElementById("book").style.display=bookDisplay;
    console.log(bookDisplay);
    console.log(document.getElementById("book").style.display=bookDisplay);

  },[bookDisplay]);

  async function fetchGames(id){
    let ug=updateGame;
    try{
      console.log("List Games");
      console.log(id);
      const gameData=await API.graphql(graphqlOperation(listGames,
        {
          filter:
          {
            creatorId:{eq:id}, 
            title:{ne:""}
          }
        }));
      console.log(gameData);

      const gameList=gameData.data.listGames.items;
      setGames(gameList);
      let dropDown="";
      console.log(gameList.length);
      if(gameList.length>0){
        dropDown="<label for='selectGame'>Edit: </label>";
        dropDown+=`<select name='selectGame' id='selectGame'>`;
        for(let game of gameList){
          dropDown+=`<option value="${game.id}">${game.title}</option>`;
        }
        dropDown+="</select>"
      }
      document.getElementById("textarea").innerHTML=dropDown;
    }
    catch(err){
      console.error(err);
    }    
  }
  function loading(show){
    if(show) setBook("block");
    else {
       setBook("none");
      }
  }
  return (
    <>
      <NavBar />
        <Book display={bookDisplay}/>
        <div className="main">
          <div className="adminNav">
            <button onClick={()=>{setAdminState("create")}}>Create game</button>
            <button onClick={()=>{setAdminState("edit")}}>Edit Game</button>
            <div id="textarea"><label htmlFor='selectGame'>Edit:</label><select name='selectGame' id='selectGame'></select></div>
          </div>
          {adminState==="create" ? (<Create user={user} refresh={fetchGames} loadScreen={loading}/>) : (<></>)}
          {adminState==="edit" ? (<Edit user={user}/>) : (<></>)}
        </div>
    </>
  );
};

export default Admin;
