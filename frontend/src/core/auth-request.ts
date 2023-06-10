import { axiosInstance } from './axios.conf'
import { LoginPayLoadType, UserType, SignupPayLoadType } from './@types'
import { Auth, jwtUserExtract } from './util'


export const logout = (cb: () => void) => {
    axiosInstance.delete('/api/auth/logout')
        .then((res) => {
            if (res.status === 200) cb()
        })
        .catch(()=> cb())
}

export const refresh = (
    success: (data: UserType) => void,
    failure: (
        statusCode: number,
        reason: string
    ) => void = ()=>{}) => {
    axiosInstance.post('/api/auth/refresh')
        .then((res) => {
            let token = res.data.jwt_access_token
            let user: UserType = jwtUserExtract(token)

            success(user)
        })
        .catch((err) => {
            if (err.message === 'Network Error'){
                failure(500, err.message)
            }
            else{
                const statusCode = err.response.data.error.code
                const reason = err.response.data.error.message
                failure(statusCode, reason)
            }
        })
}

export const login = (
    payload: LoginPayLoadType,
    success: (data: UserType) => void,
    failure: (reason: string) => void) => {
    axiosInstance.post('/api/auth/login', payload)
        .then((res) => {
            let token = res.data.jwt_access_token
            let user: UserType = jwtUserExtract(token)
            success(user)
        })
        .catch((err) => {
            console.log(err)
            if (err.message === 'Network Error'){
                failure(err.message)
            }
            else{
                const reason = err.response.data.error.message
                failure(reason)
            }
        })
}

export const deleteAccount = (
    userId: string,
    success: () => void,
    failure: () => void) => {
    if (confirm('Are you sure you want to delete your account?')) {
        axiosInstance.delete(`/api/users/${userId}`)
            .then(() => {
                success()
            })
            .catch(() => {
                failure()
            })
    }
}

export const register = (
    payload: SignupPayLoadType,
    success: () => void,
    failure: (reason: string) => void
) => {
    axiosInstance.post('/api/auth/register', payload)
        .then(() => {
            success()
        })
        .catch((err) => {
            if (err.message === 'Network Error'){
                failure(err.message)
            }
            else{
                const reason = err.response.data.error.message
                failure(reason)
            }
        })
}

export const sessionExpired = (
    cb:()=>void
) => {
    Auth.remove()
    alert('Session Expired')
    cb()
}