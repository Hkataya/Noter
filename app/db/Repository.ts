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

  createEntity = (entityData: Omit<T, 'id'>) => {
    return this.relDB.rel.save(this.entityType, entityData);
  };

  deleteEntity = (entityId: string) => {
    const generatedEntityId: string = this.relDB.rel.makeDocID({
      type: this.entityType,
      id: entityId
    });
    return this.db
      .get(generatedEntityId)
      .then(entity => this.db.remove(entity));
  };

  updateEntity = (entityData: T) => {
    return this.relDB.rel.find(this.entityType, entityData.id).then(oldData => {
      const newData = oldData;
      newData.notes[0] = entityData;
      return this.relDB.rel.save(this.entityType, oldData.notes[0]);
    });
  };
}
