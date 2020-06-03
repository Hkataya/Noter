import { getRelMany } from './Schema';

export default class Repository<T> {
  db: PouchDB.Database;

  relDB: PouchDB.RelDatabase;

  entityType: string;

  constructor(
    db: PouchDB.Database,
    relDB: PouchDB.RelDatabase,
    entityType: string
  ) {
    this.db = db;
    this.relDB = relDB;
    this.entityType = entityType;
  }

  createEntity(entityData: Omit<T, 'id'>) {
    return this.relDB.rel.save(this.entityType, entityData);
  }

  deleteEntity = (entityId: string) => {
    console.log('original id', entityId);
    return this.relDB.rel
      .findHasMany(getRelMany(this.entityType), this.entityType, entityId)
      .then(async subDocs => {
        Object.entries(subDocs).forEach(Field => {
          Field[1].forEach((doc: { id: PouchDB.Core.RemoveDocument }) => {
            this.relDB.rel.del(Field[0], { id: doc.id, rev: doc.rev });
          });
        });
        const entityData = await this.relDB.rel.find(this.entityType, entityId);
        console.log('fetche id', entityData);
        this.relDB.rel.del(this.entityType, entityData);
        return 1;
      })
      .catch(e => console.log(e));
  };

  updateEntity = (entityData: T) => {
    return this.relDB.rel.find(this.entityType, entityData.id).then(oldData => {
      const newData = oldData;
      newData.notes[0] = entityData;
      return this.relDB.rel.save(this.entityType, oldData.notes[0]);
    });
  };
}
