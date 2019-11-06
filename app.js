'use strict';

const mongoose = require('./lib');

module.exports = app => {

  console.log('[mongoose] app active:', app.config.mongoose.app);
  if (app.config.mongoose.app) {
    const dbFile = app.config.mongoose.db;
    if (dbFile) {
      let database;
      if (dbFile.substring(0, 1) === '.') {
        database = require(process.cwd() + '/' + app.config.mongoose.db).database;
      } else {
        database = require(app.config.mongoose.db).database;
      }
      mongoose(app, database);
    } else {
      console.warn('[xy-mongoose] no databas file for config.mongoose.db:' + dbFile);
    }
  }
};
