const validateRegisterInput = (
    username, 
    email, 
    password, 
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === ''){
     errors.username = 'Username must not be empty';
   };
    if(password.trim() === ''){ 
        errors.password = 'Password must not be empty';
    } else if(password !== confirmPassword){
        errors.confirmPassword = 'Password must match';
    }
    if(email.trim() === ''){
        errors.email = 'Email must not be empty';
    }else{
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,9}$/
        if(!email.match(regex)){
            errors.email = 'Email must be a valid email';
        }
    };
   
    return{
        errors,
        valid: Object.keys(errors).length < 1
    };
};
const validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === ""){
        errors.username = 'Username must not be empty';
      };
       if(password.trim() === ""){ 
           errors.password = 'Password must not be empty';
       }
       
       return{
        errors,
        valid: Object.keys(errors).length < 1
    };
};
module.exports = {validateRegisterInput, validateLoginInput}