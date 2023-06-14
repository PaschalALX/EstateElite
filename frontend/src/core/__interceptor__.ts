import { Auth } from "./util"
import { axiosInstance, axiosInstance2 } from "./axios.conf"
import jwtDecode from "jwt-decode"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import { jwtUserExtract } from "./util"
import { UserType } from "./@types"
import { refresh } from "./auth-request"


refresh((data) => {
  Auth.setLocalVar(data)
})

axiosInstance.interceptors.request.use(async (config) => {

  if (Auth.isSet() && config.method != 'get') {
    let token = Auth.get()?.token
    
    if (token) {
      let payload = jwtDecode(token as string) as { exp: number }
      dayjs.extend(relativeTime)
      let hasExpired = dayjs.unix(payload.exp).diff(dayjs()) < 1

      if (hasExpired) {
        let res = await axiosInstance2.post('/api/auth/refresh')
        token = res.data.jwt_access_token
        let user: UserType = jwtUserExtract(token as string)
        Auth.set(user)
      }
      config.headers.set('Authorization', `Bearer ${token}`)
    }
  }
  return config
})