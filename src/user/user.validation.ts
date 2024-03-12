import Joi from "joi";

  const signupBody = {
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    isVip:Joi.boolean().optional(),
    isAdmin:Joi.boolean().optional()
  };
 const loginBody={
    email: Joi.string().required(),
    password: Joi.string().required(),
 }
 const changePassword={
    currentPassword:Joi.string().required(),
    newPassword:Joi.string().required()
 }

  const userValidation = {
    signup: {
      body: Joi.object().keys(signupBody),
    },
    login:{
      body:Joi.object().keys(loginBody)
    },
    changePassword:{
      body:Joi.object().keys(changePassword)
    }
  };
  

export default userValidation;