/**
 * @owner BlueSky
 * @description Define routers for Printer module
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *     Tien Phan <tien.phan@ccintegration.com>
 */
import { Router, Application } from 'express';
import PrinterController from "../controllers/printer.controller";
import PrinterService from '../services/printer.service';
import PrinterRepository from '../repositories/printer.repository';

export default class PrinterRouter {
    app: Application;
    router: Router;
    controller: PrinterController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new PrinterController(new PrinterService(new PrinterRepository()));
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/printer', this.router);
    }

    onRegisterRouting() {
        this.router.get('/find', this.controller.getListPrinter.bind(this.controller));
        this.router.get('/getone', this.controller.getPrinter.bind(this.controller));
        this.router.get('/combobox', this.controller.getDataset.bind(this.controller));
        this.router.post('/create', this.controller.createPrinter.bind(this.controller));
        this.router.put('/update', this.controller.updatePrinter.bind(this.controller));
        this.router.delete('/delete/:_id', this.controller.deleteOnePrinter.bind(this.controller));
    }
}
