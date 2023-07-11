import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

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

}

export const housesService = new HousesService()