const VALIDATOR_TYPE_REQUIRED = "REQUIRED";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";

export const VALIDATOR_REQUIRED = () => ({ type: VALIDATOR_TYPE_REQUIRED });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val,
});
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val,
});

export const validate = (value, validators) => {
  let isValid = true;
  validators.forEach((validator) => {
    switch (validator.type) {
      case VALIDATOR_TYPE_REQUIRED:
        isValid = isValid && value.trim().length > 0;
        break;
      case VALIDATOR_TYPE_EMAIL:
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        break;
      case VALIDATOR_TYPE_MINLENGTH:
        isValid = isValid && value.trim().length >= validator.val;
        break;
      case VALIDATOR_TYPE_MAXLENGTH:
        isValid = isValid && value.trim().length <= validator.val;
        break;
      default:
        break;
    }
  });
  return isValid;
};
