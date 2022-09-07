import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UtilityHelper } from 'src/helpers/utility.helper';
import { UserDocument } from 'src/user/schemas/user.schema';
import { CurrentUser } from 'src/user/user.decorator';
import { PostCredentialsDto } from './dto/post-credentials.dto';
import { PostService } from './post.service';

@Controller('api/v1/posts')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('new')
  async createPost(
    @Body(ValidationPipe) postCredentialsDto: PostCredentialsDto,
    @CurrentUser() user: UserDocument,
  ) {
    const post = await this.postService.createPost(postCredentialsDto, user);
    return UtilityHelper.response('new post created', post);
  }

  @Get()
  async getAllPosts(@CurrentUser() user: UserDocument) {
    const posts = await this.postService.getAllPosts(user);
    return UtilityHelper.response(`all posts for ${user.name}`, posts);
  }

  @Patch(':id')
  async updateSinglePost(
    @Body(ValidationPipe) postCredentialsDto: PostCredentialsDto,
    @CurrentUser() user: UserDocument,
    @Param('id') id: string,
  ) {
    const updatedPost = await this.postService.updateSinglePost(
      id,
      postCredentialsDto,
      user,
    );
    return UtilityHelper.response(`post updated successfully`, updatedPost);
  }

  @Delete(':id')
  async deletePost(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
    @Query('sure') sure: boolean,
  ) {
    await this.postService.deletePost(id, user, sure);
    return UtilityHelper.response('post deleted successfully', null);
  }
}
