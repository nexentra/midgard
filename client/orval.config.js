/** @type {import('orval').OrvalConfig} */
module.exports = {
  midgardApi: {
    output: {
      target: 'types/swagger.ts',
      schemas: 'types/model',
      client: 'react-query',
      mock: true,
    },
    input: {
      target: '../docs/swagger.json',
    },
  },
}
