import Amplify, {API, graphqlOperation} from 'aws-amplify';
import {getGame} from "../../graphql/queries";
import {updateGame} from "../../graphql/mutations";
import { Fragment, useState, useEffect} from "react";

const Edit = (props:any) => {  
    
    const [rounds, setRounds]=useState([]);
    interface Game{
        id?:string;
        title?: String;
        description?: String;
        image?: String;
        creatorId?:String;
        categories?:Array<String>;
    }
    useEffect(()=>{
        loadGame(props.gameId)
    },[])
    useEffect(()=>{
        for(let [i,r] of (rounds as any).entries()){
            (document.getElementById("round"+i) as HTMLFormElement).value=r;
        }
    },[rounds])

    async function loadGame(id:String){
        try{
            const gameData:any=await API.graphql(graphqlOperation(getGame, {id:id}));
            console.log(gameData);
            
            let form:any=document.getElementById("editGame");
            form.title.value=gameData.data.getGame.title;
            form.description.value=gameData.data.getGame.description;
            setRounds(gameData.data.getGame.categories);
        }
        catch(err:any){
            console.log(err);
        }
    }


    async function editGame(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            let game:Game={};
            // If the user just added a new round, it may not have been saved in the round state yet
            let roundArray=[...rounds];
            // roundArray[roundArray.length-1]=(document.getElementById("round"+(roundArray.length-1)) as HTMLFormElement).value;
            // setRounds(roundArray);
            game.categories=roundArray; // it might take a sec for rounds to update, so use roundArray 

            let form:any=document.getElementById("editGame");
            game.id=props.gameId;
            game.title=form.title.value;
            game.description=form.description.value;
            game.creatorId=props.user.attributes.sub;            
            const gameData:any=await API.graphql(graphqlOperation(updateGame, {input:game, id:props.gameId}));
            console.log(gameData.data.updateGame);
        }
        catch(err:any){
            console.log(err.errors[0].message);
        }
    }
    function addRound(e:any){
        e.preventDefault();
        let newArray=[...rounds];
        newArray.push("");
        setRounds(newArray);
    }

    function updateRounds(e:any){
        let newArray=[...rounds];
        newArray[e.target.dataset.index]=e.target.value;
        setRounds(newArray);      
    }

  return (
    <div className="edit">
        <form id="editGame" onSubmit={editGame}>
            <p><label htmlFor="title">Game Title.</label></p>
            <p><input type="text" name="title" size={40}></input></p>
            <p><label htmlFor="description">Description.</label></p>
            <p><textarea name="description" cols={40} rows={3}></textarea></p>
            <p><label htmlFor="categories">Rounds.</label></p>
            <span id="roundSpan">
                {/* @ts-ignore */}
                {rounds.map((r,i)=>(
                    <Fragment key={i}><label htmlFor={`round${i}`}>Round {i+1}</label><input onChange={updateRounds} type="text" 
                    className="rounds" id={`round${i}`} name={`round${i}`} data-index={i} ></input></Fragment>
                ))}
                </span>
            <button onClick={addRound}>Add Round</button>
            <input type="submit" value="Confirm Edits"/> 
        </form>
    </div>
  );
};

export default Edit;
