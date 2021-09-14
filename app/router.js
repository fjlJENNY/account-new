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
  router.post('/api/user/register',controller.user.register);
  router.get("/api/user/getUser",controller.user.getUserByName); // ?name=xx

  router.post("/api/user/login",controller.user.login); // json(username,password)

  router.post("/api/user/test",controller.user.test);
};
