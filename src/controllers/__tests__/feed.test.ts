import { TrendkeeperSingleton } from '../../utils/trendkeeper';
import { feed } from '../feed';

const res = {
    end: jest.fn()
}
jest.mock('../../utils/trendkeeper', () => {
    return {
        TrendkeeperSingleton: {
            getInstance: () => {
                return {
                    list: new Array(),
                    registerHit: () => true
                }
            }
        }
    }
})
test('basic', () => { 
    expect(feed({
        swagger: {
            params: {
                product: {
                    value: 'asd'
                    }
                }
            }
        }, res));
    expect(res.end).toBeCalled();
    expect(res.end).toBeCalledWith('done');

});