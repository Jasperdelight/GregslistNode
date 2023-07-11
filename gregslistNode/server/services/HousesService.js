import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {

  async getHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)

    if (!house) {
      throw new BadRequest('no house found with that id')
    }
    return house
  }
  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)
    return house
  }

  async removeHouse(houseId, userId) {
    const houseToRemove = await this.getHouseById(houseId)
    if (houseToRemove.creatorId.toString() != userId) {
      throw new Forbidden('No Permission')
    }
    await houseToRemove.remove()
  }


  async updateHouse(houseId, userId, houseData) {
    const ogHouse = await this.getHouseById(houseId)
    if (ogHouse.creatorId.toString() != userId) {
      throw new Forbidden('ACCESS DENIED')
    }

    ogHouse.bedrooms = houseData.bedrooms || ogHouse.bedrooms
    ogHouse.bathrooms = houseData.bathrooms || ogHouse.bathrooms
    ogHouse.price = houseData.price || ogHouse.price
    ogHouse.year = houseData.year || ogHouse.year

    await ogHouse.save()
    return ogHouse
  }

}

export const housesService = new HousesService()