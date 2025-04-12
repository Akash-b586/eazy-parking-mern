import Cookies from 'js-cookie';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate()
    useEffect(()=>{
        Cookies.remove("token");
        navigate('/');
    },[])
  return (
    <div>Loggin Out</div>
  )
}

export default Logout