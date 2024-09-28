"use client"
import React, {  useState } from 'react'

const App = () => {
  const [input,setInput]=useState("")
  const [userList,setUserList]=useState([])
  

  const getData=async()=>{
    try{
      const response=await fetch(`https://api.github.com/search/users?q=${input}`)
      if(!response.ok){
        throw new error("Kullanıcı Bulunamadı")
      }
      const users=await response.json()
      setUserList(users.items)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className="container">
      <h1>Github User Search</h1>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder='Kullanıcı adı ya da email giriniz'
      />
      <button onClick={getData}>Search</button>
      <div>
        {userList.map(user => (
          <div className="user-card" key={user.id}>
            <img src={user.avatar_url} alt={user.login} width="50" />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App