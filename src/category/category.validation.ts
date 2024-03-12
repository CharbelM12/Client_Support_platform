import Joi from "joi";
import config from "../configs/config";

  const addBody = {
    name: Joi.string().required(),
    description: Joi.string().required(),
  };
  const updateBody={
    name:Joi.string().optional(),
    description:Joi.string().optional()
  }
  const categoryId={
    categoryId: Joi.string().regex(config.validation.regexValue)
  }
  const userId={
    userId: Joi.string().regex(config.validation.regexValue)
  }
  const getCategories={
    page:Joi.number().integer().min(config.validation.pageAndLimitMinValue).required(),
    limit:Joi.number().integer().min(config.validation.pageAndLimitMinValue).required()
  }
  const categoryValidation = {
    createCategory: {
      body: Joi.object().keys(addBody),
    },
    getCategories:{
      query:Joi.object().keys(getCategories)
    },
    getCategoryDetails:{
      params:Joi.object().keys(categoryId)
    },
    updateCategory:{
      params:Joi.object().keys(categoryId),
      body:Joi.object().keys(updateBody)
    },
    deleteCategory:{
      params:Joi.object().keys(categoryId)
    },
    getCategoriesByAdmin:{
      query:Joi.object().keys(userId)
    }
  };
  

export default categoryValidation;
