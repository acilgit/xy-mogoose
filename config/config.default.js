'use strict';

/**
 * xy-mongoose default config
 * @member Config#xyMongoose
 * @property {String} SOME_KEY - some description
 */
exports.mongoose = {
    default: {
        url: null,  // mongodb路径
        options: null,  
    },
    db: './db_example', // Schema和Model文件 
    app: false,     // 是否使用
    agent: false,
    schema: false,
};
