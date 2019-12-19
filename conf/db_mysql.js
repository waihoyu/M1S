/*
 *@description: 环境参数配置  数据库
 *@author: Wai HoYu
 *@date: 2019-09-18 13:01:09
 *@version: V1.0.5
 */


const env = process.env.NODE_ENV //环境参数

//配置
let MYSQL_CONF = {};
let REDIS_CONF = {};

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
            host: 'localhost',
            user: 'root',
            password: 'rootroot',
            port: '3306',
            database: 'myblog'
        },
        REDIS_CONF = {
            port: 6379,
            host: '127.0.0.1'
        }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}