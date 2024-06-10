import {
  FindOptions,
  Model,
  ModelStatic,
  UpdateOptions,
  WhereOptions,
  Includeable
} from "sequelize";
import { MakeNullishOptional } from "sequelize/lib/utils";

export class BaseRepository<T extends Model> {
  constructor(private model: ModelStatic<T>, private include: Includeable[] = []) {}
  
  async create(payload: MakeNullishOptional<T>): Promise<T> {
    return await this.model.create(payload);
  };

  async bulkCreate(...payload: MakeNullishOptional<T>[]): Promise<T[]> {
    return await this.model.bulkCreate(payload);
  };

  async update(payload: Partial<T>, options: UpdateOptions): Promise<T | null> {
    await this.model.update(payload, options);
    return await this.model.findOne(options);
  };

  async drop(id: number | string): Promise<number> { 
    return await this.model.destroy({ where: { id } } as any);
  }

  async find(query: MakeNullishOptional<T> | WhereOptions, options?: FindOptions): Promise<T | null> {
    return await this.model.findOne({
      where: query,
      include: this.include,
    ...options,
    });
  }

  async findOne(query: MakeNullishOptional<T> | WhereOptions, options?: FindOptions): Promise<T | null> {
    return await this.model.findOne({
      where: query,
      include: this.include,
    ...options,
    });
  }

  async findAll(query: MakeNullishOptional<T> | WhereOptions, options?: FindOptions): Promise<T[]> {
    return await this.model.findAll({
      where: query,
      include: this.include,
    ...options,
    });
  }
}