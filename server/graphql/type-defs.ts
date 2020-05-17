import {typeDefs as Query} from './types/query';
import {typeDefs as User} from './types/user';
import {typeDefs as Mutation} from './types/mutation';
import {typeDefs as Note} from './types/note';

import {typeDefs as NoteCreate} from './mutations/note-create';
import {typeDefs as NoteUpdate} from './mutations/note-update';
import {typeDefs as UserCreate} from './mutations/user-create';
import {typeDefs as SignIn} from './mutations/sign-in';

export const typeDefs = [
  Query,
  Mutation,
  Note,
  NoteCreate,
  NoteUpdate,
  SignIn,
  User,
  UserCreate,
];
