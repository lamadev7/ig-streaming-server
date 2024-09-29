import { initMongoConnection, initSequelizeConnection } from "../../config/db";


export const initConnection = async () => {
  await initMongoConnection();
  await initSequelizeConnection();
}
