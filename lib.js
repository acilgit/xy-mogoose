'use strict';

const assert = require('assert');
const mongoose = require('mongoose');

module.exports = (app, database) => {
  console.log('[xy-mongoose] starting...');

  app.addSingleton('mongoose', createOneClient);

  console.log('[xy-mongoose] database:', database);
  const schemas = database.schemas;

  if (schemas && schemas.length) {
    for (const { name, fields, options } of schemas) {
      const s = define(name, fields, options || {});
      if (!s) console.warn(`[xy-mongoose] database "${name}" failed: fields:${fields}, options:${options}`);
    }
    console.log('[xy-mongoose] database init success.');
  }

};

// 创建数据库
function createOneClient(config, app) {
  assert(config.url,
    `[xy-mongoose] 'url: ${config.url}' is required on config`);
  const { url, options } = config;
  app.coreLogger.info('[xy-mongoose] connecting[options] /%s', config.options);
  // const client = new mongoose(name, options);

  mongoose.connect(url, options || {});
  app.mongodb = mongoose.models;

  // app.mongodb.define = define;
  app.beforeStart(function* () {
    app.coreLogger.info('[xy-mongoose] instance status OK.');
  });
  return mongoose;
}

// 建表
function define(collectionName, fields, options) {
  if (!collectionName || !fields || !Object.keys(fields).length) {
    console.log('collectionName and field are required. collectionName:', collectionName, 'fields:', fields);
    return null;
  }

  const { Schema, models, model } = mongoose;

  // 把首字母变大写
  const name = collectionName.substring(0, 1).toUpperCase() + collectionName.substring(1);

  if (models && models[name]) return models[name];

  const SchemaInstance = new Schema(fields, options);

  return model(name, SchemaInstance);

}
