import { Model, Types, QueryFilter, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema.js';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: Types.ObjectId,
    });

    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(queryFilter: QueryFilter<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(queryFilter)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with query filter', queryFilter);
      throw new NotFoundException('Document not found!');
    }

    return document;
  }

  async findAndUpdate(
    queryFilter: QueryFilter<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findByIdAndUpdate(queryFilter, update, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with query filter', queryFilter);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async find(queryFilter: QueryFilter<TDocument>): Promise<TDocument[]> {
    return await this.model.find(queryFilter).lean<TDocument[]>(true);
  }

  async findAndDelete(queryFilter: QueryFilter<TDocument>) : Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(queryFilter)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with query filter', queryFilter);
      throw new NotFoundException('Document not found');
    }

    return document;
  }
}
