'use strict';

const assert = require('assert');
const mongoose = require('mongoose');

module.exports = (app, database) => {
  console.log('[xy-mongoose] starting...');

  app.addSingleton('mongoose', createOneClient);

  let schemas = [];
  for (let i = 0; i < database.length; i++) {
    const db = database[i];
    schemas = schemas.concat(db.schemas);
  }
  const schemasNames = [];

  if (schemas && schemas.length) {
    for (const { name, fields, options = {}, addOns } of schemas) {
      schemasNames.push(name);
      const s = define({ name, fields, options, addOns });
      if (!s) console.warn(`[xy-mongoose] database "${name}" failed: fields:${fields}, options:${options}`);
    }
  }
  console.log('[xy-mongoose] database:', schemasNames);
  console.log('[xy-mongoose] database init success.');

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
  app.mongodb.ObjectId = mongoose.Types.ObjectId;

  // app.mongodb.define = define;
  app.beforeStart(function* () {
    app.coreLogger.info('[xy-mongoose] instance status OK.');
  });
  return mongoose;
}

// 建表
function define({ name: collectionName, fields, options, addOns }) {
  if (!collectionName || !fields || !Object.keys(fields).length) {
    console.log('collectionName and field are required. collectionName:', collectionName, 'fields:', fields);
    return null;
  }

  const { Schema, models, model } = mongoose;

  // 把首字母变大写
  const name = collectionName.substring(0, 1).toUpperCase() + collectionName.substring(1);

  if (models && models[name]) return models[name];

  const SchemaInstance = new Schema(fields, options);

  if (addOns) {
    addOns(SchemaInstance, this);
  }

  return model(name, SchemaInstance);

}
