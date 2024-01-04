import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { NewsItem } from 'src/schemas/news.schema';
import { NewsListQueryDto } from './dto/newsDto';

@Injectable()
export class NewsService {
    constructor(@InjectModel('NewsItem') private newsModel : Model<NewsItem>) {}

    async getNewsList(newsListQueryDto : NewsListQueryDto){
        const { limit, before } = newsListQueryDto;

        let query = {};
        if(before) query['_id'] = { $lt: before };

        const news = await this.newsModel.find(query, { _id: 1, title: 1, publish_date: 1}).limit(limit);
        const total = await this.newsModel.countDocuments(query);

        return { total, rows: news };
    }
    
    async getNewsById(id: string){
        return await this.newsModel.findById(new Types.ObjectId(id)).exec();
    }

    async createNews(newsItem: NewsItem){
        const newNews = new this.newsModel(newsItem);
        return await newNews.save();
    }

    async updateNews(id: string, newsItem: NewsItem){
        return await this.newsModel.findByIdAndUpdate(id, newsItem).exec();
    }

    async deleteNews(id: string){
        return await this.newsModel.findByIdAndDelete(id).exec();
    }
}
