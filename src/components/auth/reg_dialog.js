import React, { useEffect, useRef, useState } from 'react'
import axios from '../../api/axios';



const REGISTER_URL = "/register";


const RegistrationWindow = ({isOpen, onClose}) => {
  const [isRegOpen, setRegOpen] = useState(isOpen);
  const regWindow = useRef(null);
  const [userValue, setUserValue] = useState(null);
  const [pwdValue, setPwdValue] = useState(null);

  const closeWindow = () => {
    if(onClose){
      onClose();
    }
    setRegOpen(false)
  }

  //отслеживает isOpen свойство(property) компонента и открывает/закрывает окно
  useEffect(() => {
    setRegOpen(isOpen)
  }, [isOpen]);


  useEffect(() => {
    const regElement = regWindow.current;

    if(regElement) {
      if(isRegOpen) {
        regElement.showModal();
      } else {
        regElement.close();
      }
    }
  }, [isRegOpen]);


  const submitRegistration = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(REGISTER_URL,
        JSON.stringify({user: userValue, pwd: pwdValue}), {
          headers: {"Content-Type":"application/json"},
          withCredentials: true
        });

    } catch (err) { console.log(err) }
    closeWindow();
  }



  return (
    <dialog ref={regWindow} className='m-auto w-[300px] h-[500px] bg-black open:flex open:flex-col backdrop:backdrop-blur-[8px]'>
      <h1 className='text-white'>регистрация еблана</h1>
      <button onClick={closeWindow} className='text-white relative ml-auto'>
        close
      </button>

      <form className='bg-slate-800 flex flex-col' onSubmit={submitRegistration}>
        <input onChange={(e) => {setUserValue(e.target.value)}}></input>
        <input onChange={(e) => {setPwdValue(e.target.value)}}></input>
        <button>submit</button>
      </form>

    </dialog>
  )
}

export default RegistrationWindow;