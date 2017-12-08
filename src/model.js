const fs = require('fs');

const utils = require('./utils');

class Model {
  async importData(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) return reject(err);

        this._floors = JSON.parse(data);
        resolve();
      });
    });
  }

  async floors() {
    return this._floors;
  }

  async floor(id) {
    return utils.arrayFindAsync(this._floors, floor => floor._id === id);
  }

  async areas(floorId) {
    const floor = await this.floor(floorId);
    return floor.areas;
  }

  async area(floorId, areaId) {
    const areas = await this.areas(floorId);
    return utils.arrayFindAsync(areas, area => area._id === areaId);
  }
}

/**
 * Create a new model.
 * @return {Model} A promise resolving to a new model.
 */
const createModel = path => new Model(path);

module.exports = createModel;
