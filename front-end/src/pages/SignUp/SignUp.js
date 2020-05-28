import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signUpAsync } from '../../redux/users/user-actions';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import AddIcon from '../../img/icons/Add';

import './SignUp.scss';

const SignUp = ({ signUp }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    summary: '',
    avatar_url: '',
  });
  const {
    email,
    username,
    password,
    confirmPassword,
    fullname,
    summary,
    avatar_url,
  } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match, please try again.');
      return;
    }
    signUp({ email, username, password, fullname, summary, avatar_url });
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className='sign-up__content-container'>
      <form className='add-form' onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <Input
          value={email}
          onChange={changeHandler}
          type='email'
          name='email'
          placeholder='Email'
        />
        <Input
          value={username}
          onChange={changeHandler}
          type='text'
          name='username'
          placeholder='Username'
        />
        <Input
          value={password}
          onChange={changeHandler}
          type='password'
          name='password'
          placeholder='Password'
        />
        <Input
          value={confirmPassword}
          onChange={changeHandler}
          type='password'
          name='confirmPassword'
          placeholder='Repeat Password'
        />
        <hr />
        <Input
          value={fullname}
          onChange={changeHandler}
          type='text'
          name='fullname'
          placeholder='Full Name'
        />
        <Input
          value={summary}
          onChange={changeHandler}
          type='textarea'
          name='summary'
          placeholder='Add your profile summary here...'
        />
        <div className='image-upload-container'>
          <Input
            value={avatar_url}
            onChange={changeHandler}
            type='text'
            name='avatar_url'
            placeholder='Avatar URL'
          />
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

const mapDispatchToProps = (dispatch) => ({
  signUp: (userCredentials) => dispatch(signUpAsync(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
