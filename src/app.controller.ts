import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SearchCommon } from 'core/share/domain/search';
import { UserApiGithub } from 'core/user/infrastructure/user-api-github';
import { GetUsers } from 'core/user/architecture/get-users';
import { GetUser } from 'core/user/architecture/get-user';
import { SearchUsers } from 'core/user/architecture/search-users';
import { CreateFavorite } from 'core/favorite/architecture/create-favorite';
import { FavoriteApiMemory } from 'core/favorite/infrastructure/favorite-api-memory';
import { GetFavorites } from 'core/favorite/architecture/get-favorites';

@Controller()
export class AppController {

  @Get('users')
  async getUsersController(@Body() userParams: SearchCommon): Promise<any> {
    const cu = new GetUsers(new UserApiGithub())
    return await cu.execute(userParams);
  }

  @Get('users/:username')
  async getUserController(@Param('username') username: string): Promise<any> {
    const cu = new GetUser(new UserApiGithub(), FavoriteApiMemory.getInstance())
    return await cu.execute(username);
  }

  @Get('search-users')
  async searchUsersController(@Body() userParams: SearchCommon): Promise<any> {
    const cu = new SearchUsers(new UserApiGithub())
    return await cu.execute(userParams);
  }

  @Post('favorite/:username')
  
  async createFavoritesController(@Param('username') username: string): Promise<any> {
    const cu = new CreateFavorite(FavoriteApiMemory.getInstance(), new UserApiGithub())
    return await cu.execute(username);
  }

  @Get('favorites')
  async getFavoritesController(): Promise<any> {
    const cu = new GetFavorites(FavoriteApiMemory.getInstance())
    return await cu.execute();
  }
}
