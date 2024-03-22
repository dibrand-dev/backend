import {
  BasicAggregations,
  BasicFilters,
  OrderParams,
  Repository,
  SearchResponse
} from '../domain/repository';
// @ts-ignore
import { Endpoint, EnvironmentCredentials, HttpClient, HttpRequest, Signers } from 'aws-sdk';
import path from 'path';
import { Mapper } from '../domain/mapper';
import { AppErrorGeneric } from './app-error-generic';
import { StatusCodeResponse } from '../domain/response';
import bodybuilder from 'bodybuilder';
import {BatchType, Key, KeyRange, RequestTransaction, ScanFilter, ScanParameters} from "./repository-dynamo";

/**
 * D represent entity structure into dynamodb
 * E represent application entity
 */
export abstract class RepositoryElasticsearch<D, E> implements Repository<D, E> {
  private readonly node: string;
  private readonly region: string;
  private index: string | undefined;
  private readonly endpoint: Endpoint;
  private readonly credentialsAWS: EnvironmentCredentials;
  protected defaultPage = 1;
  protected defaultSize = 100;

  constructor(protected mapper: Mapper<D, E>, node: string, region: string, index?: string) {
    this.node = node;
    this.region = region;
    this.index = index;
    this.endpoint = new Endpoint(this.node);
    this.credentialsAWS = new EnvironmentCredentials('AWS');
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
