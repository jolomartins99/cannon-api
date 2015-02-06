      user: Joi.string().required().description('File user'),
    reply(render(request.pre.file)).created('/file/'+request.pre.file.id);
  description: 'Creates a new file model'
      user: Joi.string().description('File user'),
  description: 'Updates a file model'
    scope: ['admin']
      id: Joi.string().required().description('Id or user of the file we want to retrieve'),
  description: 'Gets the model of the file'
  description: 'Gets all the file models'
      id: Joi.string().required().description('Id of the user whose file we want to upload'),
    ).required().length(1)
    { method: 'user.get(params.id)', assign: 'user' },
    { method: 'file.uploadCV(payload)', assign: 'file' },
    { method: 'file.create(pre.file, params.id)', assign: 'fileInfo' }
  description: 'Uploads a file'
exports.uploadMe = {
    ).required().length(1)
    { method: 'file.uploadCV(payload)', assign: 'file' },
    { method: 'file.create(pre.file, auth.credentials.user.id)', assign: 'fileInfo' }
  description: 'Uploads a file'