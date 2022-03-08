export class DataObj<A> {
  private data: A;

  constructor(data1: A) {
    this.data = data1;
  }
  static create<A>(data2: A) {
    return new DataObj<A>(data2);
  }
}
