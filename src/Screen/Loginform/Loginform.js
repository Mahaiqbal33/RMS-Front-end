import React from 'react'
import './loginform.css'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
const Loginform = () => {
    return (
        <div>
            <MDBContainer fluid className="p-3 my-5 h-custom">

                <MDBRow>


                    <MDBCol col='4' md='6'>

                        <div className="d-flex flex-row align-items-center justify-content-center">

                            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

                        </div>
                        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" />
                        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>

                        </div>

                    </MDBCol>
                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>

    )
}

export default Loginform
