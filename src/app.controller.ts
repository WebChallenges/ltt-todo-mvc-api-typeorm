import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @HttpCode(204)
  index() {
    return;
  }
}
