import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { SearchCommon } from 'core/share/domain/search';
import { UserApiGithub } from 'core/user/infrastructure/user-api-github';
import { GetUsers } from 'core/user/architecture/get-users';
import { GetUser } from 'core/user/architecture/get-user';
import {
  BodySearchUsers,
  SearchUsers,
} from 'core/user/architecture/search-users';
import { CreateFavorite } from 'core/favorite/architecture/create-favorite';
import { FavoriteApiMemory } from 'core/favorite/infrastructure/favorite-api-memory';
import { GetFavorites } from 'core/favorite/architecture/get-favorites';
import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost<ExpressAdapter>,
  ) {}

  @Get('users')
  @ApiQuery({ name: 'per_page', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  async getUsersController(
    @Query() query: SearchCommon,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const cu = new GetUsers(new UserApiGithub());
    const result = await cu.execute(query);

    const { httpAdapter } = this.httpAdapterHost;
    httpAdapter.setHeader(
      res,
      'Link',
      result.links
        .map((link) => `<${link.href}>; rel="${link.rel}"`)
        .join(', '),
    );

    return result.users;
  }

  @Get('user/:username')
  @ApiParam({ name: 'username', required: true, type: 'string' })
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  async getUserController(@Param('username') username: string): Promise<any> {
    const cu = new GetUser(
      new UserApiGithub(),
      FavoriteApiMemory.getInstance(),
    );
    return await cu.execute(username);
  }

  @Get('search-users')
  @ApiQuery({ name: 'term', required: true, type: 'string' })
  @ApiQuery({ name: 'per_page', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiOperation({ summary: 'Search users' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  async searchUsersController(@Query() body: BodySearchUsers): Promise<any> {
    const cu = new SearchUsers(new UserApiGithub());
    return await cu.execute(body);
  }

  @Post('favorite/:username')
  @ApiParam({ name: 'username', required: true, type: 'string' })
  @ApiOperation({ summary: 'Create favorite' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async createFavoritesController(
    @Param('username') username: string,
  ): Promise<any> {
    const cu = new CreateFavorite(
      FavoriteApiMemory.getInstance(),
      new UserApiGithub(),
    );
    return await cu.execute(username);
  }

  @Get('favorites')
  @ApiOperation({ summary: 'Get favorites' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  async getFavoritesController(): Promise<any> {
    const cu = new GetFavorites(FavoriteApiMemory.getInstance());
    return await cu.execute();
  }
}
