import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";

import { useForm } from "../../utils/hooks/useForm";
import {
  VALIDATOR_REQUIRED,
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../utils/validators";

import { signInAsync, signInGoogleAsync } from "../../redux/users/user-actions";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import "./SignIn.scss";

const SignIn = ({ signIn, signInGoogle }) => {
  const [userCredentials, changeHandler] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn({ email, password });
  };

  const responseGoogle = (response) => {
    const creds = {
      email: response.profileObj.email,
      avatar_url: response.profileObj.imageUrl,
      username: response.profileObj.email.split("@")[0],
      password: response.profileObj.googleId,
      fullname: response.profileObj.name,
    };

    signInGoogle(creds);
  };

  return (
    <div className="sign-in__content-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <Input
          value={email}
          onChange={changeHandler}
          type="email"
          name="email"
          placeholder="Email"
          validators={[VALIDATOR_REQUIRED(), VALIDATOR_EMAIL()]}
          errorMessage="Please enter a valid email address"
        />
        <Input
          value={password}
          onChange={changeHandler}
          type="password"
          name="password"
          placeholder="Password"
          validators={[
            VALIDATOR_REQUIRED(),
            VALIDATOR_MINLENGTH(6),
            VALIDATOR_MAXLENGTH(500),
          ]}
          errorMessage="Invalid Password. (Min Characters: 6)"
        />
        <Button primary type="submit" text="Sign In">
          <img
            alt="sign-in"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABw0lEQVRYhe2Wuy5EURSG/6N0aSTuQgRBvIXWpUDcH8CtEQleQrSoRCGRSdzCQ3gBUVGgxJjOTPgUs+ScTJjZ+8yRSFjt/v9//Wtf1l7Sf/z1CHzAQKukSUkDkvol1UlC0p2kW0kXkk6DILhP1CXQDOwDWUpHDtgFmpNKPg48mfgrcABMAR1AJVAF9ADTwKFhADLAcLnJF4E3EzyyIyjF6TQsxl2Om3wEeDeRlRj8NeO+ee+EnfmzVeGdvMAEwAvQ5EPc/dz2uMkjWsemteNKaLCbnAXai+BqXXYH6DKtHNDiYmDJHKeKYCqAS8NtOWimDLtY0oBr2PPMuZgAZg13npgBEx4jbE5bwJed1foEwLWLaDmx+Y1mja1nCtcqvMv+TVF4BEVwvYa5SjK5zyWcc76E/OwzXHAxUE+yjagbn0ZkpG1zfOxE+F4nAE5Na9uH2ET4Ga2WYWDDNNJAoy95iPA79TJhla9H+INeySNC84QDyQnQ5sDpNizGXYqVPCI4CjyaYJb82DVDfvKpBKqBPntqqUhfSMeu/AsTjcAe4bxXLHJ2iZ3O3Hcsb5E0oXAsr1c4lt8oP5afBUHw4FXhf/zp+ABKKCClb/GsQAAAAABJRU5ErkJggg=="
          />
        </Button>
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_CONSUMER_KEY}`}
          buttonText="Sign In With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
        <h6>
          No account? <Link to="signup">Sign Up</Link>
        </h6>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (userCredentials) => dispatch(signInAsync(userCredentials)),
  signInGoogle: (userCredentials) =>
    dispatch(signInGoogleAsync(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignIn);
