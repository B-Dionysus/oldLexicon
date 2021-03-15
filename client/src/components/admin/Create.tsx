import Amplify, {API, graphqlOperation} from 'aws-amplify';
import {createGame} from "../../graphql/mutations";
import { Fragment, useState, useEffect} from "react";

const Create = (props:any) => {  
    
    const [rounds, setRounds]=useState([]);
    interface Game{
        id?:string;
        title?: String;
        description?: String;
        image?: String;
        creatorId?:String;
        categories?:Array<String>;
    }
    async function makeGame(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            // Stack overflow discussion on client-generated unique ids: 
            // https://stackoverflow.com/questions/8012002/create-a-unique-number-with-javascript-time
            let game:Game={};
            game.id=(Date.now() + Math.random()).toFixed(9);
            let form:any=document.getElementById("createGame");
            game.title=form.title.value;
            game.description=form.description.value;
            game.creatorId=props.user.attributes.sub;
            game.categories=rounds;
            const gameData=await API.graphql(graphqlOperation(createGame, {input:game}));
            console.log(gameData);
        }
        catch(err:any){
            console.log(err);
        }
    }
    function addRound(e:any){
        e.preventDefault();
        let r=rounds.length;
        let newArray=[...rounds];
        let roundDesc=(document.getElementById("round"+r) as HTMLInputElement);
        newArray.push(roundDesc.value);
        roundDesc.value="";
        setRounds(newArray);
    }

    function onSubmit(e:any){
        e.preventDefault();
    }

  return (
    <div className="create">
        <form id="createGame" onSubmit={makeGame}>
            <p><label htmlFor="title">Game Title. Something that will give the players ideas without being too limiting</label></p>
            <p><input type="text" name="title" size={40} placeholder="The Book of Lost Battlemagi"></input></p>
            <p><label htmlFor="description">Description. Again, nothing too explicit. But give the initial round something to work with.</label></p>
            <p><textarea name="description" cols={40} rows={3}placeholder="Medieval fantasy setting, with lots of epics spells and interested characters!"></textarea></p>
            <p><label htmlFor="categories">Rounds. Each round has a different starting letter. For example, the classic game started with entries beginning with A, and then moved on to B entries, and so on.</label></p>
            <span id="roundSpan">
                {rounds.map((r, i)=>(
                    <Fragment key={i}><label  htmlFor={`round${i}`}>Round {i+1}</label><input type="text" 
                    className="rounds" id={`round${i}`} disabled name={`round${i}`} value={r}></input></Fragment>
                ))}
                <label htmlFor={`round${rounds.length}`}>Round {rounds.length+1}</label><input type="text" className="rounds" id={`round${rounds.length}`} name={`round${rounds.length}`}></input>
            </span>
            <button onClick={addRound}>Add Round</button>
            <input type="submit" />
        </form>
    </div>
  );
};

export default Create;
