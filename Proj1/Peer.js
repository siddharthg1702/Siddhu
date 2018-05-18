import { EventEmitter } from 'events';

export default class Peer extends EventEmitter {
  constructor(id1, name1) {
    super();
    id = id1;
    name = name1;
  }
}