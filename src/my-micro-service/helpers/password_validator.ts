import myAssert from "./Error_Handler";

export async function passwordValidator(password: string) {

  myAssert(
    password.length < 8, 
    "Password must be atleast 8 charecters"
  );
  myAssert(
    password.search(/[a-z]/) < 0,
    "Password must contain atleast least one lower case"
  );
  myAssert(
    password.search(/[A-Z]/) < 0,
    "Password must contain atleast least one upper case"
  );
  myAssert(
    password.search(/[0-9]/) < 0,
    "Password must contain at least one digit"
  );
  myAssert(
    password.search(/[!@#\$%\^\&*\)\(+=._-]/) < 0,
    "Password must contain at least one special character"
  );
}
