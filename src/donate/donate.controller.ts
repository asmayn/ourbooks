import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DonateService } from './donate.service';
import { get } from 'http';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Donate')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('donates')
export class DonateController {
  // private donateService = DonateService;
  constructor(private donateService: DonateService) {}

  @Get()
  async findAll() {
    return this.donateService.findAll();
  }
  // async findAll() {
  //   return this.donateService.findAll();
  // }
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.donateService.remove(+id);
  // }
  // @Get(':id')
  // findOne() {}
  @Get(':id') // Get /users/id
  findOne(@Param('id') id: string) {
    return this.donateService.findOne(+id);
  }
}
