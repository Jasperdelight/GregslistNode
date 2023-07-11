import { Auth0Provider } from "@bcwdev/auth0provider";
import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
  constructor () {
    super('api/cars')
    this.router
      // NOTE no auth required
      .get('', this.getCars)
      .get('/:carId', this.getCarById)

      .use(Auth0Provider.getAuthorizedUserInfo)
      // NOTE auth required

      .post('', this.createCar)
      .delete('/:carId', this.removeCar)
      .put('/:carId', this.updateCar)
  }

  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars()

      res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getCarById(req, res, next) {
    try {
      const carId = req.params.carId

      const car = await carsService.getCarById(carId)

      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async createCar(req, res, next) {
    try {
      const carData = req.body

      carData.creatorId = req.userInfo.id

      const car = await carsService.createCar(carData)

      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async removeCar(req, res, next) {
    try {

      const carId = req.params.carId

      const userId = req.userInfo.id

      await carsService.removeCar(carId, userId)

      res.send('Car was deleted!')

    } catch (error) {
      next(error)
    }
  }

  async updateCar(req, res, next) {
    try {

      const carId = req.params.carId

      const userId = req.userInfo.id

      const carData = req.body

      const updatedCar = await carsService.updateCar(carId, userId, carData)

      res.send(updatedCar)

    } catch (error) {
      next(error)
    }
  }
}