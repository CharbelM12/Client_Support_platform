import Joi from "joi";
import complaintConfig from "./complaint.config";
import config from "../configs/config";

  const createBody = {
    title: Joi.string().required(),
    body: Joi.string().required(),
    categoryIds:Joi.array().items(Joi.string().regex(config.validation.regexValue).required())
  };
  const updateStatus={
    status:Joi.string().valid(complaintConfig.complaintStatus.pending,complaintConfig.complaintStatus.inProgress,complaintConfig.complaintStatus.rejected,complaintConfig.complaintStatus.resolved).required()
  }
  const complaintId={
    complaintId: Joi.string().regex(config.validation.regexValue)
  }
  const getMyComplaints={
    page:Joi.number().integer().min(config.validation.pageAndLimitMinValue).required(),
    limit:Joi.number().integer().min(config.validation.pageAndLimitMinValue).required()
  }
  const getClientsComplaints={
    userId:Joi.string().regex(config.validation.regexValue).optional(),
    status:Joi.string().valid(complaintConfig.complaintStatus.pending,complaintConfig.complaintStatus.inProgress,complaintConfig.complaintStatus.rejected,complaintConfig.complaintStatus.resolved).optional(),
    page:Joi.number().integer().min(config.validation.pageAndLimitMinValue).required(),
    limit:Joi.number().integer().min(config.validation.pageAndLimitMinValue).required()
  }

  const complaintValidation = {
    createComplaint: {
      body: Joi.object().keys(createBody),
    },
    getMyComplaints:{
      query:Joi.object().keys(getMyComplaints)
    },
    getComplaintDetails:{
      params:Joi.object().keys(complaintId)
    },
    deleteComplaint:{
      params:Joi.object().keys(complaintId)
    },
    updateStatus:{
      params:Joi.object().keys(complaintId),
      body:Joi.object().keys(updateStatus)
    },
    getClientComplaints:{
      query:Joi.object().keys(getClientsComplaints)
    }
  };
  

export default complaintValidation;