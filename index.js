'use strict'

export class Node {  
  constructor(key, value) {
    if (typeof key !== 'undefined' || typeof key !== null) {
      this.key = key
    }

    if (typeof value !== 'undefined' || typeof value !== null) {
      this.value = value
    }

    this.next = null
    this.prev = null
  }
}

export class LRUCache {
    constructor(limit = 100) {
        this._limit = limit

        this._map = new Map()
        this._head = null
        this._tail = null
    }

    setHead(node) {
        node.next = this._head
        node.prev = null

        if (this._head !== null) {
            this._head = node
        }

        this._head = node

        if (this._tail === null) {
            this._tail = node
        }

        this._map.add(node.key, node)
    }

    get(key) {
        if (this._map.has(key)) {
            let node = this._map.get(key)

            this.remove(node.key)
            this.setHead(node)

            return node.value
        }

        return null
    }

    set(key, value) {
        const node = new Node(key, value)

        if (this._map.has(key)) {
            this.remove(key)
        } else {
            if (this._map.size >= this._limit) {
                this._map.delete(this._tail.key)
                this._tail = this._tail.prev
                this._tail.next = null
            }
        }

        this.setHead(node)
    }

    remove(key) {
        if (this._map.has(key)) {
            const node = this._map.get(key)

            if (node.prev !== null) {
                node.prev.next = node.next
            } else {
                this._head = node.next
            }

            if (node.next !== null) {
                node.next.prev =  node.prev
            } else {
                this._tail = node.prev
            }

            this._map.delete(key)
        }
    }
}