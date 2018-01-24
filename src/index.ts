import "reflect-metadata";
import { createConnection, FindManyOptions } from "typeorm";
import {User} from "./entity/User";

createConnection().then(async connection => {

  console.log("Inserting a new user into the database...");
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;
  await connection.manager.save(user);
  console.log("Saved a new user with id: " + user.id);

  console.log("Loading users from the database...");
  const users = await connection.manager.find(User);
  console.log("Loaded users: ", users);

  console.log("Here you can setup and run express/koa/any other framework.");

  console.log("Performing find query...");
  const users2 = await connection.getRepository(User).find({
    select: ["firstName","age"]
  } as FindManyOptions<User>);
  console.log("Printing the query result:");
  console.log(users2);

  console.log("Performing findAndCount query...");
  const [users3, count] = await connection.getRepository(User).findAndCount({
    select: ["firstName","age"]
  } as FindManyOptions<User>);
  console.log("Printing the query result:");
  console.log(users3);
  console.log(count);

}).catch(error => console.log(error));
