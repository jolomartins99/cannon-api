const Joi = require('joi')
const render = require('../../views/redeem')
const renderAchievement = require('../../views/achievement')

exports = module.exports

exports.create = {
  tags: ['api', 'redeem'],
  auth: {
    strategies: ['default'],
    scope: ['admin']
  },
  validate: {
    payload: {
      id: Joi.string().required().description('Redeem Code id.'),
      achievement: Joi.string().required().description('Achievement you want to redeem.'),
      // entries: Joi.number().required().description('Number of entries this code can be applied to.'),
      expires: Joi.date().description('Date of redeem code expiration.'),
      user: Joi.string().required().description('User id.')
    }
  },
  pre: [
    { method: 'redeem.create(payload)', assign: 'redeem' }
  ],
  handler: function (request, reply) {
    reply(render(request.pre.redeem)).created('/redeem/' + request.pre.redeem.id)
  },
  description: 'Creates a new Redeem Code.'
}

exports.get = {
  tags: ['api', 'redeem'],
  auth: {
    strategies: ['default'],
    scope: ['user', 'company', 'team', 'admin']
  },
  validate: {
    params: {
      id: Joi.string().required().description('Id of the redeem code we want to retrieve')
    }
  },
  pre: [
    { method: 'redeem.get(params.id)', assign: 'redeem' },
    { method: 'achievement.get(pre.redeem.achievement)', assign: 'achievement' },
    { method: 'session.get(pre.achievement.session)', assign: 'session', failAction: 'ignore' },
    { method: 'session.surveyNotNeeded(pre.session)' },
    { method: 'achievement.addUser(pre.redeem.achievement, auth.credentials.user.id)', assign: 'achievement' },
    { method: 'user.updatePoints(auth.credentials.user.id, pre.achievement.value)' },
    { method: 'redeem.remove(params.id, auth.credentials.user.id, pre.achievement)' }
  ],
  handler: function (request, reply) {
    reply({
      success: true,
      achievement: renderAchievement(request.pre.achievement)
    })
  },
  description: 'Gets a redeem code'
}

exports.getMe = {
  tags: ['api', 'redeem'],
  auth: {
    strategies: ['default'],
    scope: ['user', 'company', 'team', 'admin']
  },
  pre: [
    { method: 'redeem.getMe(auth.credentials.user.id)', assign: 'redeemCodes' }
  ],
  handler: function (request, reply) {
    reply(render(request.pre.redeemCodes))
  },
  description: 'Gets all my redeem codes'
}

exports.remove = {
  tags: ['api', 'redeem'],
  auth: {
    strategies: ['default'],
    scope: ['admin']
  },
  validate: {
    params: {
      id: Joi.string().required().description('Id of the redeem code we want to remove')
    }
  },
  pre: [
    { method: 'redeem.remove(params.id)', assign: 'redeem' }
  ],
  handler: function (request, reply) {
    reply(request.pre.redeem)
  },
  description: 'Removes a redeem code'
}
