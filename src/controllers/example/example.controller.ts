import "reflect-metadata";
import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "routing-controllers";
import { ExampleService } from "../../services/example.service";
import { Service } from "typedi";
import Logger from "../../utils/logger";

@JsonController("/example")
@Service()
export class ExampleController {
  private logger = Logger.getLogger("ExampleController");

  constructor(private exampleService: ExampleService) {}

  @Get("/")
  public async getAllData() {
    return this.exampleService.getAllData();
  }

  @Get("/:id")
  public async getDataById(@Param("id") id: number) {
    return this.exampleService.getDataById(id);
  }

  @Post("/")
  public async createData(@Body() data: any) {
    return this.exampleService.createData(data);
  }

  @Put("/:id")
  public async updateData(@Param("id") id: number, @Body() data: any) {
    return this.exampleService.updateData(id, data);
  }

  @Delete("/:id")
  public async deleteData(@Param("id") id: number) {
    return this.exampleService.deleteData(id);
  }
}
