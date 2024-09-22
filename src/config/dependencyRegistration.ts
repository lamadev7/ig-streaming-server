import { InjectionMode, asClass, asValue, createContainer } from "awilix";

import ReelsDao from "../modules/reels/dao";
import reelsModel from "../modules/reels/models";
import ReelsService from "../modules/reels/services";
import ReelsController from "../modules/reels/controllers";
import ReelsRepository from "../modules/reels/repositories";


const container = createContainer({ injectionMode: InjectionMode.PROXY });

const registerDependency = () => {
  container.register({
    reelsDb: asValue(reelsModel),
    reelsDao: asClass(ReelsDao),
    reelsService: asClass(ReelsService),
    reelsController: asClass(ReelsController),
    reelsRepository: asClass(ReelsRepository),
  });

  console.log("Dependency registered ...");
}

registerDependency();

export { container };