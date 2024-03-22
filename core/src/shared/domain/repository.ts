export type SearchResponse<E> = {
  registros: E[];
  cantidad: number;
  total: number;
};

export interface BasicFilters {
  fecha_alta_desde?: string;
  fecha_alta_hasta?: string;
}

export interface BasicAggregations {
  pagina?: number;
  cantidad?: number;
}

export interface OrderParams {
  campo: string;
  orden: string;
}

export interface Repository<D, E> {
  findById(id: string, rangeValue?: string): Promise<E | null>;
  save(entity: E): Promise<void>;
  saveMany(entities: Array<E>): Promise<void>;
  upsert(entity: E): Promise<void>;
  deleteById(id: string): Promise<void>;
  search(filters: BasicFilters, aggregations?: BasicAggregations, order?: OrderParams[]): Promise<SearchResponse<E>>;
}
