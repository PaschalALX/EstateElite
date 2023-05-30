import {Formik, Form} from 'formik'
import { useContext } from 'react'
import { appCtx } from '../context/appCtx'

const initialValues = {
    username_or_email: '',
    password: '',
  }
  
  const onSubmit = (values: typeof initialValues)=>{
      console.log(values)
  }

  const labelStyle = 'text-sm text-gray-500'
  const fieldCommonStyle = 'w-full py-1 px-2 bg-transparent border-2 text-sm rounded-lg -mb-2'

const LoginForm = () => {
    const {setAccountPaneSelect} = useContext(appCtx)

    const selectRegisterPane = () => {
        setAccountPaneSelect('register')
    }
  return (
    <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        >
        {({handleSubmit})=>(
            <Form 
                className="md:mx-4 mx-2 my-5 [&>div]:my-2"
                onSubmit={handleSubmit}
                >
            <div className='border-2 rounded-lg p-4'>
                <div className='my-2'>
                    <label htmlFor="username_or_email" className={labelStyle}> Username or email address</label>
                    <input name='username_or_email' className={fieldCommonStyle}/>
                </div>
                <div className='my-4'>  
                    <label htmlFor="password" className={labelStyle}> Password </label>
                    <input name='password' type='password' className={fieldCommonStyle}/>
                </div>
                <div>
                    <button type="submit" className="bg-green-600 py-1 px-3 w-full text-white rounded-md">
                        Login
                    </button>
                </div>
            </div>
            <div className='border-2 rounded-lg p-4 text-xs text-center'>
                Don't have an account? <button className='text-blue-700 font-semibold' onClick={selectRegisterPane}> Create an account.</button>
            </div>
            </Form>
        )}
    </Formik>
  )
}

export default LoginForm