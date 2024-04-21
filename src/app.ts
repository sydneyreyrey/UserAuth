import express from "express";
import "reflect-metadata";
import { useContainer, useExpressServer } from "routing-controllers";
import { Container, Inject, Service } from "typedi";
import { DatabaseConnection } from "./db";

@Service()
export class MicroServiceApp {
  private app: express.Application;

  constructor(private config: Configuration, private db: DatabaseConnection) {
    this.app = express();
    useContainer(Container);
    this.initializeApp();
  }

  private initializeApp() {
    useExpressServer(this.app, {
      defaultErrorHandler: false,
      middlewares: [],
      controllers: [join(__dirname) + "/controllers/**/*.controller.{js,ts}"],
    });
  }

  private async initializeDatabase() {
    await this.db.initialize();
  }

  public async listen() {
    await this.initializeDatabase();
    return this.app.listen(this.port, async () => {
      this.log.info(`Application running on port ${this.port}`);
    });
  }
}
