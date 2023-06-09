import React from 'react'
import './loginform.css'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Button,Sectionstyled,Heading,Heading2,Subtitle} from '../../Theme/DesignSystem';
const Loginform = () => {
    return (
        <div>
            <Sectionstyled fluid className="p-3 my-5 h-custom" >

                <MDBRow>


                    <MDBCol col='4' md='6'>

                            <Heading >Welcome Back!</Heading>

                        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" />
                        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <Button  className='px-5'>Login</Button>

                        </div>

                    </MDBCol>
                    <MDBCol col='6' md='6'>
                        <img src='./loginformImg.png' class="img-fluid" alt="Sampleimage" />
                    </MDBCol>
                </MDBRow>
            </Sectionstyled>
        </div>

    )
}

export default Loginform
