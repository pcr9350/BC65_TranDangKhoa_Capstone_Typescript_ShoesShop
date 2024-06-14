import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { loginApiActionAsync } from '../../redux/reducers/userReducer'
import { DispatchType } from '../../redux/store'
import { useDispatch } from 'react-redux'
type Props = {}

export type UserLoginType = {
  email: string,
  password: string
}
const Login = (props: Props) => {
  const dispatch:DispatchType = useDispatch();
  const frmLogin = useFormik<UserLoginType>({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email cannot be blank').email('Email is invalid'),
      password: yup.string().required('Password cannot be blank')
    }),
    onSubmit: (userLogin:UserLoginType) =>{
      // console.log(userLogin)
      const actionAsync = loginApiActionAsync(userLogin);
      dispatch(actionAsync);
    }
  })
  return (
    <div className='container'>
      <form onSubmit={frmLogin.handleSubmit} className='w-50 mx-auto '>
        <h3>Login</h3>
        <div className="form-group">
        <label htmlFor='email'>Email</label>
        <input className='form-control' name='email' id='email' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} />
        {frmLogin.errors.email && <p className='text text-danger'>{frmLogin.errors.email}</p>}
        </div>
        <div className="form-group">
        <label htmlFor='password'>password</label>
        <input className='form-control' type='password' name='password' id='password' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} />
        {frmLogin.errors.password && <p className='text text-danger'>{frmLogin.errors.password}</p>}
        </div>
        <div className="form-group">
          <button className='btn btn-success mt-2' type='submit' disabled={!frmLogin.isValid}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login