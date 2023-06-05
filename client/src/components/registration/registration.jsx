import React, {useState} from 'react';
import Input from "../../utils/input/input";
import './registration.css'
import { registration } from "../../actions/user";

const Registration = () => {
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ IdInstance, setIdInstance] = useState('')
  const [ ApiTokenInstance, setApiTokenInstance] = useState('')

  return (
    <div className="registration">
      <div className='registration__wrap'>
        <div className="registration__title">Регистрация</div>
        <Input value={email} setValue={setEmail} type="text" placeholder="Введите email"/>
        <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"/>
        <Input value={IdInstance} setValue={setIdInstance} type="text" placeholder="Введите IdInstance"/>
        <Input value={ApiTokenInstance} setValue={setApiTokenInstance} type="text" placeholder="Введите ApiTokenInstance"/>
        <button className="registration__btn"
                onClick={() => registration(
                  email,
                  password,
                  IdInstance,
                  ApiTokenInstance)}>Зарегистрироваться</button>
      </div>
    </div>
  );
};

export default Registration;