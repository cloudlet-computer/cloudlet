import {Config} from 'apollo-server-express';
import {bgBlueBright, bgGray, bgYellow, bgRedBright} from 'chalk';
import {Logger, PluginDefinition} from './types';

export const logger: Logger = {
  info(message) {
    console.log(`${bgBlueBright(' INFO ')} at ${new Date().toISOString()}`);
    console.log(message);
  },
  debug(message) {
    console.log(`${bgGray(' DEBUG ')} at ${new Date().toISOString()}`);
    console.log(message);
  },
  warn(message) {
    console.log(`${bgYellow(' WARN ')} at ${new Date().toISOString()}`);
    console.log(message);
  },
  error(message) {
    console.log(`${bgRedBright(' ERROR ')} at ${new Date().toISOString()}`);
    console.log(message);
  },
};

export const logPlugin: PluginDefinition = {
  requestDidStart(request) {
    if (request.request.operationName === 'IntrospectionQuery') {
      request.logger.info('Introspection query!!');
      return {};
    }

    request.logger.info(request.request.query);

    return {
      didEncounterErrors(requestContext) {
        requestContext.errors.forEach((error) => {
          requestContext.logger.error(error.message);
        });
      },
    };
  },
};
