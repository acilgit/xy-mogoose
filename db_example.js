'use strict';

const mongoose = require(process.cwd() + '/node_modules/mongoose');
const { Schema, Types } = mongoose;

exports.database = {

  schemas: [
    {
      name: 'moduleA',
      fields: {
        name: { type: String },
        num: { type: Number, default: 0 },
        id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
        date: { type: Date },
      },
      options: { versionKey: false },
    },
    {
      name: 'moduleB',
      fields: {
        name: { type: String },
        num: { type: Number, default: 0 },
        id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
        date: { type: Date },
      },
      options: { versionKey: false },
    },
  ],

};
