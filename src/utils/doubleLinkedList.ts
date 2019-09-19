export class DoubleListNode {
    next: DoubleListNode;
    previous: DoubleListNode;
    products: Set<string>
    hits: number;
    constructor(hits: number, productId: string){
        this.products = new Set(productId);
        this.hits = hits;
        this.next = null;
        this.previous = null;
    }
    add(productId: string){
        this.products.add(productId);
    }
    insertNext(hits: number, productId: string): DoubleListNode{
        if(this.next==null){
            const node = new DoubleListNode(hits, productId);
            node.previous = this;
            this.next = node;
            return this.next;
        }else if(this.next.hits>hits){
            const node = new DoubleListNode(hits, productId);
            node.previous = this;
            this.next.previous = node;
            node.next = this.next;
            this.next = node;
            return this.next;
        }else if(this.next.hits === hits){
            this.next.products.add(productId);
            return this.next;
        }else{
            throw new Error('unable to save in adjoining nodes for product:' + productId);
        }
    }
    insertAt(hits: number, productId: string): DoubleListNode{
        if(this.hits===hits){
            this.add(productId);
            return this;
        }else{
            if(this.next==null){
                const node = new DoubleListNode(hits, productId);
                node.previous = this;
                this.next = node;
                return this.next;
            }else if(this.next.hits>hits){
                const node = new DoubleListNode(hits, productId);
                node.previous = this;
                this.next.previous = node;
                node.next = this.next;
                this.next = node;
                return this.next;
            }else{
                return this.next.insertAt(hits, productId);
            }
        }
    }
    remove(productId: string){
        this.products.delete(productId);
        if(this.products.size == 0){
            if(this.previous){
                this.previous.next = this.next;
            }
            if(this.next){
                this.next.previous = this.previous;
            }
            return this.next;
        }
        return this;
    }
    removeRandom(): {head: DoubleListNode, productId: string}{
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

export class DoubleLinkedList {
    head: DoubleListNode;
    products: Set<string>;
    constructor(){
    }
    initHead(hits: number, productId: string){
        this.head = new DoubleListNode(hits, productId);
        this.products = new Set(productId);
    }
    insertAt(hits: number, productId: string): DoubleListNode{
        if(hits<this.head.hits){
            const newHead = new DoubleListNode(hits, productId);
            newHead.next = this.head;
            this.head = newHead;
        }
        const insertNode = this.head.insertAt(hits, productId);
        this.products.add(productId);
        return insertNode;
    }
    move(from: DoubleListNode, to: number, productId: string): DoubleListNode{
        const returnNode = from.insertNext(to, productId);
        const response = from.remove(productId);
        if(from===this.head){
            this.head = response;
        }
        return returnNode;
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