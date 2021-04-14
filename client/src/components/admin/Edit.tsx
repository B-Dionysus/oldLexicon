import {API, graphqlOperation} from 'aws-amplify';
import {getGame} from "../../graphql/queries";
import {updateGame} from "../../graphql/mutations";
import { Fragment, useState, useEffect} from "react";
import UserImage from "../UserImage";
import S3 from "../../utils/S3";

const Edit = (props:any) => {  
    const [gameImage, setGameImage] = useState("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");    
    const userDirectory="gameLogos";
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
    },[props.gameId]);

    useEffect(()=>{
        for(let [i,r] of (rounds as any).entries()){
            (document.getElementById("round"+i) as HTMLFormElement).value=r;
        }
    },[rounds])

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
    async function loadGame(id:String){
        try{
            const gameData:any=await API.graphql(graphqlOperation(getGame, {id:id}));
            console.log(gameData);
            
            let form:any=document.getElementById("editGame");
            form.title.value=gameData.data.getGame.title;
            form.description.value=gameData.data.getGame.description;
            setGameImage(gameData.data.getGame.image); 
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
            let form:any=document.getElementById("editGame");
            console.log("removeBlanks");
            game.categories=removeBlanks(rounds);
            setRounds([...game.categories]);
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
    function removeBlanks(arr:Array<String>):Array<String>{
        console.log("HI?");
        arr.forEach((elem, i)=>{
            console.log(elem);
            if(elem===""){
                arr.splice(i,1);
                console.log("Removed element "+i);
            }
        });
        return arr;
    }
    function addRound(e:any){
        e.preventDefault();
        let newArray=[...rounds];
        // Add a blank round to the array state
        newArray.push("");
        setRounds(newArray);
    }

    function updateRounds(e:any){
        let newArray=[...rounds];
        newArray[e.target.dataset.index]=e.target.value;
        setRounds(newArray);      
    }

  return (
    <div className="edit greyGrad">
        <form id="editGame" onSubmit={editGame}>
            <p><label htmlFor="title">Game Title.</label></p>
            <p><input type="text" name="title" size={40}></input></p>
            <p><label htmlFor="description">Description.</label></p>
            <p><textarea name="description" cols={40} rows={3}></textarea></p>
            <p><label htmlFor="categories">Rounds.</label></p>
            <div className="roundsAndImage ">
                <span>
                    <span id="roundSpan">
                        {/* @ts-ignore */}
                        {rounds.map((r,i)=>(
                            <Fragment key={i}><label htmlFor={`round${i}`}>Round {i+1}</label><input onChange={updateRounds} type="text" 
                            className="rounds" id={`round${i}`} name={`round${i}`} data-index={i} ></input></Fragment>
                        ))}
                    </span> 
                    <button onClick={addRound}>Add Round</button>                    
                </span>
                <span className="gameLogoSpan">
                    <label htmlFor="photoupload">Game Logo (optional)</label>
                    <input id="photoupload"  name="photoupload" onChange={uploadFile} type="file" accept="image/*"/>
                    <UserImage image={gameImage}/> 
                </span>
            </div>
            <input type="submit" value="Confirm Edits"/> 
        </form>
    </div>
  );
}; 

export default Edit;
