import { UsernamePassowordInput } from "../entities/UsernamePassowordInput";

export const validateRegister = (options: UsernamePassowordInput) => {
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Length must be greater than 2.",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Cannot include @ sign in username",
      },
    ];
  }
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid Email id.",
      },
    ];
  }
  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Length must be greater than 2.",
      },
    ];
  }

  return null;
};
