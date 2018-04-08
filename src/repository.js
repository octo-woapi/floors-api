const fs = require('fs');

module.exports = (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const floors = JSON.parse(data);
  return {
    async findFloors() {
      return floors;
    },
    async findFloorById(id) {
      return floors.find(f => f.id === id);
    },
    async findFloorAreas(floorId) {
      const floor = floors.find(f => f.id === floorId);
      return floor ? floor.areas : undefined;
    },
    async findFloorAreaById(floorId, areaId) {
      const floor = floors.find(f => f.id === floorId);
      if (floor) {
        return floor.areas.find(a => a.id === areaId);
      }
      return undefined;
    },
  };
};
