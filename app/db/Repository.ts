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

  deleteEntity(entityId: string) {
    /*
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
      */
    const generatedEntityId: string = this.relDB.rel.makeDocID({
      type: this.entityType,
      id: entityId
    });
    return this.db
      .get(generatedEntityId)
      .then(entity => this.db.remove(entity));
  }

  updateEntity(entityData: T) {
    return this.relDB.rel.save(this.entityType, entityData);
  }
}
