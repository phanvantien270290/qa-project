/**
 * @owner BlueSky
 * @description Define routers for Label module
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Router, Application } from 'express';
import LabelController from "../controllers/label.controller";
import LabelService from '../services/label.service';
import LabelRepository from '../repositories/label.repository';

export default class LabelRouter {
    app: Application;
    router: Router;
    controller: LabelController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new LabelController(new LabelService(new LabelRepository()));
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/label', this.router);
    }

    onRegisterRouting() {
        // Unlike app.param(), router.param() does not accept an array of route parameters.
        // router.param('id', function (req, res, next, id) {
        //     req.labelItem = {};
        //     next();
        // })

        this.router.get('/find', this.controller.find.bind(this.controller));
        this.router.post('/save', this.controller.save.bind(this.controller));
        this.router.put('/update', this.controller.save.bind(this.controller));
        this.router.delete('/delete', this.controller.remove.bind(this.controller));
        this.router.get('/retrieve', this.controller.retrieve.bind(this.controller));
        this.router.post('/print', this.controller.print.bind(this.controller));
        this.router.post('/apiprint', this.controller.authenticate.bind(this.controller), this.controller.apiPrint.bind(this.controller));
    }
}
