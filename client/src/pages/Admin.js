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
  const [adminState, setAdminState] = useState("create");
  const [gameIdToEdit, setGameIdToEdit] = useState("1615836454044.721679688");
  const [gameState, setGames]=useState([]);
  async function makeGame(){
    try{
      // Stack overflow discussion on client-generated unique ids: 
      // https://stackoverflow.com/questions/8012002/create-a-unique-number-with-javascript-time
      const game={};
      game.id=(Date.now() + Math.random()).toString;
      game.title= "The Book of Old Changes"
      game.description= "This is about a book of changes. But not recent ones";
      // let image=String
      game.createrId="userIdGoesHere";
      game.categories=["A, B, C, or D", "E, F, G, or H", "I, J, K, or L", "M, N, O or P", "Q, R, S, or T", "U, V, W, X, Y, or Z"];
      const gameData=await API.graphql(graphqlOperation(createGame, {input:game}));
      console.log(gameData);
    }
    catch(err){
      console.log(err);
    }
  }
  async function addLike(id){
    try{
      const game=gameState[id];
      game.likes=game.likes+1;
      delete game.createdAt;
      delete game.updatedAt;
      console.log(game);
      const gameData=await API.graphql(graphqlOperation(updateGame, {input:game}));
      const newList=[...gameState];
      newList[id]=gameData.data.updateSong;
      setGames(newList);
      document.getElementById("textarea").innerHTML="";
      for(let song of gameState){
        document.getElementById("textarea").innerHTML+=`<p>${game.title}: ${game.description}--${game.likes}</p>`;
      }
    }
    catch(err){      
      console.log(err);
    }
  }
  function editGame(){
    setAdminState("edit");
  }
  async function fetchGames(){
    try{
      console.log("List Games");
      const gameData=await API.graphql(graphqlOperation(listGames));

      const gameList=gameData.data.listGames.items;
      setGames(gameList);
      document.getElementById("textarea").innerHTML="";
      for(let game of gameState){
        document.getElementById("textarea").innerHTML+=`<p>${game.title}: ${game.description}--${game.image}</p>`;
      }
    }
    catch(err){
      console.log(err);
    }

  }
  console.log(adminState);
  return (
    <>
      <NavBar />
        <div className="main">
          <div className="adminNav">
            <button onClick={()=>{setAdminState("create")}}>Create game</button>
            <button onClick={()=>{setAdminState("edit")}}>Edit Game</button>
          </div>
          {adminState==="create" ? (<Create user={user} />) : (<></>)}
          {adminState==="edit" ? (<Edit user={user} gameId={gameIdToEdit}/>) : (<></>)}
        </div>
        <Book />
    </>
  );
};

export default Admin;
