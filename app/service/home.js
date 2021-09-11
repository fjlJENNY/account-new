'use strict';

const Service = require('egg').Service;

class HomeService extends Service{
  async user(){
    const {ctx,app} = this;
    const QUERY_STR = 'id,name';
    let sql = `select ${QUERY_STR} from list`;
    try{
      const result = await app.mysql.query(sql);
      console.log(result);
      return result;
    }catch(err){
      console.log(err);
      return null;
    }
  }

  async addUser( name){
    const {ctx ,app} = this;
    try{
      const result = await app.mysql.insert('list',{name});
      console.log('add user success',result);
      return result;
    }catch (e) {
      console.log('add user fail',e);
      throw e;
     // return null;
    }
  }

  async updateUser(id,name){
    const {ctx , app} = this;
    try{
      let result = await app.mysql.update('list',{name},{
        where: {id}
      });
      console.log('update user success ',result);
      return result;
    }catch (e) {
      console.log('update user fail',e);
      return null;
    }
  }

  async deleteUser(id){
    const {ctx,app} = this;
    try{
      let result = await app.mysql.delete('list',{id});
    }catch(e){
      throw e;
    }
  }
}

module.exports = HomeService;
