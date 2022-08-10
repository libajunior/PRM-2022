import 'reflect-metadata';
import { Product } from './entity/Product';
import { Category } from './entity/Category';
import { Brand } from './entity/Brand';
import {DataSource} from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'prmdb',
    synchronize: true,
    logging: true,
    entities: [Brand, Category, Product]
});