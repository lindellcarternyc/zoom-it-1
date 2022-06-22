import { MouseEvent, ChangeEvent, FormEvent, useState } from 'react'
import { useHMSActions } from '@100mslive/react-sdk'

import classes from './sign-in.module.css'

const SignIn = (): JSX.Element => {
  const hmsActions = useHMSActions()
  const [inputValues, setInputValues] = useState({
    name: '',
    token: ''
  })

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Object.keys(inputValues).includes(evt.target.name)) {
      setInputValues(prevValues => ({
        ...prevValues,
        [evt.target.name]: evt.target.value
      }))
    }
  }

  const handleSubmit = (evt: FormEvent | MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    const { name, token } = inputValues
    if (name.trim() && token.trim()) {
      hmsActions.join({
        userName: name,
        authToken: token
      })

      setInputValues({
        name: '', token: ''
      })
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className={classes['meeting-title']}>Join Meeting</h2>
      <div className={classes['input-container']}>
        <input type="text" 
          required
          value={inputValues.name}
          onChange={handleInputChange}
          id='name'
          name='name'
          placeholder='Your name'
        />
      </div>
      <div className={classes['input-container']}>
        <input type="text" 
          required
          value={inputValues.token}
          onChange={handleInputChange}
          id='token'
          name='token'
          placeholder='Auth token'
        />
      </div>
      <button className={classes['btn-signin']} type='submit'>
        Join
      </button>
    </form>
  )
}

export default SignIn