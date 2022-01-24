import { useState } from 'react'
import Warner from '../UI/Warner'
import {arrayFunc, authRequest} from '../../helpers'
import cls from './Signin.module.css'
import { getRequest } from '../../api'
import AuthBtn from '../UI/AuthBtn'
import {VscError} from 'react-icons/vsc'
import { BASE_URL } from '../../api/apiKey'

const Signin = () => {
    const [valid , setValid] = useState(false)
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [isEmpty , setIsEmpty] = useState(false)

    const handleSubmitBtn = e => {
        e.preventDefault()

        if(password !== '' || email !== ''){
            authRequest(BASE_URL , email , password)
            .then(r => {
                console.log(r);
                r.localId ? (
                    getRequest('admin.json' , '')
                    .then(result => result.json())
                    .then(el => {
                        const usersData = arrayFunc(el)
                        usersData.forEach(item => {
                            if(item.id === r.localId){
                                localStorage.setItem('user' , JSON.stringify(item.id))
                                window.location.reload()
                            }
                        })
                        setValid(false)
                    })
                ) : (
                    setValid(true)
                )
            })
            setIsEmpty(false)
            setEmail('')
            setPassword('')
        }else(
            setIsEmpty(true)
        )
    }

    return (
        <section className={cls.signin}>
            <h1 className={cls.signin_title}>Log in as an admin!</h1>
            <div className={cls.signin_body}>
                <form action="address">
                    <div>
                        <input 
                            className={email !== '' ? cls.activeInput : null} 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} placeholder='Email address' 
                            type="email" 
                        />
                        <Warner active={isEmpty} title='Email address is required'/>
                    </div>
                    <div
                        style={{marginBottom: '20px'}}>
                        <input 
                            className={password !== '' ? cls.activeInput : null} 
                            onChange={e => setPassword(e.target.value)} 
                            value={password} placeholder='Your password' 
                            type="password" 
                        />
                        <Warner active={isEmpty} title='Password is required'/>
                    </div>
                    <div 
                        style={{display: valid ? 'flex' : 'none'}} 
                        className={cls.isValid}> <VscError
                    /> 
                        <span>You have entered an invalid username or password</span>
                    </div>
                    <AuthBtn click={handleSubmitBtn} title='Log in'/>
                </form>
            </div>  
        </section>
    )}

export default Signin