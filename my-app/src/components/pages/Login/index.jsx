import React, { useState } from 'react'
import { useEffect } from 'react'
import { getUsers } from '../../Utils/api'
import classes from './Login.module.css'

export default function Login() {
    const [data, setData] = useState(false)
    const [isVallid, setIsValid] = useState(false)

    useEffect(() => {
        getUsers().then ((res) => {
            setData(res)
            console.log(res);
        })
    }, [])

    const handleSubmit = (e) => {
        let userData = false

        data.forEach((el, index) => {
            if (e.target.elements[0].value === el.email) {
                userData = index
            }
        })

        if (userData) {
            setIsValid(false)
            localStorage.setItem('isAuthId', JSON.stringify(userData))
        } else {
            e.preventDefault()
            setIsValid(true)
        }
        
    }
  return (
    <form className={classes.main} onSubmit={(event) => handleSubmit(event)}>
        <h3>Autorization</h3>
        <div className={classes.input__div}>
            <label>login</label>
            <input type="email" />
        </div>
        <div className={classes.input__div}>
            <label>password</label>
            <input type="password" />
        </div>
        {isVallid ? <span className='error'>Логин и/или пароль введен неправильно</span> : <></>}
        <button>submit</button>
    </form>
  )
}
