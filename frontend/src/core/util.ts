import jwtDecode from "jwt-decode"
import { UserType, UserTypeFromJWT } from "./@types"

export const firstLetterCapital = (val: string) => {
  if (typeof (val) == 'string') {
    val = val.replace(/.*/g, (v) => v.toLowerCase().replace(/\b./g, (v) => v.toUpperCase()))
  }
  return val
}

export const shortenWords = (text: string, len: number = 100) => {
  if (text.length <= len) return text

  return text.slice(0, len) + '...'
}

export const jwtUserExtract = (token: string): UserType => {
  const payload = jwtDecode(token) as UserTypeFromJWT
  return {
    userId: payload.user_id,
    username: payload.username,
    isAdmin: payload.is_admin,
    token: token
  }
}

export const Auth = {
  user: null as UserType,
  set(user: UserType) {
    this.user = user
    let localStoreCopy = {...user, token: ''}
    localStorage.setItem('auth', JSON.stringify(localStoreCopy))
  },
  setLocalVar(user: UserType) {
    this.user = user
  },
  setLocalStore(user: UserType) {
    let localStoreCopy = {...user, token: ''}
    localStorage.setItem('auth', JSON.stringify(localStoreCopy))
  },
  get(): UserType {
    if (this.user) return this.user

    let localStoreJson = localStorage.getItem('auth')
    if (localStoreJson && (typeof(localStoreJson) === 'string')) return JSON.parse(localStoreJson) as UserType

    return null
  },
  isSet() {
    return this.user !== null || localStorage.getItem('auth')
  },
  remove() {
    this.user = null
    localStorage.removeItem('auth')
  }
}

export const carouselCycle = (
  direction: 'left' | 'right',
  listLen: number,
  setListIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  let len = listLen - 1
  if (len <= 0) return

  if (direction == 'left')
    setListIndex((v) => {
      if (v > 0) {
        return v - 1
      }
      return v
    })
  else
    setListIndex((v) => {
      if (v < len) {
        return v + 1
      }
      return v
    })
}

export const sessionStore = {
  set(key:string, value:any){
    console.log(value)
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  get(key:string){
    return JSON.parse(sessionStorage.getItem(key) as string)
  }
}