const funct= async function(username){
var url = 'http://localhost:3000/users/'+username;
let mydata={}
await fetch(url)
 .then(function (response){
   return response.json()
   .then(data=>{
    mydata=data
   });
 });
  return mydata
}
  export default funct
      