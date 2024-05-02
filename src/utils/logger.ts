import * as winston from "winston";

export class Logger {
  private static instances: Map<string, winston.Logger> = new Map();

  public static getLogger(label: string): winston.Logger {
    if (!Logger.instances.has(label)) {
      const loggerOptions: winston.LoggerOptions = {
        level: "info",
        format: winston.format.combine(
          winston.format.label({ label: label }),
          winston.format.colorize(),
          winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
          }),
          winston.format.printf(
            (info) =>
              `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
          )
        ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
          }),
          new winston.transports.File({ filename: "logs/combined.log" }),
        ],
      };

      Logger.instances.set(label, winston.createLogger(loggerOptions));
    }
    return Logger.instances.get(label)!;
  }
}
