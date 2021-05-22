import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder('games')
      .select()
      .where("games.title ILIKE  :title ", {title:`%${param}%` })
      .getMany()
     
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('SELECT COUNT(*) FROM games')
    // Complete usando raw query
  }

  //  async findUsersByGameId(id: string): Promise<User[]> {
  //   return this.repository
  //   .createQueryBuilder("games")
  //   .innerJoinAndSelect("games.users", "users")
  //   .getOne()
  //   .then((game) => {
  //     if (!game) {
  //       throw new Error("Game not found");
  //     }
  //     return game.users;
  //   });
  //     // Complete usando query builder
  //

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder('games')
      .leftJoinAndSelect('games.users',"users")
      .select('users.email, users.first_name, users.last_name')
      .where('games.id = :id', {id})
      .getRawMany();
      // Complete usando query builder
  }
}
