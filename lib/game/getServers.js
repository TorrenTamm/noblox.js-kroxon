// Includes
const http = require('../util/http').func

// Args
exports.required = ['placeId']
exports.optional = ['serverType', 'sortOrder', 'limit']

// Docs
/**
 * Get the list of active game servers.
 * @category Game
 * @alias getServers
 * @param {number} placeId - The id of the place.
 * @param {ServerType=} serverType - The type of the servers we getting the list for.
 * @param {SortOrder=} sortOrder - The order to sort servers in.
 * @param {Limit=} limit - The max number of servers to return.
 * @returns {Promise<GameServerResponse>}
 * @example const noblox = require("noblox.js")
 * cost servers = await noblox.getServers(1)
**/

function getServers (placeId, serverType, sortOrder, limit) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
	  url: `//games.roblox.com/v1/games/${placeId}/servers/${serverType}?limit=${limit}&sortOrder=${sortOrder}`,
	  options: {
	    resolveWithFullResponse: true,
	    method: 'GET'
	  }
    }
    return http(httpOpt)
	  .then(function (res) {
	    if (res.statusCode === 200) {
		  resolve(JSON.parse(res.body))
	    } else {
	      const body = res.body || {}
		  if (body.errors && body.errors.length > 0) {
		    const errors = body.errors.map((e) => {
			  return e.message
		    })
		    reject(new Error(`${res.statusCode} ${errors.join(", ")}`))
		  } else {
		    reject(new Error(`${res.statusCode} An error has occured`))
		  }
	    }
	  })
  })
}

// Define
exports.func = function (args) {
  const serverType = args.serverType || 'Public'
  const sortOrder = args.sortOrder || 'Asc'
  const limit = args.limit || 25
  return getServers(args.placeId, serverType, sortOrder, limit)
}
