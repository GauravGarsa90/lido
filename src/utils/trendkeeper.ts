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
            console.log('-------=-==================', process.env.NODE_ENV);
            if(process.env.NODE_ENV === 'development' ? false : true){
                console.log('----------------instance deleted----------------');
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
        console.log('initial list:', this.list);
        let hitCount: number;
        if(!this.hitInfo){
            console.log('new list');
            this.hitInfo = new Map();
            this.list.initHead(1, productId);
            this.hitInfo[productId] = 1;
            this.count = 1;
        }else{
            if(this.hitInfo[productId]){
                hitCount = this.hitInfo[productId] + 1;
                console.log('hasId, countNew:', hitCount);
            }else{
                hitCount = 1;
                console.log('id not present');
            }
            if(this.list.products.has(productId)){
                console.log('moving id:', productId, ' to ', hitCount);
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
        console.log('new list:', this.list);
    }
    // registerHit(productId: string){
    //     console.log('initial list:', this.list);
    //     let hitCount: number;
    //     if(!this.hitInfo){
    //         console.log('new list');
    //         this.hitInfo = new Map();
    //         this.list.initHead(1, productId);
    //         this.hitInfo[productId] = 1;
    //     }else{
    //         if(this.hitInfo[productId]){
    //             hitCount = this.hitInfo[productId] + 1;
    //             console.log('hasId, countNew:', hitCount);
    //         }else{
    //             hitCount = 1;
    //             console.log('id not present');
    //         }
    //         if(this.list.has(productId)){
    //             console.log('moving id:', productId, ' to ', hitCount);
    //             this.list.moveTo(hitCount-1,hitCount,productId)
    //         }else if(this.count<this.size){
    //             this.list.saveAt(hitCount, productId)
    //         }else if(hitCount>this.list.leastFrequency()){
    //             this.list.removeLeastFrequent();
    //             this.list.saveAt(hitCount, productId)
    //         }
    //         this.hitInfo[productId] = hitCount;
    //     }
    //     console.log('new list:', this.list);
    // }
    // registerHit1(productId: string){
    //     let hitCount: number;
    //     if(!this.hitInfo && !this.DLRLHead){
    //         console.log('creating new list');
    //         hitCount = 1;
    //         this.hitInfo = new Map();
    //         this.DLRLHead = new DLRLNode(hitCount,productId);
    //         this.hitInfo[productId] = this.DLRLHead;
    //         return;
    //     }else if((!this.hitInfo && this.DLRLHead) || (this.hitInfo && !this.DLRLHead)){
    //         console.log('resetting cache to remove error');
    //         this.hitInfo = new Map();
    //         this.hitInfo[productId] = 1;
    //         hitCount = 1;
    //         this.DLRLHead = new DLRLNode(hitCount,productId);
    //         return;
    //     }else{
    //         console.log('searching list', this.hitInfo);
    //         if(this.hitInfo[productId]){
    //             console.log('entry found');
    //             if(typeof this.hitInfo[productId] === "number"){
    //                 console.log('type: number');
    //                 hitCount = this.hitInfo[productId] + 1;
    //                 if(this.count<this.size){
    //                     this.DLRLHead.findAndInsertForHitCount(hitCount,productId);
    //                 }else if(hitCount>this.DLRLHead.getHits()){
    //                     this.DLRLHead.findAndInsertForHitCount(hitCount,productId);
    //                     this.DLRLHead =  this.DLRLHead.reduceSize();
    //                 }
    //             }else{
    //                 console.log(typeof this.hitInfo[productId])
    //                 hitCount = this.hitInfo[productId].getHits() + 1;
    //                 if(this.DLRLHead===this.hitInfo[productId] && this.hitInfo[productId].size()==1){
    //                     console.log('single unit head edit');
    //                     this.DLRLHead = this.hitInfo[productId].removeProduct(productId);
    //                     this.hitInfo[productId] = this.DLRLHead;
    //                 }else{
    //                     console.log('edit');
    //                     this.hitInfo[productId].removeProduct(productId);
    //                 }

    //                 console.log('interim list', this.hitInfo);
    //                 // const prevLink = this.hitInfo[productId];
    //                 if(!this.DLRLHead){
    //                     this.DLRLHead = new DLRLNode(hitCount, productId);
    //                     this.hitInfo[productId] = this.DLRLHead;
    //                 }else if(!this.hitInfo[productId]){
    //                     this.hitInfo[productId] = this.DLRLHead.findAndInsertForHitCount(hitCount,productId);
    //                 }else{
    //                     console.log('interim 2 list', this.hitInfo);
    //                     if( this.hitInfo[productId].next.getHits()==hitCount){
    //                         const tmpRef = this.hitInfo[productId].next;
    //                         tmpRef.insertProduct(productId);
    //                         this.hitInfo[productId] = tmpRef;
    //                         // return;
    //                     }else{
    //                         const tmpRef = new DLRLNode(hitCount,productId);
    //                         this.hitInfo[productId].pushInNewNextNode(tmpRef);
    //                         this.hitInfo[productId] = tmpRef;
    //                         // return;
    //                     }
    //                 }
    //             }
    //         }else{
    //             console.log('new product');
    //             hitCount = 1;
    //             if(this.count<this.size){
    //                 if(hitCount<this.DLRLHead.getHits()){
    //                     const newHead = new DLRLNode(hitCount, productId);
    //                     newHead.next = this.DLRLHead;
    //                     newHead.previous = this.DLRLHead.previous;
    //                     this.DLRLHead.previous = newHead;
    //                     this.DLRLHead = newHead;
    //                 }
    //                 this.hitInfo[productId] = this.DLRLHead.findAndInsertForHitCount(hitCount,productId);
    //             }else if(hitCount>this.DLRLHead.getHits()){
    //                 this.DLRLHead =  this.DLRLHead.reduceSize();
    //                 if(!this.DLRLHead){
    //                     this.DLRLHead = new DLRLNode(hitCount, productId);
    //                     this.hitInfo[productId] = this.DLRLHead;
    //                 }else{
    //                     this.hitInfo[productId] = this.DLRLHead.findAndInsertForHitCount(hitCount,productId);
    //                 }
    //             }
    //         }
    //     }
    //     console.log('new list', this.hitInfo);
    //     console.log('new head', this.DLRLHead);
    //     return;
    // }
    getTrendingList(): Array<string> {
        return this.list.readAll();
    }
}