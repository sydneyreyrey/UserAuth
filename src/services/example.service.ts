import { Service } from "typedi";
import { AppError } from "../utils/error"; // Make sure this path matches your actual file structure

@Service()
export class ExampleService {
  private exampleData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
  ];

  public getAllData() {
    // Example: Error handling not typically required here unless there's a possible error
    return this.exampleData;
  }

  public getDataById(id: number) {
    const result = this.exampleData.find(
      (exampleData) => exampleData.id === id
    );
    if (!result) {
      throw new AppError(
        404,
        "NOT_FOUND",
        "The specified user ID does not exist",
        "getDataById"
      );
    }
    return result;
  }

  public createData(data: any) {
    if (!data.id || !data.name || !data.email) {
      throw new AppError(
        400,
        "INVALID_DATA",
        "Missing required data fields (id, name, email) for creation",
        "createData"
      );
    }
    this.exampleData.push(data);
    return data;
  }

  public updateData(id: number, data: any) {
    const index = this.exampleData.findIndex(
      (exampleData) => exampleData.id === id
    );
    if (index === -1) {
      throw new AppError(
        404,
        "NOT_FOUND",
        "No user found with the provided ID",
        "updateData"
      );
    }
    this.exampleData[index] = { ...this.exampleData[index], ...data };
    return this.exampleData[index];
  }

  public deleteData(id: number) {
    const index = this.exampleData.findIndex(
      (exampleData) => exampleData.id === id
    );
    if (index === -1) {
      throw new AppError(
        404,
        "NOT_FOUND",
        "No user found with the provided ID for deletion",
        "deleteData"
      );
    }
    this.exampleData.splice(index, 1);
    return { message: `Deleted successfully` };
  }
}
