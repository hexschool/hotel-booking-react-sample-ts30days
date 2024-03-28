import { fetchData } from '@core';
import { Culinary, News } from '@types';

export const fetchNewsList = async () => fetchData<News[]>('GET', '/home/news');

export const fetchCulinaryList = async () => fetchData<Culinary[]>('GET', '/home/culinary');
