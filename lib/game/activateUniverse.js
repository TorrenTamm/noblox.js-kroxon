// Includes
const http = require('../util/http').func
const getGeneralToken = require('../util/getGeneralToken.js').func

// Args
exports.required = ['universeId']
exports.optional = ['jar']

// Docs
/**
 * Activate a universe.
 * @category Game
 * @alias activateUniverse
 * @param {number} universeId - The id of the universe.
 * @returns {Promise<void>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.activateUniverse(119284728)
**/

// Define
function activateGame (jar, token, universeId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//develop.roblox.com/v1/universes/${universeId}/activate`,
      options: {
        method: 'POST',
        jar: jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true
      }
    }
    return http(httpOpt)
      .then(function (res) {
        if (res.statusCode === 200) {
          resolve()
        } else {
          const body = JSON.parse(res.body) || {}
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            })
            reject(new Error(`${res.statusCode} ${errors.join(', ')}`))
          }
        }
      })
  })
}

exports.func = function (args) {
  const jar = args.jar
  return getGeneralToken({ jar: jar })
    .then(function (xcsrf) {
      return activateGame(jar, xcsrf, args.universeId)
    })
}
