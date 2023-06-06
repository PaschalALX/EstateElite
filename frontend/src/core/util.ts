import jwtDecode from "jwt-decode"
import { UserType } from "./@types"

export const firstLetterCapital = (val:string) =>{
    if (typeof(val) == 'string'){
        val = val.replace(/.*/g, (v)=>v.toLowerCase().replace(/\b./g, (v)=>v.toUpperCase()))
    }
    return val
}

export const shortenWords = (text:string, len: number = 100) => {
    if (text.length <= len) return text

    return text.slice(0, len)+'...'
}

export const jwtUserExtract = (token:string):UserType => {
    const payload = jwtDecode(token) as {user_id: string, username: string}
    return {
        userId: payload.user_id,
        username: payload.username,
        token: token
    }
}

export const userTempStorage = {
    value: null as UserType,
    get(){
        return this.value
    },
    set(user:UserType){
        this.value = user
    },
    has(){
        return this.value != null
    },
    remove(){
        this.value = null
    }
}