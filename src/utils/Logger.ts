export enum LogLevel {
  FATAL = 5,
  ERROR = 4,
  WARN = 3,
  INFO = 2,
  DEBUG = 1,
  TRACE = 0
}

export interface LogConfig {
  logLevel?: LogLevel,
  colored?: boolean, /* Colored needs some extra calculations. In Prod it should be turned off */
  logObjects?: boolean
}

export class Logger {

  static globalLogLevel: LogLevel = LogLevel.INFO;
  static colored: boolean = false;
  static logObjects: boolean = false;

  public static config(config: LogConfig) {
    if (config.logLevel != undefined) {
      Logger.globalLogLevel = config.logLevel;
    }
    if (config.colored != undefined) {
      Logger.colored = config.colored;
    }
    if (config.logObjects != undefined) {
      Logger.logObjects = config.logObjects;
    }
  }

  logLevel: LogLevel | undefined;
  name: string;

  constructor(name: string, logLevel?: LogLevel) {
    this.name = name;
    this.logLevel = logLevel;
  }

  log(logLevel: LogLevel, message: any) {
    // checks if global logLevel or object logLevel are smaller than message logLevel
    if (logLevel >= Logger.globalLogLevel || logLevel >= (this.logLevel != undefined ? this.logLevel : 100)) {
      //todo: remove this old code
      //console.log(`[${Game.time}] [${LogLevel[logLevel].padEnd(5)}] [${this.name}] ${JSON.stringify(message)}`);

      let color: string = "white";
      if (Logger.colored) {
        switch (logLevel) {
          case LogLevel.FATAL:
            color = "#3b1f2c";
            break;
          case LogLevel.ERROR:
            color = "#c53e1e";
            break;
          case LogLevel.WARN:
            color = "#ef8e02";
            break;
          case LogLevel.INFO:
            color = "#2a4e87";
            break
          case LogLevel.DEBUG:
            color = "#418859";
            break;
          case LogLevel.TRACE:
            color = "#ffffff";
            break;
          default:
            console.log("Logger log colored switchcase no match!")
        }
      }

      let log = `<span style=''>[${Game.time}]</span><span style='width: 5px'></span><span style='width: 45px'>[<span style='color:${color}'>${LogLevel[logLevel]}</span>]</span><span style='width: 5px'></span><span style='font-weight: bold'>{${this.name}}</span><span style='width: 5px'></span><span style=''>${message}</span>`;
      if (Logger.logObjects && (message instanceof Array || message instanceof Object)) {
        log += `<br><span style='font-size: 10px'>${JSON.stringify(message, null, 2)}</span></span>`
      }
      console.log(log);
    }
  }

  fatal(message: any) {
    this.log(LogLevel.FATAL, message);
  }

  error(message: any) {
    this.log(LogLevel.ERROR, message);
  }

  warn(message: any) {
    this.log(LogLevel.WARN, message);
  }

  info(message: any) {
    this.log(LogLevel.INFO, message);
  }

  debug(message: any) {
    this.log(LogLevel.DEBUG, message);
  }

  trace(message: any) {
    this.log(LogLevel.TRACE, message);
  }
}
