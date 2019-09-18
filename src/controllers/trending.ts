import { TrendkeeperSingleton } from '../utils/trendkeeper';
const trends = TrendkeeperSingleton.getInstance()
export const trending = (req, res) => {
    if(trends.list)
        res.end({
            timestamp: process.env.NODE_ENV === 'development' ? new Date().toDateString(): 'test',
            trending: trends.getTrendingList(),
            });
    else{
        res.end('no trending info found');
    }
}