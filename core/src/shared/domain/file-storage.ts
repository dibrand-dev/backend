export type ResultDownload = {
  AcceptRanges: string;
  ContentLength: number;
  ContentType: string;
  ETag: string;
  TagCount: 2;
  Body: Buffer;
};

export interface FileStorage {
  download(key: string, bucket?: string): Promise<ResultDownload>;
  upload(key: string, mimeType: string, bytesArray: any): Promise<any>
}
