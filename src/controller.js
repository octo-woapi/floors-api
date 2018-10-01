const listFloors = repository =>
  async (ctx) => {
    const floors = await repository.findFloors();
    ctx.status = 200;
    ctx.body = floors;
  };

const getFloor = repository =>
  async (ctx) => {
    const floor = await repository.findFloorById(ctx.params.id);
    if (!floor) {
      // Throws an error
      ctx.throw(404, 'Floor not found');
    }
    ctx.status = 200;
    ctx.body = floor;
  };

const listFloorAreas = repository =>
  async (ctx) => {
    const areas = await repository.findFloorAreas(ctx.params.id);
    if (!areas) {
      // Throws an error
      ctx.throw(404, 'Floor not found');
    }
    ctx.status = 200;
    ctx.body = areas;
  };

const getFloorArea = repository =>
  async (ctx) => {
    const area = await repository.findFloorAreaById(
      ctx.params.floorId,
      ctx.params.areaId,
    );
    if (!area) {
      ctx.throw(404, 'Floor or area not found');
    }
    ctx.status = 200;
    ctx.body = area;
  };

module.exports = repository => ({
  listFloors: listFloors(repository),
  getFloor: getFloor(repository),
  listFloorAreas: listFloorAreas(repository),
  getFloorArea: getFloorArea(repository),
});
