import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();


  const onSubmit = data => {
    axios.post('http://localhost:4000/api/user/login', data)
      .then(res => {
        // On enregistre le token dans le localStorage
        localStorage.token = res.data.token;
        localStorage.userId = res.data.userId;
        // On "enregistre" le token dans la conf. de Axios
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        // On "navigate" (redirige) vers '/my-notes'
        navigate('/');
      }).catch(err => {
        alert(err.message + ' - Paire email / mot de passe incorrecte');
      })
  }


  return (
    <section id='login'>
        <form onSubmit={handleSubmit(onSubmit)}>
    <input
        type='text'
        name='email'
        placeholder='Email'
        {...register('email', { required: true })}
    />
    <input
        type='password'
        name='password'
        placeholder='Mot de passe'
        {...register('password', { required: true })}
    />
    <input
        type='text'
        name='bankinVersion'
        placeholder='Version Bankin'
        {...register('bankinVersion', { required: true })}
    />
    <input
        type='text'
        name='bankinDevice'
        placeholder='Device Bankin'
        {...register('bankinDevice', { required: true })}
    />
    <input type='submit' name='valider' value='Valider' />
</form>
    </section>
  )
}

export default Login
