import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { useForm } from "../../utils/hooks/useForm";
import {
  VALIDATOR_REQUIRED,
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../utils/validators";

import { signUpAsync } from "../../redux/users/user-actions";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import AddIcon from "../../img/icons/Add";

import "./SignUp.scss";

const SignUp = ({ signUp }) => {
  const [userCredentials, changeHandler] = useForm({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    summary: "",
  });

  const {
    email,
    username,
    password,
    confirmPassword,
    fullname,
    summary,
  } = userCredentials;

  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "akarofylakis");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/akarofylakis/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const imageFile = await res.json();
    const imageUrl = imageFile.secure_url;

    if (password !== confirmPassword) {
      alert("Passwords do not match, please try again.");
      return;
    }

    signUp({
      email,
      username,
      password,
      fullname,
      summary,
      avatar_url: imageUrl,
    });
  };

  const changeFile = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setFileUrl(URL.createObjectURL(e.target.files[0]));
    }
    setFile(e.target.files[0]);
  };

  return (
    <div className="sign-up__content-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h3> Sign Up </h3>
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
          value={username}
          onChange={changeHandler}
          type="text"
          name="username"
          placeholder="Username"
          validators={[
            VALIDATOR_REQUIRED(),
            VALIDATOR_MINLENGTH(4),
            VALIDATOR_MAXLENGTH(100),
          ]}
          errorMessage="Invalid Username: (Min Characters: 4)"
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
          errorMessage="Invalid Password: (Min Characters: 6)"
        />
        <Input
          value={confirmPassword}
          onChange={changeHandler}
          type="password"
          name="confirmPassword"
          placeholder="Repeat Password"
          validators={[
            VALIDATOR_REQUIRED(),
            VALIDATOR_MINLENGTH(6),
            VALIDATOR_MAXLENGTH(100),
          ]}
          errorMessage="Invalid Password: (Min Characters: 6)"
        />

        <Input
          value={fullname}
          onChange={changeHandler}
          type="text"
          name="fullname"
          placeholder="Full Name"
        />
        <Input
          value={summary}
          onChange={changeHandler}
          type="textarea"
          name="summary"
          placeholder="Add your profile summary here..."
        />
        <div className="image-upload-container">
          <Button secondary text="Upload Avatar Image">
            <input
              onChange={changeFile}
              accept="image/x-png,image/gif,image/jpeg, image/jpg"
              type="file"
              name="file"
            ></input>
          </Button>

          <div
            className="image-preview"
            style={{ backgroundImage: `url(${fileUrl})` }}
          >
            {!fileUrl && <h6>Image Preview</h6>}
          </div>
        </div>
        <Button primary type="submit" text="Create Account">
          <AddIcon />
        </Button>
        <h6>
          Already have an account ? <Link to="signin"> Sign In </Link>
        </h6>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (userCredentials) => dispatch(signUpAsync(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
