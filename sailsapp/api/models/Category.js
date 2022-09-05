/**
 * Category.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  
  /**
   * `CategoryController.show()`
   */
  show: function (req, res) {
    Category.find().exec(function (err, category) {
      return res.json(category);
    });
  },

  /**
 * `CategoryController.edit()`
 */
  edit: function (req, res) {
    let query;
    let data;
    query = { "id": req.param('categoryId') }
    // to convert category to first letter capital, rest of them are small letters
    data = { name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1) }
    Category.update(query, data).fetch().exec(function (err, category) {
      categoryName = data.name;
      return res.json(category)
    })
  },

  /**
   * `CategoryController.delete()`
   */
  delete: function (req, res) {
    let query;
    query = { "id": req.param('categoryId') }
    Category.destroy(query).fetch().exec(function (err, category) {
      if (err) return (err);
      return res.json(category)
    })
  },

};

