import axios from "axios";
const path="https://8xa8pgu8uj.execute-api.us-east-1.amazonaws.com";
const stage="locked"

export default{

    getGames: function(token){
        let req=`${path}/${stage}/read/?table=lexiconGames`;
        return axios.get(req,{
            headers:{
                'Authorization':token
            }
        });

    }
};