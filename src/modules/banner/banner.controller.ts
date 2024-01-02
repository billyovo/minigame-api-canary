import { Controller, Get, Param, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller('banner')
export class BannerController {
    constructor() {}

    @Get('/banner-today.png')
    getBannerToday(@Res() res: Response) {
        const imagePath = join(process.cwd(), `./src/public/banner-today.png`);
        const stream = createReadStream(imagePath);
        res.setHeader('Content-Type', 'image/png');
        stream.pipe(res);
    }

}
