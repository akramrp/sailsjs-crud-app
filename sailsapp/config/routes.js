/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'articles/homepage' },

  // article route
  'GET /articles/list': 'Articles.list',
  'GET /articles/add': 'Articles.add',
  'GET /articles/edit/:id': 'ArticlesController.edit',
  'GET /articles/delete/:id': 'ArticlesController.delete',
  'POST /articles/update/:id': 'ArticlesController.update',
  'POST /articles/create': 'ArticlesController.create',

  // for testing api
  'GET /articles/list1': 'Articles.list1',
  'GET /test': {
    controller: 'TestController',
    action: 'show',
    name: 'show',
    locals: {
      title: 'show',
    },
  },


  // ========================= user route =========================
  'POST /user/registration': {
    controller: 'UsersController',
    action: 'registration',
    name: 'registration',
    locals: {
      title: 'Registration',
    },
  },

  'POST /user/login': {
    controller: 'UsersController',
    action: 'login',
    name: 'login',
    locals: {
      title: 'Login',
    },
  },

  'GET /user/list/:id?': {
    controller: 'UsersController',
    action: 'list',
    name: 'list',
    locals: {
      title: 'List',
    },
  },

  'POST /user/single': {
    controller: 'UsersController',
    action: 'single',
    name: 'single',
    locals: {
      title: 'Single',
    },
  },

  'PATCH /user/update/:id': {
    controller: 'UsersController',
    action: 'update',
    name: 'update',
    locals: {
      title: 'Update',
    },
  },

  'DELETE /user/delete/:id': {
    controller: 'UsersController',
    action: 'delete',
    name: 'delete',
    locals: {
      title: 'Delete',
    },
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
