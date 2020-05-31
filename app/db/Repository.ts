type DefaultModel = {
  id?: string;
};

export default class Repository<T extends DefaultModel> {
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

  createEntity = (entityData: T) => {
    return this.relDB.rel.save(this.entityType, entityData);
  };

  deleteEntity = (entityId: T['id']) => {
    const generatedEntityId: string = this.relDB.rel.makeDocID({
      type: this.entityType,
      id: entityId
    });
    return this.db
      .get(generatedEntityId)
      .then(entity => this.db.remove(entity));
  };
}
