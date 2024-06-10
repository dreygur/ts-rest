import { autoInjectable } from "tsyringe";
import { BaseRepository } from "./base";
import Users from "../models/user";

@autoInjectable()
class UserRepository extends BaseRepository<Users> {
  constructor() {
    super(Users);
  }

  // Write some extra database operations if needed
}

export default UserRepository