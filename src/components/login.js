import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert, CardBody } from 'react-bootstrap'
import { useAuth } from '../contexts/Auth'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from 'react-google-button';
import { auth } from "../db/firebase-config";


const Login = () => {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useAuth() //don't use current U
  const [error, setError] = useState('')
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

  
//handle event trigger onSubmit for submit button
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setloading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/")

    } catch {
      setError("Username and password do not match!")
    }

    setloading(false)
  }


  //handle event trigger onSubmit google button
  const handleGoogleSubmit = async(e) => {
      const provider = await new GoogleAuthProvider();
      
      try{
      const result = await signInWithPopup(auth, provider)
      navigate('/')

      } catch {
        setError("Authentication failed")
      }
    }
  
  

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
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
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log in
            </Button>
            <Form.Label className='d-flex justify-content-center align-items-center mt-4'>--or sign in with--</Form.Label>
            <Card.Body className='d-flex mt-3 align-items-center justify-content-center'>

              <GoogleButton disabled={loading}
                onClick={handleGoogleSubmit}
              />

            </Card.Body>
            <div className="w-100 text-center mt-3">
              <Link to='/forgotpassword'>Forgot Password?</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  )
}

export default Login
