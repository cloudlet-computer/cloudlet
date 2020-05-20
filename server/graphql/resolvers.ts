import {resolvers as Query} from './types/query';
import {resolvers as Mutation} from './types/mutation';
import {resolvers as User} from './types/user';
import {resolvers as Note} from './types/note';
import {resolvers as Task} from './types/task';
import {resolvers as TaskList} from './types/task-list';

export const resolvers = [User, Note, Task, TaskList, Query, Mutation];
