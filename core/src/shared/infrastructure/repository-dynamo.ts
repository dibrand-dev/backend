import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { BasicAggregations, BasicFilters, OrderParams, Repository, SearchResponse } from "../domain/repository";
import { Mapper } from '../domain/mapper'

export enum BatchType {
  PutRequest = 'PutRequest',
  DeleteRequest = 'DeleteRequest'
}

export enum TransactionType {
  PUT = 'Put',
  UPDATE = 'Update',
  DELETE = 'Delete'
}

export type Key = {
  name: string
  value: string
}

export type KeyRange = Key & {
  value2?: string
  searchType: SearchType
}

export enum SearchType {
  ET = '=',
  GT = '>',
  LT = '<',
  GTE = '>=',
  LTE = '<=',
  BEGINS_WITH = 'BEGIN_WITH',
  BETWEEN = 'AND'
}

export type ScanFilter = {
  name: string
  value: string
  value2?: string
  condition: SearchType
}

export type ScanParameters = {
  index?: string
  limit?: number
  select?: string
  selectAttributes?: string[]
  filter?: ScanFilter[]
}

export type RequestTransaction = {
  type: TransactionType
  table: string
  body: any
}

export type ErrorEntityTransaction = {
  entity: string
  code: string
}

export type ErrorTransaction = {
  code: string
  message: string
  errors?: ErrorEntityTransaction[]
}

export enum ErrorCodeDynamo {
  CONDITION_FAILED = 'ConditionalCheckFailed',
  TRANSACTION_CONFLICT = 'TransactionConflict'
}

/**
 * D represent entity structure into dynamodb
 * E represent application entity
 */
export abstract class RepositoryDynamo<D, E> implements Repository<D, E> {
  private dynamoDB: DocumentClient

  protected constructor(
    protected mapper: Mapper<D, E>,
    protected tableName: string,
    protected key: string,
    protected range?: string,
    protected ct?: Key
  ) {
    this.dynamoDB = new DocumentClient()
  }

  abstract search(filters: BasicFilters, aggregations: BasicAggregations, order?: OrderParams[]): Promise<SearchResponse<E>>;

  /**
   * @override
   */
  async save(entity: E): Promise<void> {
    return {} as any
  }

  async saveMany(entities: E[]): Promise<void> {
    return {} as any
  }

  private sliceItems(entities: Array<E>) {
    const chunkSize = 25
    const slices = []
    for (let i = 0; i < entities.length; i += chunkSize) {
      slices.push(entities.slice(i, i + chunkSize))
    }
    return slices
  }

  private batchSchema(entities: Array<E>, type: BatchType, hashKey?: string): any {
    return {} as any
  }

  async batchSave(entities: Array<E>): Promise<any> {
    return {} as any
  }

  /**
   * @override
   */
  async findById(id: string, rangeValue?: string): Promise<E | null> {
    return {} as any
  }

  async queryById(hash: KeyRange, range?: KeyRange): Promise<E[] | null> {
    return {} as any
  }

  protected async readByGSI(
    id: Key,
    index?: string,
    range?: KeyRange,
    filter?: ScanFilter[]
  ): Promise<E[] | null> {
    return {} as any
  }

  protected async scan(scanParameters: ScanParameters): Promise<E[] | null> {
    return {} as any
  }

  protected async update(
    keyValue: string,
    updateExpression: any,
    attributeNames: any,
    attributeValues: any,
    rangeValue?: string
  ): Promise<any> {
    return {} as any
  }

  async upsert(entity: E): Promise<any> {
    return {} as any
  }

  /*
   * @throws ErrorTransaction
   */
  transactionWrite(requests: RequestTransaction[]): Promise<any> {
    return {} as any
  }

  /**
   * @override
   */
  async deleteById(id: string, rangeValue?: string): Promise<any> {
    return {} as any
  }
}
