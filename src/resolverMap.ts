// resolverMap.ts
import { IResolvers } from 'graphql-tools';

const resolverMap: IResolvers = {
  Query: {
    getNumbers(_: void, args: void): {id: String; blue: Number; orange: Number;} {
        return {id:'123' ,blue:123,orange:123};
    }
  },
};
export default resolverMap;