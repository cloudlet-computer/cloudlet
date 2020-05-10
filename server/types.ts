import {db} from './db';

export interface ApolloContext {
  // A reference to the prisma db
  db: typeof db;

  // The currently authed user
  userId: number | null;
}
