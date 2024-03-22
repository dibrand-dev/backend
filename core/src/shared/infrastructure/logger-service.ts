import { LoggerLevel } from '../domain/logger';

export abstract class LoggerService {
  static setLevel(level: LoggerLevel) {
    switch (level) {
      case LoggerLevel.DEBUG:
        break;
      case LoggerLevel.INFO:
        console.debug = function () {};
        break;
      case LoggerLevel.WARN:
        console.debug = function () {};
        console.info = function () {};
        break;
      case LoggerLevel.ERROR:
        console.debug = function () {};
        console.info = function () {};
        console.warn = function () {};
        break;
      case LoggerLevel.TEST:
        console.debug = function () {};
        console.info = function () {};
        console.warn = function () {};
        console.error = function () {};
    }
  }
}
