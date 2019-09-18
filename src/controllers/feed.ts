import { TrendkeeperSingleton } from '../utils/trendkeeper';
const trends = TrendkeeperSingleton.getInstance()
export const feed = (req, res) => {
    trends.registerHit(req.swagger.params.product.value);
    res.end('done');
}