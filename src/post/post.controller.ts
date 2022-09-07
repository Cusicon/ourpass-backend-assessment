import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UtilityHelper } from 'src/helpers/utility.helper';
import { UserDocument } from 'src/user/schemas/user.schema';
import { CurrentUser } from 'src/user/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('api/v1/posts')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('new')
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: UserDocument,
  ) {
    const post = await this.postService.createPost(createPostDto, user);
    return UtilityHelper.response('new post created', post);
  }
}
