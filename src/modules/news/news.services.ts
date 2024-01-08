import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NewsItem } from 'src/schemas/news.schema';
import { NewsListQueryDto } from './dto/newsDto';

@Injectable()
export class NewsService {
  constructor(@InjectModel('NewsItem') private newsModel: Model<NewsItem>) {}

  async getNewsList(newsListQueryDto: NewsListQueryDto) {
    const { limit, page } = newsListQueryDto;

    const query = {};

    const total = await this.newsModel.countDocuments(query);

    const news = await this.newsModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { total, rows: news };
  }

  async getNewsById(id: string) {
    return await this.newsModel.findById(new Types.ObjectId(id)).exec();
  }

  async createNews(newsItem: NewsItem) {
    const newNews = new this.newsModel(newsItem);
    return await newNews.save();
  }

  async updateNews(id: string, newsItem: NewsItem) {
    return await this.newsModel.findByIdAndUpdate(id, newsItem).exec();
  }

  async deleteNews(id: string) {
    return await this.newsModel.findByIdAndDelete(id).exec();
  }
}
