/**
* CategoryController
*
* @description :: Server-side actions for handling incoming requests.
* @help :: See https://sailsjs.com/docs/concepts/actions
*/
module.exports = {
    /**
    * `CategoryController.create()`
    */
    create: function (req, res) {
        let data;
        // to convert category name's first letter capital
        data = { name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1) }
        Category.create(data).fetch().exec(function (err, category) {
            if (err) return (err);
            return res.json(category);
        })
    },
}