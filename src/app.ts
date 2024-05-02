import express from "express";
import "reflect-metadata";
import {
  useContainer,
  useExpressServer,
  getMetadataArgsStorage,
} from "routing-controllers";
import { Container, Inject, Service } from "typedi";
// import { DatabaseConnection } from "./db";
import { join } from "path";
import { Logger } from "./utils/logger";
import morgan from "morgan";
import { AuthenticationMiddleware } from "./utils/middleware/authenticationMiddleware";
import { AuthorizationChecker } from "./utils/middleware/authorizationChecker";

@Service()
export class MicroServiceApp {
  private app: express.Application;
  private logger = Logger.getLogger("App");
  private port = 8080;

  constructor(
    @Inject(() => AuthenticationMiddleware),
    @Inject(() => AuthorizationChecker),
    private config: Configuration, 
    private db: DatabaseConnection
    ) {
    this.app = express();
    useContainer(Container);
    this.initializeApp();
  }

  private initializeApp() {
    this.app.use(
      morgan(
        (tokens, req, res) => {
          return `${req.method} ${req.originalUrl}`;
        },
        {
          stream: {
            write: (message) => this.logger.info(message),
          },
        }
      )
    );

    useExpressServer(this.app, {
      defaultErrorHandler: false,
      controllers: [join(__dirname) + "/controllers/**/*.controller.{js,ts}"],
      // routePrefix: "/v1",
      middlewares: [AuthenticationMiddleware],
      authorizationChecker: authorizationChecker,
    });
  }

  private async initializeDatabase() {
    // await this.db.initialize();
  }

  public async listen() {
    try {
      await this.initializeDatabase();
      this.app.listen(this.port, () => {
        this.logger.info(`Application running on port ${this.port}`);
      });
    } catch (error) {
      this.logger.error("Failed to start the server:", error);
    }
  }
}
