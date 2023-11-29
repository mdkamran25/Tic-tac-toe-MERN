export  const nameValidation = (name) => {
    if(!name){
        throw new Error("Name is required")
    }
    else if (name.length < 4) {
        throw new Error( "Must be 4 characters or more");
      } else if (!/^[a-zA-Z, ]+$/.test(name)) {
       throw new Error("Enter a Valid Name");
      } else if (name.length > 15) {
       throw new Error("Must be 15 characters or less");
      }
}

export const emailValidation = (email) => {
    if(!email){
        throw new Error("Email is required")
    }
    else if (
        !/^(?=.{5,50}$)[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
      ) {
        throw new Error("Invalid email address");
      }
}

export const phoneValidation = (phone) => {
    if(!phone){
        throw new Error("Phone Number is required")
    }else if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone)) {
        throw new Error("Invalid Phone Number");
      }
}

export const passwordValidation = (password) => {
    if(!password){
        throw new Error("Password is required")
    }else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\*]).{8,15}$/.test(
          password
        )
      ) {
        throw new Error(
          "Your Password must contain atleast one digit, one lowercase letter, one uppercase, some Special character(!@#*) and must be of atleast length eight");
      }
}

export const confirmPasswordValidation = (password, confirmPassword) => {
 if(!password){
    throw new Error("First fill the password")
 }
 if(!confirmPassword){
    throw new Error("Confirm Password is required")
 }
 else if (confirmPassword !== password) {
    throw new Error("Password did not match");
  }
}