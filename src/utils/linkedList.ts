class ListNode {
    next: ListNode;
    products: Set<string>
    hits: number;
    constructor(hits: number, productId: string){
        this.products = new Set(productId);
        this.hits = hits;
        this.next = null;
    }
    add(productId: string){
        this.products.add(productId);
    }
    insertAt(hits: number, productId: string){
        if(this.hits===hits){
            this.add(productId);
        }else{
            if(this.next==null){
                const node = new ListNode(hits, productId);
                this.next = node;
            }else if(this.next.hits>hits){
                const node = new ListNode(hits, productId);
                node.next = this.next;
                this.next = node;
            }else{
                this.next.insertAt(hits, productId);
            }
        }
    }
    removeAt(hits: number, productId: string, prev: ListNode){
        if(this.hits === hits){
            if(this.products.has(productId))
                this.products.delete(productId);
            if(this.products.size===0){
                if(this===prev){//  it was found at the head
                    return this.next;
                }else{
                    prev.next = this.next;
                }
            }
        }else{
            if(this.next){
                this.next.removeAt(hits, productId, this);
            }
            throw new Error('id not found in list');
        }
    }
    removeRandom(): {head: ListNode, productId: string}{
        const arr = Array.from(this.products);
        if(arr.length === 1){
            return {
                head: this.next,
                productId: arr[0]
            };
        }else{
            const index: number = Math.random()%arr.length;
            this.products.delete(arr[index]);
            return {
                head: this,
                productId: arr[index]
            }
        }
    }
    read(){
        if(this.next)
            return this.next.read().concat(Array.from(this.products))
        return Array.from(this.products);
    }
}

export class LinkedList {
    head: ListNode;
    products: Set<string>;
    constructor(){
    }
    initHead(hits: number, productId: string){
        this.head = new ListNode(hits, productId);
        this.products = new Set(productId);
    }
    insertAt(hits: number, productId: string){
        if(hits<this.head.hits){
            const newHead = new ListNode(hits, productId);
            newHead.next = this.head;
            this.head = newHead;
        }
        this.head.insertAt(hits, productId);
        this.products.add(productId)
    }
    removeAt(hits: number, productId: string){
        const response = this.head.removeAt(hits, productId, this.head);
        if(response){
            this.head = response;
        }
        this.products.delete(productId);
    }
    move(from: number, to: number, productId: string){
        this.head.insertAt(to, productId);
        const response = this.head.removeAt(from, productId, this.head);
        if(response){
            this.head = response;
        }
    }
    popOne(){
        const response = this.head.removeRandom()
        this.head = response.head;
        this.products.delete(response.productId);
    }
    readAll(){
        return this.head.read();
    }
}

// export const SingleTonList = (() => {
//     let instance: LinkedList;
//     function createInstance(hits: number, productId: string): LinkedList {
//         var list = new LinkedList(hits, productId);
//         return list;
//     }
//     return {
//         getInstance: function (hits?: number, productId?: string): LinkedList {
//             if (!instance) {
//                 // if(!hits || !productId){
//                 //     throw new Error('wrong init for linkedlist');
//                 // }
//                 instance = createInstance(hits, productId);
//             }
//             return instance;
//         }
//     };
// })();