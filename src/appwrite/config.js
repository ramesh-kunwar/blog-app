import config from "../config/config.js";

import { Client, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.APPWRITE_URL)
      .setProject(config.APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const result = await this.databases.createDocument(
        config.APPWRITE_COLLECTION_ID,
        config.APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          //   slug,
          content,
          featuredImage,
          status,
          userId,
          //   createdAt: new Date().getTime(),
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(
    slug,
    { title, content, featuredImage, status, userId, id }
  ) {
    try {
      const result = await this.databases.updateDocument(
        config.APPWRITE_DATABASE_ID,
        config.APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );

      return result;
    } catch (error) {
      console.log("error : Appwrite Update post");
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.APPWRITE_DATABASE_ID,
        config.APPWRITE_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("error: appwrite delete post", error);

      return false;
    }
  }

  async getPost(slug) {
    try {
      const result = await databases.getDocument(
        config.APPWRITE_DATABASE_ID,
        config.APPWRITE_COLLECTION_ID,
        slug
      );
      return result;
    } catch (error) {
      console.log("error: appwrite get document", error);
    }
  }

  async getPosts(queries = [Query.equalTo("status", "published")]) {
    try {
      const result = await this.databases.listDocuments(
        config.APPWRITE_DATABASE_ID,
        config.APPWRITE_COLLECTION_ID,
        queries
      );
      return result;
    } catch (error) {
      console.log("error: appwrite get documents", error);
    }
  }

  async uploadFile(file) {
    try {
      const result = await this.bucket.createFile(
        config.APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
      return result;
    } catch (error) {
      console.log("error: appwrite upload file", error);
    }
  }

  async deleteFile(fileId) {
    try {
      const result = await this.bucket.deleteFile(
        config.APPWRITE_BUCKET_ID,
        fileId
      );
      return result;
    } catch (error) {
      console.log("error: appwrite delete file", error);
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.APPWRITE_BUCKET_ID, fileId);
  }
}

const service = new Service();
export default service;
