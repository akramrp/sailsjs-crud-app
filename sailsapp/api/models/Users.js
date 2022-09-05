/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


const bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    password: { type: "string" },

    // brand :       { type : 'string', size : 25 },
    // description : {  type: 'text',  defaultsTo : '' },
    // price :       { type : 'float', required : true  }, 
    // seats :       { type : 'integer' },   
    // sell_date :   { type : 'datetime' },
    // has_cooler :  {  type : 'boolean', columnName : 'cooler' },
    // chassis_no :  { unique : true, type : 'string' },
    // color :       { type : 'string', enum: ['white', 'red', 'black'] }
  },

  // Here we encrypt password before creating a User
  beforeCreate(values, next) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        sails.log.error(err);
        return next();
      }

      bcrypt.hash(values.password, salt, (err, hash) => {
        if (err) {
          sails.log.error(err);
          return next();
        }
        values.encryptedPassword = hash; // Here is our encrypted password
        return next();
      });
    });
  },

  comparePassword(password, encryptedPassword) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, encryptedPassword, (err, match) => {
        if (err) {
          sails.log.error(err);
          return reject("Something went wrong!");
        }
        if (match) return resolve();
        else return reject("Mismatch passwords");
      });
    });
  },

  allUser: async function (req, res) {
    // var data = await {'name':'test', "phone":9876543299,"email":'aaa@gmail.com'} // return data;
    return await Users.find({});
  },

  registration: async function (getObj) {
    try {
      let checkUser = await Users.findOne({ "email": getObj.email })
      if (!checkUser) {
        // return await Users.create(getObj).fetch();
        delete getObj.confirmPassword
        delete getObj['confirmPassword']
        getObj.password = bcrypt.hashSync(getObj.password, 10); // hash the user-password
        sails.log('User Register successfully log');
        return await Users.create(getObj).fetch();
        // const user = await Users.create(getObj).fetch();
        // const genearteToken = { token: jwToken.issue({ id: user.id }) };   // payload is { id: user.id}
        // return genearteToken
      }
      else {
        return {
          "status": false,
          "data": [],
          "message": "Account already existed. Go to login",
          "error": "Account already existed. Go to login"
        }
      }
    }
    catch (err) {
      return err;
    }
  },

  login: async function (getObj) {
    try {
      let loginUserObj = {};
      var email = getObj.email;
      var password = getObj.password;
      var userData = await Users.findOne({ "email": email });
      if(userData){
        const checkHashPass = Users.comparePassword(password, userData.password)
        if (checkHashPass){
          delete userData.password
          delete userData.encryptedPassword

          sails.log('bcrypt: user password matched')
          loginUserObj.token = { token: jwToken.issue({ id: userData.id }) };   // payload is { id: user.id}
          loginUserObj.userData = userData;
          
          return { 
            "status": true,
            "data": loginUserObj,
            "message": "success",
          }
        }
        else{
          // if (!user) return res.notFound();
          return { 
            "status": false,
            "data": [],
            "message": "Password not match.",
            "error": "Password not match."
          }
        }
      }
      else{
        return { 
          "status": false,
          "data": [],
          "message": "Account not found.",
          "error": "Account not found."
        }
      }
    }
    catch (err) {
      return err;
    }
  },

  single: async (getObj) => {
    // if (!data) return res.notFound();
    return await Users.findOne({ "_id": getObj.id })
  },

  updateUser: async (getId, getObj) => {
    return await Users.update({ "_id": getId }, getObj);
  },

  delete: async (getID) => {
    return await Users.destroy({ "_id": getID });
  },


};

