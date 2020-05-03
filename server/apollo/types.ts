import {Config} from 'apollo-server';

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type PluginDefinition = ArrayElement<Config['plugins']>;
export type Logger = Config['logger'];
