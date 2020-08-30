/**
 * @owner BlueSky
 * @description Define routers for Label Template module
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *     Tien Phan <tien.phan@ccintegration.com>
 */
import { Router, Application } from 'express';
import LabelTemplateController from "../controllers/label-template.controller";
import LabelTemplateService from '../services/label-template.service';
import LabelTemplateRepository from '../repositories/label-template.repository';

export default class PrinterRouter {
    app: Application;
    router: Router;
    controller: LabelTemplateController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new LabelTemplateController(new LabelTemplateService(new LabelTemplateRepository()));
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/label/template', this.router);
    }

    onRegisterRouting() {
        this.router.get('/find', this.controller.find.bind(this.controller));
        this.router.get('/getone', this.controller.retrieve.bind(this.controller));
        this.router.post('/create', this.controller.create.bind(this.controller));
        this.router.put('/update', this.controller.updateOne.bind(this.controller));
        this.router.delete('/delete/:_id', this.controller.deleteOne.bind(this.controller));
    }
}
