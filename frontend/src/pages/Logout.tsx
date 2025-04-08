import Cookies from 'js-cookie';
import React, { useEffect } from 'react'

const Logout = () => {
    useEffect(()=>{
        Cookies.remove("token");
    },[])
  return (
    <div>Loggin Out</div>
  )
}

export default Logout