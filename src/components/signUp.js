import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/Auth'
import { Link, useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'



const SignUp = () => { 

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, currentUser } = useAuth() //delete use currentUser for production
  const [ error, setError ] = useState('')
  const [ loading, setloading ] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password does not match!")
    }

    try {
      setError('')
      setloading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/")
      
    } catch {
      setError("Failed creating an account!")
    }

    setloading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
           {/* {JSON.stringify(currentUser)} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
            <Form.Label className='d-flex justify-content-center align-items-center mt-4'>--or sign up with--</Form.Label>
            <Card.Body className='d-flex mt-3 align-items-center justify-content-center'>
              <GoogleButton disabled={loading} onClick={() => { console.log('Google button clicked') }}/>
            </Card.Body>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  )
}

export default SignUp
