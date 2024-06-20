import React from 'react'
import SignUp from './signUp'
import Login from './login'
import Dashboard from './dashboard'
import PrivateRoutes from './privateRoute'
import ForgotPassword from './forgotPassword'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{ maxWidth: "400px" }}>
          <BrowserRouter>
            <Routes>
              //This route acts if the user authenticate, / will bring them to dashboard page.
              <Route element={<PrivateRoutes />}>
                <Route exact path="/" element={<Dashboard />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotpassword" element={<ForgotPassword/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </Container>
    </>
  );
}


export default App;
