import Joi from "joi";

export const IUploadReelsValidator = Joi.object({
    filename: Joi.string().required(),
});
