// resolverMap.ts
import { IResolvers } from 'graphql-tools';
import gameModel from './mongodb'


const resolverMap: IResolvers = {
  Query: {
    getNumbers: async(_: void, args: void): Promise<{ blue: Number; orange: Number;}> => {
      let game = await gameModel.findOne({}, {}, { sort: { 'created_at' : -1 } })
      return game ? game : {blue:0 , orange:0 };
    }
  },
  Mutation: {
    updateGame : async(_: void, args: {id: String , blue: Number , orange: Number}): Promise<{id: String; blue: Number; orange: Number;}>  => {
      let {id , blue , orange} = args
      console.log('args' , args);
      let game = await  gameModel.findOneAndUpdate({id: id} , { blue , orange}, {
        new: true,
        upsert: true
      })
      return game;
    }
  },
};


export default resolverMap;