'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 登录注册
  router.post('/api/user/register',controller.user.register);
  router.post("/api/user/login",controller.user.login); // json(username,password)


  // token
  router.post("/api/user/test",controller.user.test);
  // 查
  router.get('/api/user/list',controller.user.userList)
  router.get("/api/user/getUserByName",controller.user.getUserByName); // ?name=xx
  // 改
  router.put('/api/user/update',controller.user.updateUser);
  // 删
  router.delete('/api/user/delete',controller.user.deleteUser);


  // type
  router.post('/api/type/add',controller.type.addType)
  router.delete("/api/type/delete",controller.type.delType)
  router.get("/api/type/list",controller.type.typeList)
  router.put("/api/type/update",controller.type.editType)

  // bill
  router.post('/api/bill/add',controller.bill.addBill)
  router.delete("/api/bill/delete",controller.bill.delBill)
  router.get("/api/bill/list",controller.bill.billList)
  router.put("/api/bill/update",controller.bill.editBill)
};
