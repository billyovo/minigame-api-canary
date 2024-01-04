import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('banner')
@Controller('banner')
export class BannerController {
    constructor() {}

    @Get('/banner-today.png')
    @ApiOperation({ summary: 'Get banner image, showing nearest event' })
    getBannerToday(@Res() res: Response) {
        const path = process.env.NODE_ENV === 'production' ? './dist' : './src';
        const imagePath = join(process.cwd(), `${path}/public/banner-today.png`);
        const stream = createReadStream(imagePath);
        res.setHeader('Content-Type', 'image/png');
        stream.pipe(res);
    }

}
