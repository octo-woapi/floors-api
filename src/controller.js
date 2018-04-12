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
      ctx.throw(404, 'Floor not found');
    }
    ctx.status = 200;
    ctx.body = floor;
  };

module.exports = repository => ({
  listFloors: listFloors(repository),
  getFloor: getFloor(repository),
});
