export default class SchemParser {
    getCompressedBlob(): Blob {
      throw new Error("Method not implemented.");
    }

    private error: string | null = null;
    private files: FileList;

    constructor(files: FileList) {
        this.files = files;
    }

    getError(): string {
      throw this.error;
    }
    hasError(): boolean {
      return this.error == null;
    }
    tryParsingFiles() {
      throw new Error("Method not implemented.");
    }
    tryCompressingFiles() {
        throw new Error("Method not implemented.");
      }
}