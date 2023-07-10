import { useState,useEffect } from "react";

const API_URL="https://api.github.com";

async function fetchResults  (query){ //fetchREsults () and No use Effect
 try{ 

  const data= await fetch(`${API_URL}/search/users?q=${query}`);
  let json=await data.json()  // await and assign to variable called json
  return json.items || []
  
 }
  catch(err){
    throw new Error(err);
  }
}
export default  function App (){
    const [query,setQuery]=useState('');
    const [results,setResults]=useState([]);
    function searchOnChange(event){
      setQuery(event.target.value)
            //add search Onchange call setQuery(event.target.value) only this code in this function

      // event.preventDefault();  
      // let result=event.value;
      // fetchUsers(result)
    }
  async function searchOnSubmit(e){
      e.preventDefault();
    const  results=await fetchResults(query);
      setResults(results)
    }
//add onSubmit function in Search 
//event prevent default /n assign await fecthResults(query) /n setResults(query)
   

return(
      <>
        <h1>Github User Search</h1>
        <Form onChange={searchOnChange} onSubmit={searchOnSubmit} value={query}/>
        <h1>Resulted Users:</h1>
        <div className="results">
          <div>
            {results.map(
              (user,index)=>(<Users key={index} avatar={user.avatar_url} url={user.url} username={user.login}/>)
              )}
          </div>
        </div>
      </>
    )
}

function Form({onChange,onSubmit,value}){
 return(
   <form className="search_form" onSubmit={onSubmit}>
    <input id="search" type="text" placeholder="Enter github username" onChange={onChange} value={value}></input>
    <button type="submit">Search</button>
  </form>)
}

function Users({avatar,url,username}){
  return (
    <>
    <div className="users" >
      <img src={avatar} width="50" height="50"/>
      <p href={url}>{username}</p>
    </div>
    </>
  )
}