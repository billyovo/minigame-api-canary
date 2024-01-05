import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  getRoot() {
    return {
      message:
        'You are at the root / of the API! Check out the API docs under /specs',
    };
  }
}
