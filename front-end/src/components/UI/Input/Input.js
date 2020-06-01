import React, { useReducer } from "react";

import { validate } from "../../../utils/validators";

import "./Input.scss";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({ onChange, validators, errorMessage, ...otherProps }) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: otherProps.value || "",
    isValid: otherProps.isValid || false,
    isTouched: false,
  });

  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators,
    });
  };

  const touchHandler = (event) => {
    dispatch({
      type: "TOUCH",
    });
  };

  return (
    <div
      className={`input-container ${
        otherProps.type === "textarea" && "input-container-textarea"
      }`}
    >
      {otherProps.type === "textarea" ? (
        <textarea
          onChange={(e) => {
            onChange(e);
            changeHandler(e);
          }}
          onBlur={touchHandler}
          {...otherProps}
        ></textarea>
      ) : (
        <input
          onChange={(e) => {
            onChange(e);
            changeHandler(e);
          }}
          onBlur={touchHandler}
          {...otherProps}
        />
      )}
      {!inputState.isValid && inputState.isTouched && (
        <p className="input-error">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
