// service/user.js
'use strict';

const Service = require("egg").Service;

const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';


class UserService extends Service{

  // 通过 name 确定 user
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

  // 通过 id 确定 user
  async getUserById(id){
    const {ctx,app} = this;
    try{
      const sql = `select * from user where id = "${id}"`
      const result = await app.mysql.query(sql);
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

  async updateUser({
       id,
       signature,
       avatar = defaultAvatar
  }){
    const {ctx , app} = this;
    try{
      let result = await app.mysql.update('user',{
        signature,avatar
      },{
        where: {id}
      });
      console.log('update user success ',result);
      return result;
    }catch (e) {
      console.log('update user fail',e);
      return null;
    }
  }

  // 列表
  async userList(){
    const {ctx,app} = this;
    const QUERY_STR = '*';
    let sql = `select ${QUERY_STR} from user`;
    try{
      const result = await app.mysql.query(sql);
      console.log(result);
      return result;
    }catch(err){
      console.log(err);
      return null;
    }
  }






  // 删除用户
  async deleteUser(id){
    const {ctx,app} = this;
    try{
      let result = await app.mysql.delete('user',{id});
    }catch(e){
      throw e;
    }
  }
}

module.exports = UserService;
