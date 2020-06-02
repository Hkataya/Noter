import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import rel from 'relational-pouch';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import debug from 'pouchdb-debug';

import { Schemas } from './Schema';

PouchDB.plugin(find).plugin(rel);

if (process.env.NODE_ENV !== 'production') {
  PouchDB.plugin(debug);
  PouchDB.debug.enable('*');
}

// Initialize DB
const dbName = 'mydb';
const remoteCouch = `${process.env.COUCHDB_URL}${dbName}`;
export const db = new PouchDB('mydb');

// Fetch all documents from DB (including deleted docs)
db.changes({
  since: 0,
  include_docs: true
})
  .then(changes => {
    return console.log(changes);
  })
  .catch(e => console.log(e));

// Sync PouchDB with Online CouchDB
db.sync(remoteCouch, { live: true })
  .on('complete', () => {
    console.log('success sync');
  })
  .on('error', err => {
    console.log('Error sync');
    console.log(err);
  });

// Define Relational Schema
export const relDB = db.setSchema(Object.values(Schemas));
