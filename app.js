'use strict';

const mongoose = require('./lib');
const fs = require('fs');

module.exports = app => {

  console.log('[mongoose] app active:', app.config.mongoose.app);
  if (app.config.mongoose.app) {
    const dbFile = app.config.mongoose.db;
    const dbFiles = app.config.mongoose.dbPath;
    if (dbFiles) {
      let database = [];
      let path;
      if (dbFiles.substring(0, 1) === '.') {
        path = process.cwd() + '/' + app.config.mongoose.dbPath;
      } else {
        path = app.config.mongoose.dbPath;
      }
      const endSlash = path.endsWith('/') ? '' : '/';
      const files = fs.readdirSync(path);
      for (let i = 0; i < files.length; i++) {
        const file = path + endSlash + files[i];
        database = database.concat(require(file).database);
      }
      mongoose(app, database);
    } else if (dbFile) {
      const database = [];
      if (dbFile.substring(0, 1) === '.') {
        database.push(require(process.cwd() + '/' + app.config.mongoose.db).database);
      } else {
        database.push(require(app.config.mongoose.db).database);
      }
      mongoose(app, database);
    } else {
      console.warn('[xy-mongoose] no databas file for config.mongoose.db:' + dbFile);
    }
  }
};
