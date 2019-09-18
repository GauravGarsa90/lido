import { TrendkeeperSingleton } from '../../utils/trendkeeper';
import { trending } from '../trending';

const res = {
    end: jest.fn()
}
jest.mock('../../utils/trendkeeper', () => {
    return {
        TrendkeeperSingleton: {
            getInstance: () => {
                return {
                    list: new Array(),
                    getTrendingList: () => ['asd', 'as']
                }
            }
        }
    }
});
test('basic', () => { 
    trending({}, res);
    expect(res.end).toBeCalledWith({
        timestamp: 'test',
        trending: ['asd', 'as']
    })
});