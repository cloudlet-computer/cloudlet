import {db} from './db';

export interface ApolloContext {
  db: typeof db;
}
