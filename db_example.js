'use strict';
/* eslint-disable space-before-function-paren */
/* eslint-disable array-bracket-spacing */

const mongoose = require(process.cwd() + '/node_modules/mongoose');
const { Schema, Types } = mongoose;


const SchemaChild = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  region: { type: String },
  terminal: { type: String },
  createDate: { type: Date },
});

exports.database = {


  schemas: [
    {
      name: 'moduleA',
      fields: {
        name: {
          type: {
            fiist: String,
            last: String,
          },
        },
        child: { type: SchemaChild },
        num: { type: Number, default: 0 },
        id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
        date: { type: Date },
      },
      options: { versionKey: false },
      addOns: schema => {
        const virtual = schema.virtual('fullname');
        virtual.get(function () {
          return this.name.first + ' ' + this.name.last;
        });
      },
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
