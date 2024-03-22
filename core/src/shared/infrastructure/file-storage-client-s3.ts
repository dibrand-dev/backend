import { S3 } from 'aws-sdk'
import { FileStorage, ResultDownload } from "../domain/file-storage";

export class FileStorageClientS3 implements FileStorage {
  private readonly bucket: string
  private options: any
  private s3: any

  constructor(bucket: string, options: any) {
    this.bucket = bucket
    this.options = options
    this.s3 = new S3()
  }

  private static _toBuffer(ab: any): any {
    const buf = new Buffer(ab.length)
    const view = new Uint8Array(ab)
    for (let i = 0; i < buf.length; ++i) {
      buf[i] = view[i]
    }
    return buf
  }

  async download(key: string, bucket?: string): Promise<ResultDownload> {
    const params = {
      Bucket: bucket || this.bucket,
      Key: key
    };
    console.debug('FSC.DOWNLOAD.S3_PARAMS:', { params });
    return await this.s3.getObject(params).promise();
  }

  async isExist(key: string): Promise<any> {
    console.debug('S3_CLIENT.IS_EXIST:', { key })
    const params = {
      Bucket: this.bucket,
      Key: key
    }
    return await this.s3.headObject(params).promise()
  }

  async upload(key: string, mimeType: string, bytesArray: any): Promise<any> {
    console.debug('FSC.UPLOAD.PARAMS', { key, mimeType })
    const buffer = FileStorageClientS3._toBuffer(bytesArray)
    const params = {
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      Bucket: this.bucket
    }

    return {
      eTag: (await this.s3.putObject(params).promise()).ETag,
      fileName: params.Key
    }
  }

  async uploadBuffer(
    path: string,
    fileName: string,
    extension: string,
    mimeType: string,
    buffer: Buffer
  ): Promise<any> {
    console.debug('S3_CLIENT.UPLOAD.PARAMS', { path, fileName, mimeType })
    const params = {
      Key: extension ? `${path}/${fileName}.${extension}` : `${path}/${fileName}`,
      Body: buffer,
      ContentType: mimeType,
      Bucket: this.bucket
    }

    return {
      eTag: (await this.s3.putObject(params).promise()).ETag,
      fileName: params.Key
    }
  }

  async move(srcBucket: string, srcObject: string, destBucket: string, destObject?: string): Promise<void> {
    console.debug('STORAGE_CLIENT.MOVE.PARAMS', { srcBucket, srcObject, destBucket, destObject })

    await this.s3
      .copyObject({
        CopySource: `${srcBucket}/${srcObject}`,
        Bucket: destBucket,
        Key: destObject || srcObject
      })
      .promise()

    await this.s3
      .deleteObject({
        Bucket: srcBucket,
        Key: srcObject
      })
      .promise()
  }
}
