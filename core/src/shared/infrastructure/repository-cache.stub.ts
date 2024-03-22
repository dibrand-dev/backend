import { BasicAggregations, BasicFilters, OrderParams, Repository, SearchResponse } from "../domain/repository";
import { Mapper } from '../domain/mapper'

/**
 * D represent entity structure into dynamodb
 * E represent application entity
 */
export abstract class RepositoryCache<D, E> implements Repository<D, E> {
  protected cache: E[] = []
  protected constructor(protected mapper: Mapper<D, E>, protected key: string) {}

  abstract search(filters: BasicFilters, aggregations: BasicAggregations, order?: OrderParams[]): Promise<SearchResponse<E>>;

  /**
   * @override
   */
  async save(entity: E): Promise<void> {
    this.cache.push(entity)
  }

  /**
   * @override
   */
  async findById(id: string, rangeValue?: string): Promise<E | null> {
    const item = this.cache.find((item: E) => item[this.key as keyof E] === id)
    return item || null
  }

  async queryById(id: string): Promise<E[] | null> {
    const item = this.cache.filter((item: E) => item[this.key as keyof E] === id)
    return item || null
  }

  /**
   * @override
   */
  async deleteById(id: string, rangeValue?: string): Promise<any> {
    const index = this.cache.findIndex((item) => item[this.key as keyof E] === id)
    if (index !== -1) {
      this.cache.splice(index, 1)
    }
  }

  async scan(): Promise<E[] | null> {
    return this.cache
  }

  async saveMany(entities: Array<E>): Promise<void> {
    return Promise.resolve(undefined)
  }

  async upsert(entity: E): Promise<void> {
    return Promise.reject('Method not implemented.')
  }
}
