/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  show: async function(req, res){
    req.session.name = 'akram'
    req.session.sid = '123'

      let data = {
        "testData1" : 'config > custom.js => mailgunDomain: '+ sails.config.custom.mailgunDomain,
        "testData2" : 'config > custom.js =>  jwt_secret: '+ sails.config.custom.jwt_secret,
        "testData3" : await sails.helpers.formatWelcomeMessage('Bubba'),
        'session' : `req.session: => ${req.session}`,
        'key': ' key: '+ Object.keys(req.session),
        'value': ' value: '+ req.session.name +', '+ req.session.sid,

        'constants-gender' : 'config > constants.js =>  gender Obj : ' + 'keys: '+Object.keys(sails.config.constants.gender)+' , values: '+Object.values(sails.config.constants.gender),
        'constants-appointment' : 'config > constants.js =>  appointmentType Obj : ' + 'keys: '+Object.keys(sails.config.constants.appointmentType)+' , values: '+Object.values(sails.config.constants.appointmentType),
      }
      res.view('pages/test', {'data': data});
  },

};
