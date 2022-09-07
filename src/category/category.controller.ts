import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UtilityHelper } from 'src/helpers/utility.helper';
import { CategoryCredentialsDto } from './dto/category-credentials.dto';
import { CategoryService } from './category.service';

@Controller('api/v1/:postId/categories')
@UseGuards(AuthGuard())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('new')
  async createCategory(
    @Body(ValidationPipe) categoryCredentialsDto: CategoryCredentialsDto,
    @Param('postId') postId: string,
  ) {
    const category = await this.categoryService.createCategory(
      postId,
      categoryCredentialsDto,
    );
    return UtilityHelper.response('new category created', category);
  }

  @Get('')
  async getAllCategories(@Param('postId') postId: string) {
    const categories = await this.categoryService.getAllCategories(postId);
    return UtilityHelper.response(
      `all categories for post with id: ${postId}`,
      categories,
    );
  }

  @Patch(':id')
  async updateSingleCategory(
    @Body(ValidationPipe) categoryCredentialsDto: CategoryCredentialsDto,
    @Param('id') id: string,
    @Param('postId') postId: string,
  ) {
    const updatedCategory = await this.categoryService.updateSingleCategory(
      id,
      postId,
      categoryCredentialsDto,
    );
    return UtilityHelper.response(
      `category updated successfully`,
      updatedCategory,
    );
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);
    return UtilityHelper.response('category deleted successfully', null);
  }
}
