import React, { useEffect, useRef, useState } from 'react'
import axios from '../../api/axios';
import { useAuth } from '../../context/authContext';



const LOGIN_URL = "/auth";


const LoginWindow = ({isOpen, onClose}) => {
  const [isLoginOpen, setLoginOpen] = useState(isOpen);
  const login_ref = useRef(null);
  const [userValue, setUserValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");

  const {setAuth, persist, setPersist} = useAuth();

  const closeWindow = (e) => {
    if(onClose){
      onClose();
    }
    setPwdValue("");
    setUserValue("");
    setLoginOpen(false);

    if (!e?.target) {
      localStorage.setItem("persist", persist);
    }
    setPersist(false);
  }

  //отслеживает isOpen свойство(property) компонента и открывает/закрывает окно
  useEffect(() => {
    setLoginOpen(isOpen)
  }, [isOpen]);


  useEffect(() => {
    const loginElement = login_ref.current;

    if(loginElement) {
      if(isLoginOpen) {
        loginElement.showModal();
      } else {
        loginElement.close();
      }
    }
  }, [isLoginOpen]);


  const submitLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(LOGIN_URL,
        JSON.stringify({user: userValue, pwd: pwdValue}), {
          headers: {"Content-Type":"application/json"},
          withCredentials: true
        });        
      
      
      const token = res.data.accessToken;
      setAuth({userName: userValue, accessToken: token});
      closeWindow();
    } catch (err) { console.log(err) }    
  }




  return (
    <dialog ref={login_ref} className='m-auto w-[300px] h-[500px] bg-black open:flex open:flex-col backdrop:backdrop-blur-[8px]'>
      <h1 className='text-white'>л огин еблана</h1>
      <button onClick={closeWindow} className='text-white relative ml-auto'>
        close
      </button>

      <form className='bg-slate-800 items-start' onSubmit={submitLogin}>
        <input 
          id="userInput"
          onChange={(e) => {setUserValue(e.target.value)}}
          value={userValue}
          required/>

        <input 
          id="pwdInput"
          onChange={(e) => {setPwdValue(e.target.value)}}
          value={pwdValue}
          required/>
        <br/>

        <input type='checkbox' id="persist" onChange={() => {setPersist(prev => !prev)}} checked={persist}></input>
        <label htmlFor="persist">remember me</label>
        <br/>

        <button>submit</button>
      </form>

    </dialog>
  )
}

export default LoginWindow;