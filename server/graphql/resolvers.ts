import {resolvers as Query} from './types/query';
import {resolvers as Mutation} from './types/mutation';
import {resolvers as User} from './types/user';
import {resolvers as Note} from './types/note';

export const resolvers = [User, Note, Query, Mutation];
