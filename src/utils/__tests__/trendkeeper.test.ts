import { TrendkeeperSingleton } from '../trendkeeper'

test('hits are registered', () => { 
    const trend = TrendkeeperSingleton.getInstance(5);
    trend.registerHit('a');
    expect(trend.getTrendingList().toString()).toBe(['a'].toString());
    TrendkeeperSingleton.deleteInstance();
});
test('only top hits are returned in trending list', () => { 
    TrendkeeperSingleton.deleteInstance();
    const trend = TrendkeeperSingleton.getInstance(1);
    trend.registerHit('a');
    trend.registerHit('b');
    trend.registerHit('b');
    expect(trend.getTrendingList().toString()).toBe(['b'].toString());
});
test('trending list retains order', () => { 
    TrendkeeperSingleton.deleteInstance();
    const trend = TrendkeeperSingleton.getInstance(2);
    trend.registerHit('a');
    trend.registerHit('b');
    trend.registerHit('b');
    trend.registerHit('c');
    trend.registerHit('c');
    trend.registerHit('c');
    expect(trend.getTrendingList().toString()).toBe(['c', 'b'].toString());
});