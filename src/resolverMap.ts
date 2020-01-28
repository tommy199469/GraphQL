// resolverMap.ts
import { IResolvers } from 'graphql-tools';
import gameModel from './mongodb'


const resolverMap: IResolvers = {
  Query: {
    getNumbers: async(_: void, args: void): Promise<{id: Number; blue: Number; orange: Number;}> => {
      let game = await gameModel.findOne({}, {}, { sort: { 'created_at' : -1 } })
      return game ? game : {id:0 ,blue:0 , orange:0 };
    }
  },
  Mutation: {
    upateGame : async(_: void, args: {id: Number , blue: Number , orange: Number}): Promise<{id: Number; blue: Number; orange: Number;}>  => {
      let {id , blue , orange} = args
      let game = await  gameModel.findOneAndUpdate({id: id} , { blue , orange}, {
        new: true,
        upsert: true
      })
      return game;
    }
  },
};


export default resolverMap;