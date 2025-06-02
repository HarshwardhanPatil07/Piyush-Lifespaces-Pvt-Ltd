import mongoose, { Document, Model, FilterQuery, UpdateQuery, PopulateOptions } from 'mongoose';
import connectDB from './mongodb';

// Generic CRUD operations for any MongoDB model
export class DatabaseService<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  // Create a new document
  async create(data: Partial<T>): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      await connectDB();
      const document = new this.model(data);
      const savedDocument = await document.save();
      return { success: true, data: savedDocument };
    } catch (error: any) {
      console.error(`Error creating ${this.model.modelName}:`, error);
      return { success: false, error: error.message || 'Failed to create document' };
    }
  }

  // Find documents with advanced filtering, sorting, and pagination
  async find(
    filter: FilterQuery<T> = {},
    options: {
      sort?: any;
      limit?: number;
      skip?: number;
      populate?: PopulateOptions | PopulateOptions[];
      select?: string;
    } = {}
  ): Promise<{ success: boolean; data?: T[]; total?: number; error?: string }> {
    try {
      await connectDB();
      
      let query = this.model.find(filter);
      
      if (options.select) {
        query = query.select(options.select);
      }
      
      if (options.populate) {
        query = query.populate(options.populate);
      }
      
      if (options.sort) {
        query = query.sort(options.sort);
      }
      
      if (options.skip) {
        query = query.skip(options.skip);
      }
      
      if (options.limit) {
        query = query.limit(options.limit);
      }
      
      const documents = await query.exec();
      const total = await this.model.countDocuments(filter);
      
      return { success: true, data: documents, total };
    } catch (error: any) {
      console.error(`Error finding ${this.model.modelName}:`, error);
      return { success: false, error: error.message || 'Failed to find documents' };
    }
  }

  // Find a single document by ID
  async findById(
    id: string,
    options: {
      populate?: PopulateOptions | PopulateOptions[];
      select?: string;
    } = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      await connectDB();
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, error: 'Invalid ID format' };
      }
      
      let query = this.model.findById(id);
      
      if (options.select) {
        query = query.select(options.select);
      }
      
      if (options.populate) {
        query = query.populate(options.populate);
      }
      
      const document = await query.exec();
      
      if (!document) {
        return { success: false, error: 'Document not found' };
      }
      
      return { success: true, data: document };
    } catch (error: any) {
      console.error(`Error finding ${this.model.modelName} by ID:`, error);
      return { success: false, error: error.message || 'Failed to find document' };
    }
  }

  // Update a document by ID
  async updateById(
    id: string,
    updateData: UpdateQuery<T>,
    options: {
      new?: boolean;
      runValidators?: boolean;
      populate?: PopulateOptions | PopulateOptions[];
    } = { new: true, runValidators: true }
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      await connectDB();
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, error: 'Invalid ID format' };
      }
      
      let query = this.model.findByIdAndUpdate(id, updateData, options);
      
      if (options.populate) {
        query = query.populate(options.populate);
      }
      
      const document = await query.exec();
      
      if (!document) {
        return { success: false, error: 'Document not found' };
      }
      
      return { success: true, data: document };
    } catch (error: any) {
      console.error(`Error updating ${this.model.modelName}:`, error);
      return { success: false, error: error.message || 'Failed to update document' };
    }
  }

  // Update multiple documents
  async updateMany(
    filter: FilterQuery<T>,
    updateData: UpdateQuery<T>
  ): Promise<{ success: boolean; modifiedCount?: number; error?: string }> {
    try {
      await connectDB();
      
      const result = await this.model.updateMany(filter, updateData);
      
      return { success: true, modifiedCount: result.modifiedCount };
    } catch (error: any) {
      console.error(`Error updating multiple ${this.model.modelName}:`, error);
      return { success: false, error: error.message || 'Failed to update documents' };
    }
  }

  // Delete a document by ID
  async deleteById(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await connectDB();
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, error: 'Invalid ID format' };
      }
      
      const document = await this.model.findByIdAndDelete(id);
      
      if (!document) {
        return { success: false, error: 'Document not found' };
      }
      
      return { success: true };
    } catch (error: any) {
      console.error(`Error deleting ${this.model.modelName}:`, error);
      return { success: false, error: error.message || 'Failed to delete document' };
    }
  }

  // Soft delete (mark as inactive)
  async softDeleteById(id: string): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      await connectDB();
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, error: 'Invalid ID format' };
      }
      
      const document = await this.model.findByIdAndUpdate(
        id,
        { isActive: false, deletedAt: new Date() },
        { new: true }
      );
      
      if (!document) {
        return { success: false, error: 'Document not found' };
      }
      
      return { success: true, data: document };
    } catch (error: any) {
      console.error(`Error soft deleting ${this.model.modelName}:`, error);
      return { success: false, error: error.message || 'Failed to soft delete document' };
    }
  }

  // Count documents
  async count(filter: FilterQuery<T> = {}): Promise<{ success: boolean; count?: number; error?: string }> {
    try {
      await connectDB();
      
      const count = await this.model.countDocuments(filter);
      
      return { success: true, count };
    } catch (error: any) {
      console.error(`Error counting ${this.model.modelName}:`, error);
      return { success: false, error: error.message || 'Failed to count documents' };
    }
  }

  // Aggregate data
  async aggregate(pipeline: any[]): Promise<{ success: boolean; data?: any[]; error?: string }> {
    try {
      await connectDB();
      
      const result = await this.model.aggregate(pipeline);
      
      return { success: true, data: result };
    } catch (error: any) {
      console.error(`Error aggregating ${this.model.modelName}:`, error);
      return { success: false, error: error.message || 'Failed to aggregate data' };
    }
  }

  // Search with text index
  async search(
    searchText: string,
    additionalFilters: FilterQuery<T> = {},
    options: {
      limit?: number;
      skip?: number;
      sort?: any;
    } = {}
  ): Promise<{ success: boolean; data?: T[]; total?: number; error?: string }> {
    try {
      await connectDB();
      
      const filter = {
        ...additionalFilters,
        $text: { $search: searchText }
      };
      
      let query = this.model.find(filter, { score: { $meta: 'textScore' } });
      
      if (options.sort) {
        query = query.sort(options.sort);
      } else {
        query = query.sort({ score: { $meta: 'textScore' } });
      }
      
      if (options.skip) {
        query = query.skip(options.skip);
      }
      
      if (options.limit) {
        query = query.limit(options.limit);
      }
      
      const documents = await query.exec();
      const total = await this.model.countDocuments(filter);
      
      return { success: true, data: documents, total };
    } catch (error: any) {
      console.error(`Error searching ${this.model.modelName}:`, error);
      return { success: false, error: error.message || 'Failed to search documents' };
    }
  }
}

// Factory function to create database service instances
export function createDatabaseService<T extends Document>(model: Model<T>): DatabaseService<T> {
  return new DatabaseService(model);
}

// Export commonly used services
export * from './mongodb';
