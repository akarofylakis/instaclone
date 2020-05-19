import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import AddIcon from '../../img/icons/Add';

import './SignUp.scss';

const SignUp = () => {
  return (
    <div className='sign-up__content-container'>
      <form className='add-form'>
        <h3>Sign Up</h3>
        <Input name='email' placeholder='Email' />
        <Input name='username' placeholder='Username' />
        <Input name='password' placeholder='Password' />
        <Input name='password2' placeholder='Repeat Password' />
        <hr />
        <Input name='full-name' placeholder='Full Name' />
        <Input
          type='textarea'
          name='summary-textarea'
          placeholder='Add your profile summary here...'
        />
        <div className='image-upload-container'>
          <div className='image-preview'>
            <h6>Please pick an image</h6>
          </div>
          <Button secondary text='Add Avatar'></Button>
        </div>
        <Button primary type='submit' text='Create Account'>
          <AddIcon />
        </Button>

        <h6>
          Already have an account? <Link to='signin'>Sign In</Link>
        </h6>
      </form>
    </div>
  );
};

export default SignUp;
