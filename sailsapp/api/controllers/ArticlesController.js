/**
 * ArticlesController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
    list1: async function(req, res){
        var allArticles = await Articles.allArticles();
        res.send(allArticles);
    }, 

	list:function(req, res){
        Articles.find({}).exec(function(err, articlesData){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view('articles/list', {"articles":articlesData});
            // return res.ok(articles);
        });
    },
    
    add: function(req, res){
        res.view('articles/add');
    },

    create:function(req, res){
        var title = req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);
        var body = req.body.body;

        Articles.create({title:title, body:body}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect('/articles/list');
        });
    },

    delete: function(req, res){
        console.log('data', req.params.id);
        Articles.destroy({_id:req.params.id}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect('/articles/list');
        });
        return false;
    },

    edit: function(req, res){
        Articles.findOne({_id:req.params.id}).exec(function(err, articleData){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view('articles/edit', {'article': articleData});
        });
        return false;
    },

    update: function(req, res){
        var title = req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);
        var body = req.body.body;
        Articles.update({id: req.params.id},{title:title, body:body}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect('/articles/list');
        });
        return false;
    }
};