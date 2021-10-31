export class ReadFileError extends Error {
    constructor(message, filename) {
      super(message);
      this.name = filename;
      this.type = 'readError'
    }
}


export class EmptyDataError extends Error {
    constructor() {
        super()
        this.type = 'emptyData'
    }
}