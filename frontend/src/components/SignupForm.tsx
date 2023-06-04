import React, { useState } from "react"
import { SignupPayLoadSchema } from "../core/@types"
import { SignupPayLoadType } from "../core/@types"
import { ValidationError } from "yup"
import { register } from "../core/auth-request"
import { useNavigate } from "react-router-dom"
const labelStyle = 'text-xs text-gray-500'
const fieldCommonStyle = 'w-full py-1 px-2 bg-transparent border-2 text-sm rounded-lg -mb-2'


const SignupForm = () => {
    const [isSubmitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        let form = e.target as any as HTMLFormControlsCollection & {
            username: HTMLInputElement,
            email: HTMLInputElement,
            password: HTMLInputElement,
            confirm_password: HTMLInputElement
        }

        const payload: SignupPayLoadType = {
            username: form.username.value,
            email: form.email.value,
            password: form.password.value,
            confirm_password: form.confirm_password.value
        }


        try {
            let data = await SignupPayLoadSchema.validate(payload, { abortEarly: false })
            register(data as SignupPayLoadType, () => {
                alert('Account created successfully')
                navigate('/')
            }, (reason) => {
                console.log(reason)
                alert(reason)
            })
        } catch (err) {
            if (err instanceof ValidationError) {
                let currentErr = err.inner[0].errors
                alert(currentErr)
            }
        }
    }
    return (
        <form
            className="md:mx-4 mx-2 my-5 [&>div]:my-2"
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className='border-2 rounded-lg p-4'>
                <div className='my-2'>
                    <label className={labelStyle} htmlFor="username"> Username </label>
                    <input name='username' className={fieldCommonStyle} />

                </div>
                <div className='my-2'>
                    <label className={labelStyle} htmlFor="email"> Email </label>
                    <input name='email' type='email' className={fieldCommonStyle} />

                </div>
                <div className='my-2'>
                    <label className={labelStyle} htmlFor="password"> Password </label>
                    <input name='password' type='password' className={fieldCommonStyle} />
                </div>
                <div className='my-4'>
                    <label className={labelStyle} htmlFor='confirm_password'> Confirm Password </label>
                    <input name='confirm_password' type='password' className={fieldCommonStyle} />
                </div>
                <div>
                    <button type="submit" className="bg-green-600 py-1 px-3 w-full text-white rounded-md">
                        Sign up
                    </button>
                </div>
            </div>
        </form>

    )
}

export default SignupForm