import { LinkedList } from "./linkedList";
export const TrendkeeperSingleton = (() => {
    var instance;
    function createInstance(size: number): Trendkeeper {
        var trend = new Trendkeeper(size);
        return trend;
    }
    return {
        getInstance: function (size?: number): Trendkeeper {
            if (!instance && size) {
                instance = createInstance(size);
            }else if(!instance && !size){
                throw new Error("trending list size not given for initialization");
            }
            return instance;
        },
        deleteInstance: function () {
            if(process.env.NODE_ENV === 'development' ? false : true){
                instance = null;
            }
        }
    };
})();
class Trendkeeper{
    size: number;
    list: LinkedList;
    hitInfo: Map<string,number>;
    count: number;
    constructor(size: number){
        this.size = size;
        this.count = 0;
        this.list = new LinkedList();
    }
    registerHit(productId: string){
        let hitCount: number;
        if(!this.hitInfo){
            /**
             * Init trendkeeper if it is the first entry
             */
            this.hitInfo = new Map();
            this.list.initHead(1, productId);
            this.hitInfo[productId] = 1;
            this.count = 1;
        }else{
            /**
             * If trendkeeper has been initialized
             * get hit data for product if present
             */
            if(this.hitInfo[productId]){
                hitCount = this.hitInfo[productId] + 1;
            }else{
                hitCount = 1;
            }
            /**
             * If current product needs to be added to top k list add it
             */
            if(this.list.products.has(productId)){
                this.list.move(hitCount-1,hitCount,productId)
            }else if(this.count<this.size){
                this.list.insertAt(hitCount, productId)
                this.count++;
            }else if(hitCount>this.list.head.hits){
                this.list.insertAt(hitCount, productId)
                this.list.popOne();
            }
            this.hitInfo[productId] = hitCount;
        }
    }
    getTrendingList(): Array<string> {
        /**
         * fetch top k products
         */
        return this.list.readAll();
    }
}