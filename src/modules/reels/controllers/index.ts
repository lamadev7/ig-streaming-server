import { Request, Response } from "express";
import { IUploadReelsPayload } from "../types";
import { IUploadReelsValidator } from "../validator";


class ReelsController {
    reelsService: any;

    constructor({ reelsService }: any) {
        this.reelsService = reelsService;

        this.upload = this.upload.bind(this);
        this.getReels = this.getReels.bind(this);
    }


    async getReels(req: Request, res: Response) {
        try {

            const { data, error } = await this.reelsService.getReels();
            if (error) return res.status(400).send({ data, error: error });

            res.status(200).send({ data, error });
        } catch (error) {
            res.send(500).send({ data: null, error: error });
        }
    }

    async upload(req: Request, res: Response) {
        try {
            const payload: IUploadReelsPayload = req?.body;

            const { error: validationErr } = IUploadReelsValidator.validate(payload, { abortEarly: false });
            if (validationErr) return res.status(400).send({ data: null, error: validationErr });

            const { data, error } = await this.reelsService.upload(payload);
            if (error) return res.status(400).send({ data, error: error });

            res.status(200).send({ data, error });
        } catch (error) {
            res.send(500).send({ data: null, error: error });
        }
    }
}

export default ReelsController;