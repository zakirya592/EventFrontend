import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const ChatContext = createContext();
function CreateContext({ children }) {
    const [first_name, setfirst_name] = useState('')
    const [last_name, setlast_name] = useState('')
    const [street_address, setstreet_address] = useState('')
    const [barangay, setbarangay] = useState('')
    const [province, setprovince] = useState('')
    const [city, setcity] = useState('')
    const [club_name, setclub_name] = useState()
    const [club_region, setclub_region] = useState()
    const [club_president, setclub_president] = useState()
    const [national_president, setnational_president] = useState('')
    const [date, setdate] = useState('')
    const [pe_ID, setpe_ID] = useState('')
    const [club_secretry_name, setclub_secretry_name] = useState('')
    const [club_secretry_NO, setclub_secretry_NO] = useState('')

     // post api
     const apicall = () => {
         // console.log(email,password)
         axios.post('http://gs1ksa.org:3015/api/tblPostMembers', {
                 first_name: first_name,
                 last_name: 'last_name',
                 street_address: 'street_address',
                 barangay: 'barangay',
                 province: 'province',
                 city: 'city',
                 club_name: club_name,
                 club_region: club_region,
                 club_president: club_president,
                 national_president: national_president,
                 date: date,
                 pe_ID: 'NO/YES',
                 club_secretry_name: club_secretry_name,
                 club_secretry_NO: '0336123',

             }, )
             .then(res => {
                 console.log(res);
                 
             })
             .catch(err => {
                 console.log(err);

             })
     }
     const contextValue = { apicall  };  
  return (
    <ChatContext.Provider
      value={{apicall,
        first_name, setfirst_name,
        last_name, last_name,
        club_name, setclub_name,
        club_region, setclub_region,
        club_president, setclub_president,
        national_president, setnational_president,
        club_secretry_name,setclub_secretry_name,
        date, setdate


      }}
    >
      {children}
    </ChatContext.Provider>
  )
}


export const ChatState = () => {
    return useContext(ChatContext);
};
export default CreateContext;