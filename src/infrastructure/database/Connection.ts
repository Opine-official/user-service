import mongoose from 'mongoose';

export class DatabaseConnection {
  public static async connect(): Promise<void> {
    try {
      await mongoose.connect("mongodb://mongodb-service:27017/UserServiceDB");
      console.log("Successfully connected to user service database");
    } catch (e) {
      console.log("Mongodb connection failed");
    }
  }
}