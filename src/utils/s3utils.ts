import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

const client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_REGION as string,
});

/**
 * Upload a file to S3 Bucket
 * @param data Base64 encoded
 * @param folder Folder name
 * @param name File name
 * @returns S3 public url
 */
export default async function uploadToS3(data: string, folder: string, name: string) {
    try {
        const Body = Buffer.from(data.split(',')[1], 'base64');
        const Bucket = process.env.AWS_BUCKET as string;
        const Key = `${folder}/${uuidv4()}_${name}`;

        // Upload to the bucket
        client.send(new PutObjectCommand({
            Bucket, Key, Body
        }));

        return `https://${Bucket}.s3.amazonaws.com/${Key}`;
    } catch (err) { 
        console.error(err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }
}