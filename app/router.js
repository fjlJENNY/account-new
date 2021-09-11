'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user/:id',controller.home.user);
  router.post('/add',controller.home.add);
  router.post('/addUser',controller.home.addUser);
  router.post('/updateUser',controller.home.updateUser);
  router.delete('/deleteUser',controller.home.deleteUser);

  // user 表
  router.post('/register',controller.user.register);
};
