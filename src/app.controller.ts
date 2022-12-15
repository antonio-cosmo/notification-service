import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll() {
    return await this.appService.findAll();
  }

  @Post()
  async create(@Body() data: CreateNotificationDto){
    const {recipientId, content, category} = data
   await this.appService.create({recipientId, content, category});
  }
 
}
