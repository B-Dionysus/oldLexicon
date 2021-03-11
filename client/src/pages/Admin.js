import '../css/Admin.css';
// var AWS = require("aws-sdk");
import AWS from "aws-sdk"
import { useState, useContext, useEffect } from "react";
import Book from "../components/Book"
import AWSContext from "../context/auth/AWSContext";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
const Admin = (props) => {  
  const awsContext = useContext(AWSContext); 
  const {user} = awsContext;
  function createTable(){
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
    });
    
    var dynamodb = new AWS.DynamoDB();
    var params = {
      TableName : "Movies",
      KeySchema: [
          { AttributeName: "year", KeyType: "HASH"},
          { AttributeName: "title", KeyType: "RANGE" }
      ],
      AttributeDefinitions: [
          { AttributeName: "year", AttributeType: "N" },
          { AttributeName: "title", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
      }
    };
    dynamodb.createTable(params, function(err, data) {
      if (err) {
          document.getElementById('textarea').innerHTML = "Unable to create table: " + "\n" + JSON.stringify(err, undefined, 2);
      } 
      else {
          document.getElementById('textarea').innerHTML = "Created table: " + "\n" + JSON.stringify(data, undefined, 2);
      }
    });
   }
  return (
    <>
      <NavBar />
        <div className="main">
          <button onClick={createTable}>Create Table</button>
          <textarea readOnly id= "textarea"></textarea>
        </div>
        <Book />
        <div className="cloud cloud2" /> 
    </>
  );
};

export default Admin;
