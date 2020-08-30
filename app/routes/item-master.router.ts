/**
 * @owner BlueSky
 * @description Define routers for ItemMaster module
 * @since 1.0.0
 * @date Aug 10, 2020
 * @contributors
 *     Tien Phan <tien.phan@ccintegration.com>
 */
import { Router, Application } from 'express';
import ItemMasterController from "../controllers/item-master.controller";
import ItemMasterService from '../services/item-master.service';
import ItemMasterRepository from '../repositories/item-master.repository';

export default class ItemMasterRouter {
    app: Application;
    router: Router;
    controller: ItemMasterController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new ItemMasterController(new ItemMasterService(new ItemMasterRepository))
    }

    onInit() {
        this.onRegisterRouting();
        this.app.use('/api/item', this.router);
    }

    onRegisterRouting() {
        this.router.get('/combobox', this.controller.getDataset.bind(this.controller));
    }
}
