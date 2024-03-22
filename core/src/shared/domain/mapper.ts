export interface Mapper<D, E> {
  convertToEntity(dynamoDbEntity: D): E
  convertToDBEntity(entity: E): D
}
