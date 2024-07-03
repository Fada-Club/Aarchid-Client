"use client"

import { Authenticated, User } from "@/atom";
import getSessionStorage from "@/hooks/getSessionStorage";
import axios from "axios"
import { useEffect, useRef } from "react"
import { useSetRecoilState } from "recoil"

const DataLoader = () => {
  const dataLoaded = useRef(false);
  const setUserData = useSetRecoilState(User);
  const setAuthenticated = useSetRecoilState(Authenticated)


  const loadUserData = async() => {
    const _id = getSessionStorage("_id");

    if (_id) {
      try {
        const user = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUser/${_id}` , {
          headers: {
            'Authorization': getSessionStorage("token"),
          },
          withCredentials: true
        });
        console.log(user.data);
        setUserData(user.data)
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(()=>{  
    const token = getSessionStorage("token");

    if(token){
      setAuthenticated(true);
      if(!dataLoaded.current){
        dataLoaded.current= true;
        loadUserData()
      }
    }  
  },[])

  return <></>
}

export default DataLoader