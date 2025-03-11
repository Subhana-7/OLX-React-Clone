import React, {Children, createContext, useContext, useState} from 'react'
import {auth,db} from '../firebase/config'

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({children}) => {
  const [text,setText] = useState("")
  const [user,setUser] = useState("hello");
  return(
    <FirebaseContext.Provider value={{auth,db,user,text,setText}}>
      {children}
      </FirebaseContext.Provider>
  )
}
