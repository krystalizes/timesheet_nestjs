import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
@Injectable()
export class CloudflareService {
  private logger = new Logger(CloudflareService.name);
  private endpoint: string;
  private cloudflare: S3Client;
  constructor() {
    this.endpoint = process.env.CLOUDFLARE_ENDPOINT;
    this.cloudflare = new S3Client({
      region: 'auto',
      endpoint: this.endpoint,
      credentials: {
        secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY,
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY,
      },
    });
  }
  async uploadFile(file: Express.Multer.File, key: string) {
    const bucket = process.env.CLOUDFLARE_BUCKET;
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    try {
      const response: PutObjectCommandOutput = await this.cloudflare.send(
        new PutObjectCommand(input),
      );
      if (response.$metadata.httpStatusCode === 200) {
        return `${process.env.CLOUDFLARE_PUBLIC_URL}/${key}`;
      }
      throw new Error('Img not saved');
    } catch (err) {
      this.logger.error('cannot save file', err);
      throw err;
    }
  }
  async deleteFile(key: string) {
    const bucket = process.env.CLOUDFLARE_BUCKET;
    const deleteParams = {
      Bucket: bucket,
      Key: key,
    };
    try {
      await this.cloudflare.send(new DeleteObjectCommand(deleteParams));
      this.logger.log(`Deleted file ${key}`);
    } catch (err) {
      this.logger.error(`Failed to delete file ${key}`, err);
      throw err;
    }
  }
}
