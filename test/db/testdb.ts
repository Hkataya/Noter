import PouchDB from 'pouchdb-memory';
import find from 'pouchdb-find';
import rel from 'relational-pouch';
import { Schemas } from '../../app/db/Schema';

PouchDB.plugin(find).plugin(rel);

export const testdb = new PouchDB('mydb');

export const testrelDB = testdb.setSchema(Object.values(Schemas));
