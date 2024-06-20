import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/Auth'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    //handle event trigger for the submit button
      const handleSubmit = async(e) => {
        e.preventDefault()
    
        try {
            setMessage("")
            setError("")
            setLoading(true)
            //firebase cloud function resetPassword
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
          } catch {
            setError("Failed to reset password")
          }

          setLoading(false)
      }
    
      return (
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Password Reset</h2>
               {/* {JSON.stringify(currentUser)} */}
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Reset Password
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/login">Back to login</Link>
              </div>
              
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-3">
            Don't have an account? <Link to='/signup'>Sign Up</Link>
          </div>
        </>
      )
    }

export default ForgotPassword