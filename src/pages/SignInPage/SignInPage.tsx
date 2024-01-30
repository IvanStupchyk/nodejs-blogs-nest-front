import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import './styles.scss'
import signInImage from '../../assets/images/sign-in-image.png'
import {SignInForm} from "../../components";
const SignInPage = () => (
  <div className="df-around sign_in_page__container">
    <div>
        <SignInForm />
    </div>
      <div className='sign_in_page__image_container'>
          <img className='center-img' src={signInImage} alt='sign in'/>
      </div>
  </div>
)

export default React.memo(SignInPage)
