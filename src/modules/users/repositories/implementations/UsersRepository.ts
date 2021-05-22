import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
   const user = await this.repository.findOne(user_id,
   { relations: ["games"]}) as User;
  
    return user

  
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("SELECT * from users ORDER BY first_name"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const firstName = first_name.toLocaleLowerCase()
    const lastName = last_name.toLocaleLowerCase()
    return this.repository.query("SELECT *  from users WHERE LOWER(first_name) = $1 and LOWER(last_name)= $2",[firstName,lastName]); // Complete usando raw query
  }
}
