import jwtDecode from "jwt-decode"
import { UserType, BlogType } from "./@types"

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
  const payload = jwtDecode(token) as { user_id: string, username: string }
  return {
    userId: payload.user_id,
    username: payload.username,
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

export const blogList: BlogType[] = [
  {
    id: "1",
    title: "1 Lorem ipsum dolor sit amet consectetur",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam error vel fugit veritatis accusantium non. Nesciunt alias accusantium doloremque facere aut nemo? Accusamus dolorum adipisci saepe quibusdam tenetur voluptates atque hic fugit beatae? Nam minima perferendis, debitis necessitatibus officia a.",
    username: "pasmac",
    userId: "pasmac1234"
  },
  {
    id: "2",
    title: "2 Lorem ipsum dolor sit amet consectetur",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam error vel fugit veritatis accusantium non. Nesciunt alias accusantium doloremque facere aut nemo? Accusamus dolorum adipisci saepe quibusdam tenetur voluptates atque hic fugit beatae? Nam minima perferendis, debitis necessitatibus officia a.",
    username: "pasmac",
    userId: "pasmac1234"
  },
  {
    id: "3",
    title: "3 Lorem ipsum dolor sit amet consectetur",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam error vel fugit veritatis accusantium non. Nesciunt alias accusantium doloremque facere aut nemo? Accusamus dolorum adipisci saepe quibusdam tenetur voluptates atque hic fugit beatae? Nam minima perferendis, debitis necessitatibus officia a.",
    username: "eze",
    userId: "eze1234"
  }

]