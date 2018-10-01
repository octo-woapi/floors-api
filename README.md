# OCTO Floors API

A simple API meant to expose OCTO's building floors and areas.
This API is composed of 2 resources: floor and area. There are
4 endpoints.

List floors
```
GET /v1/floors
```

Get a floor by ID
```
GET /v1/floors/{id}
```

List floor areas
```
GET /v1/floors/{id}/areas
```

Get a floor area by ID
```
GET /v1/floors/{floorId}/areas/{areaId}
```

## Installation

`yarn` or `npm install`

## Running

`yarn start`

## Testing

Full testing: `yarn test`
Unit testing: `yarn test:unit` eventually suffixed with `:watch`
API testing: `yarn test:api` eventually suffixed with `:watch`

## Contributing

The code architecture is quite simple. `bin/start` is the entrypoint
script. Then, in the `src` folder, `app.js` is the main file. It defines
an HTTP server with a router. It matches the above routes with
controller methods from `controller.js`. This controller calls the
repository (`repository.js`), sets the appropriate status code and body
and returns an HTTP response.
