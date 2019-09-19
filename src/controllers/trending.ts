import { TrendkeeperSingleton } from '../utils/trendkeeper';
const trends = TrendkeeperSingleton.getInstance()
export const trending = (req, res) => {
    if(trends.hitInfo){
        const response = {
            timeStamp: process.env.NODE_ENV === 'test' ? 'test' : new Date().toDateString(),
            trending: trends.getTrendingList()
        }
        console.log(response);
        res.end(JSON.stringify(response));
    }
    else{
        res.end('no trending info found');
    }
}