import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CarsService {



  async getCars() {
    const cars = await dbContext.Cars.find()

    return cars
  }

  async getCarById(carId) {
    const car = await dbContext.Cars.findById(carId)

    if (!car) {
      throw new BadRequest(`No car found with this id: ${carId}`)
    }

    return car
  }

  async createCar(carData) {
    const car = await dbContext.Cars.create(carData)

    return car
  }

  async removeCar(carId, userId) {
    // await dbContext.Cars.findByIdAndDelete(carId)

    const carToDelete = await this.getCarById(carId)

    if (carToDelete.creatorId.toString() != userId) {
      throw new Forbidden(`YOU ARE NOT THE OWNER OF THE ${carToDelete.make} ${carToDelete.model}`)
    }

    await carToDelete.remove()

  }

  async updateCar(carId, userId, carData) {

    const originalCar = await this.getCarById(carId)

    if (originalCar.creatorId.toString() != userId) {
      throw new Forbidden(`YOU ARE NOT THE OWNER OF THE ${originalCar.make} ${originalCar.model}`)
    }

    originalCar.make = carData.make || originalCar.make
    originalCar.model = carData.model || originalCar.model
    originalCar.price = carData.price || originalCar.price
    originalCar.color = carData.color || originalCar.color
    originalCar.ownedByGrandma = carData.ownedByGrandma != null ? carData.ownedByGrandma : originalCar.ownedByGrandma

    await originalCar.save()

    return originalCar

  }
}

export const carsService = new CarsService()