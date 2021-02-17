import AWS from "aws-sdk"
var albumBucketName = "lexicon-image-storage";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:dbc09ff9-c508-42ef-96ab-1f1bfb44fa9f";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

// var s3 = new AWS.S3({
//   apiVersion: "2006-03-01",
//   params: { Bucket: albumBucketName }
// });
export default{
    addPhoto: function(albumName:string) {
        let files = (<HTMLInputElement>document.getElementById("photoupload")).files;
        if (!files.length) {
            return new Promise(()=>{throw new Error("Error: No photos");});
        }
        var file = files[0];
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent(albumName) + "/";
    
        var photoKey = albumPhotosKey + fileName;
    
        // Use S3 ManagedUpload class as it supports multipart uploads
        var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: albumBucketName,
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
        }
        });
    
        var promise = upload.promise();
        return promise;
    //     promise.then(
    //     function(data) {
    //         // alert("Successfully uploaded photo.");
    //         // var href = this.request.httpRequest.endpoint.href;
    //         // var bucketUrl = href + albumBucketName + "/";
    // //        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
            
    // console.log(data);   
    //         return(data.Location);
    //     },
    //     function(err) {
    //         return alert("There was an error uploading your photo: ", err.message);
    //     }
    //     );
    }
};