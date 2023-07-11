import { Auth0Provider } from "@bcwdev/auth0provider";
import { carsService } from "../services/CarsService.js";
import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";


export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getHouseById)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
  }




  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses()
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouseById(req, res, next) {
    try {
      const houseId = req.params.houseId

      const house = await housesService.getHouseById(houseId)
      res.send(house)

    } catch (error) {
      next(error)
    }
  }
  async createHouse(req, res, next) {
    try {
      const houseData = req.body
      houseData.creatorId = req.userInfo.id
      const house = await housesService.createHouse(houseData)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }





}