import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Accounts = () => {
  const navigate = useNavigate()
  const [balance, setBalance] = useState([])
  const [balanceColor, setBalanceColor] = useState('black')
  const [accounts, setAccounts] = useState([])
  useEffect(() => {
    axios.get('http://localhost:4000/api/user/accounts')
      .then(res => {
        console.log(res)
        setAccounts(res.data.accounts)
        console.log(accounts)
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
        {accounts.map((account, index) => (
            <div key={index}>
              <p >Nom du compte : {account.name}</p>
              <p>Balance : {account.balance}</p>
            </div>
      ))}
    </div>
);
}

export default Accounts