import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
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
    @Body() postCredentialsDto: PostCredentialsDto,
    @CurrentUser() user: UserDocument,
  ) {
    const post = await this.postService.createPost(postCredentialsDto, user);
    return UtilityHelper.response('new post created', post);
  }
}
