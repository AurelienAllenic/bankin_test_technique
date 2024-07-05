import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Accounts = () => {
  const navigate = useNavigate()
  const [balance, setBalance] = useState([])
  const [balanceColor, setBalanceColor] = useState('black')
  useEffect(() => {
    axios.get('http://localhost:4000/api/user/accounts')
      .then(res => {
        console.log(res)
        setBalance(res.data.totalBalance)
        if(balance > 500) {
          setBalanceColor('green')
        }else if(balance > 0 && balance < 500){
          setBalanceColor('orange')
        }else if(balance <= 0){
          setBalanceColor('red')
        }
      }).catch(err => {
        alert(err.message + ' - Paire email / mot de passe incorrecte');
      })
  }, [])
  return (
    <div>
        <p>La balance totale est de <span style={{ color: balanceColor }}>{balance}</span></p>
    </div>
);
}

export default Accounts