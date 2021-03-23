import Amplify, {API, graphqlOperation} from 'aws-amplify';
import {createGame} from "../../graphql/mutations";
import { Fragment, useState, useEffect} from "react";
import UserImage from "../UserImage";
import S3 from "../../utils/S3";
const Create = (props:any) => {  
    const [rounds, setRounds]=useState([]);
    const [gameImage, setGameImage] = useState("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");
    
  const userDirectory="gameLogos";
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
            props.loadScreen(true);
            (document.getElementById("subButton")as HTMLInputElement).disabled=true;
            // Stack overflow discussion on client-generated unique ids: 
            // https://stackoverflow.com/questions/8012002/create-a-unique-number-with-javascript-time
            let game:Game={};
            game.id=(Date.now() + Math.random()).toFixed(9);
            let form:any=document.getElementById("createGame");
            game.title=form.title.value;
            game.description=form.description.value;
            game.creatorId=props.user.attributes.sub;
            game.image=gameImage;
            game.categories=addRound(null);
            const gameData=await API.graphql(graphqlOperation(createGame, {input:game}));
            console.log(gameData);        
            props.loadScreen(false);            
            form.title.value="";
            form.photoupload.value="";
            form.description.value="";
            setGameImage("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");
            setRounds([]);
            (document.getElementById("round0") as HTMLInputElement).value="";
            (document.getElementById("subButton")as HTMLInputElement).disabled=false;
            props.refresh(game.creatorId);    
        }
        catch(err:any){
            console.log(err);
        }
    }
    const uploadFile=(e:any)=>{
      e.preventDefault();
      // check to make sure there is now a file to upload
      // and then:
      S3.addPhoto(userDirectory) 
      .then((res:any)=>{
        console.log(res);
        setGameImage(res.Location);
      })
      .catch(()=>{
        // User did not select a photo (perhaps that chose "Cancel" in the file manager)
        return false;    
      })
    }
    function addRound(e:any){
        if(e) e.preventDefault();
        let r=rounds.length;
        let newArray=[...rounds];
        let roundDesc=(document.getElementById("round"+r) as HTMLInputElement);
        newArray.push(roundDesc.value);
        roundDesc.value="";
        setRounds(newArray);
        return newArray;
    }

    function onSubmit(e:any){
        e.preventDefault();
    }

  return (
    <div className="create">
        <form id="createGame" onSubmit={makeGame}>
            <p><label htmlFor="title">Game Title. Something that will give the players ideas without being too limiting</label></p>
            <p><input type="text" name="title" size={40} placeholder="The Book of Lost Battlemagi"></input></p>
            <p><label htmlFor="description">Description. Again, nothing too specific. But give the initial round something to work with.</label></p>
            <p><textarea name="description" cols={40} rows={3}placeholder="Medieval fantasy setting, with lots of epics spells and interested characters!"></textarea></p>
            <p><label htmlFor="categories">Rounds. Each round has a different starting letter. For example, the classic game started with entries beginning with A, and then moved on to B entries, and so on.</label></p>
            <div className="roundsAndImage">
              <span>
                <span id="roundSpan">
                    {rounds.map((r, i)=>(
                        <Fragment key={i}><label  htmlFor={`round${i}`}>Round {i+1}</label><input type="text" 
                        className="rounds" id={`round${i}`} disabled name={`round${i}`} value={r}></input></Fragment>
                    ))}
                    <label htmlFor={`round${rounds.length}`}>Round {rounds.length+1}</label><input type="text" className="rounds" id={`round${rounds.length}`} name={`round${rounds.length}`}></input>
                </span>
                <button onClick={addRound}>Add Round</button>
              </span>
              <span className="gameLogoSpan">
                <label htmlFor="photoupload">Game Logo (optional)</label>
                <input id="photoupload"  name="photoupload" onChange={uploadFile} type="file" accept="image/*" />
                <UserImage image={gameImage}/> 
              </span>
            </div>
            <input id="subButton" type="submit" />
        </form>
    </div>
  );
};

export default Create;
