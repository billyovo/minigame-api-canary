import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body, ip } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const endTime = Date.now();
      const duration = endTime - startTime;

      this.logger.log(`[${new Date().toISOString()}] ${ip} - ${method} ${originalUrl} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)} - ${statusCode} ${statusMessage} - ${duration}ms`);
    });

    next();
  }
}