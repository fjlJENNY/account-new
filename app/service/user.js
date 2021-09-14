// service/user.js
'use strict';

const Service = require("egg").Service;


class UserService extends Service{
  // 判断用户是否已经存在
  async getUserByName(username){
    const {ctx,app} = this;
    try{
      const result = await app.mysql.get('user',{username});
      return result;
    }catch (e) {
      console.log("getUserByName  error ::: ",e);
      throw e;
    }
  }


  // 用户注册
  async register({username,password,signature,avatar}){
    const {ctx,app} = this;
    //,createTime:new Date().getTime() || 失败
    try{
      const result = await app.mysql.insert('user',{username,password,signature,avatar,createTime:new Date()});
      return result;
    }catch(e){
      console.log("register error :: ",e);
      throw e;
    }
  }


}

module.exports = UserService;
