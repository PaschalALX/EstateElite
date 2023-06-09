import * as Yup from 'yup'

export type UserType = null | {
    userId: string,
    username: string,
    isAdmin: boolean,
    token: string
}

export type UserTypeFromJWT = { 
    user_id: string, 
    username: string, 
    is_admin: boolean 
}

export type LoginPayLoadType = {
    username?: string,
    email?: string,
    password: string
}

export type SignupPayLoadType = {
    username: string,
    email: string,
    password: string,
    confirm_password: string,
}

export type BlogType = {
    id: string,
    title: string,
    body: string,
    username: string,
    userId: string
}

export type PropertyCardType = {
    id: string,
    title: string,
    username?: string,
    status?: 'approved' | 'declined' | 'pending',
    state: string,
    price: string,
    category: string,
    imageURLs: string[],
}

export type PropertyPayloadType = {
    user_id: string,
    title: string,
    category: string,
    description: string,
    state: string,
    address: string,
    price: number,
    images: string[]
}

export type PropertyFromServer = {
    id: string,
    title: string,
    category: string,
    description: string,
    state: string,
    address: string,
    price: number,
    username: string,
    status:'approved' | 'declined' | 'pending',
    images: string[]
}

/* COLORS */
export const lightColor = {
    value: '#F2EDE9',
    text: 'text-[#F2EDE9]',
    bg: 'bg-[#F2EDE9]',
    hoverText: 'hover:text-[#F2EDE9]',
    hoverBg: 'hover:bg-[#F2EDE9]'
}

export const mainColor = {
    value: '#B97745',
    text: 'text-[#B97745]',
    bg: 'bg-[#B97745]',
    hoverText: 'hover:text-[#B97745]',
    hoverBg: 'hover:bg-[#B97745]'
}

/* SCHEMAS */
export const LoginPayLoadSchema = Yup.object().shape({
    username_or_email: Yup.string().required('Username/email is required'),
    password: Yup.string().required('Password required')
})

export const SignupPayLoadSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email('Invalid email format').required(),
    password: Yup.string().min(8, 'Password is too short').required(),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), ''], 'Password does not match').required('confirm password is a required field')
})

