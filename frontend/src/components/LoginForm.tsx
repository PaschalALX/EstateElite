import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../core/auth-request'
import { LoginPayLoadType } from '../core/@types'
import AppCtx from '../context/AppCtx'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../core/util'

const labelStyle = 'text-sm text-gray-500'
const fieldCommonStyle = 'w-full py-1 px-2 bg-transparent border-2 text-sm rounded-lg -mb-2'

const LoginForm = () => {

    const { setUser } = useContext(AppCtx)
    const [_, setSubmitting] = useState(false)
    const navigate = useNavigate()
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        type FormType = {
            username_or_email: HTMLInputElement,
            password: HTMLInputElement
        }

        let { password, username_or_email } = e.target as any as HTMLFormControlsCollection & FormType

        let emailPattern = /^(.+)@(.+)$/
       
        let payload: LoginPayLoadType = { password: password.value }

        if (username_or_email.value.match(emailPattern)) {
            payload.email = username_or_email.value
        } else {
            payload.username = username_or_email.value
        }
        login(payload, (data)=>{
            setUser(data)
            Auth.set(data)
            alert('Logged in successfully')
            navigate('/myaccount/dashboard')
            setSubmitting(false)
        }, (reason)=>{
            alert(reason)
            setUser(null)
            Auth.remove()
            setSubmitting(false)
        })
    }

    return (

        <form
            className="md:mx-4 mx-2 my-5 [&>div]:my-2"
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className='border-2 rounded-lg p-4'>
                <div className='my-2'>
                    <label htmlFor="username_or_email" className={labelStyle}> Username or email address</label>
                    <input name='username_or_email' className={fieldCommonStyle} />
                </div>
                <div className='my-4'>
                    <label htmlFor="password" className={labelStyle}> Password </label>
                    <input name='password' type='password' className={fieldCommonStyle} />
                </div>
                <div>
                    <button type="submit" className="bg-green-600 py-1 px-3 w-full text-white rounded-md">
                        Login
                    </button>
                </div>
            </div>
            <div className='border-2 rounded-lg p-4 text-xs text-center'>
                Don't have an account? <Link className='text-blue-700 font-semibold' to={'/register'}> Create an account.</Link>
            </div>
        </form>
    )
}

export default LoginForm