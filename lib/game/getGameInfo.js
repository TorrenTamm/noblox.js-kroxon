// Includes
const http = require('../util/http').func

// Args
exports.required = ['universeId']

// Docs
/**
 * Get a list of games' detail.
 * @category Game
 * @alias getGameInfo
 * @param {number | Array} universeId | universeIds - The id of the universe OR a list of universe ids, cannot exceed 100 IDs.
 * @returns {Promise<Array[GameDetailResponse]>}
 * @example const noblox = require("noblox.js")
 * const gameInfo = await noblox.getGameInfo(1)
**/

function getGameInfo (universeId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
	  url: `//games.roblox.com/v1/games?universeIds=${universeId}`,
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
  return getGameInfo(args.universeId)
}