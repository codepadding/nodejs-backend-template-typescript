import axios from 'axios';
import sizeOf from 'image-size';
import { createHash } from 'crypto';

async function getImageSize(imageUrl : string) {
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const dimensions = sizeOf(response.data);
      console.log('Image dimensions:', dimensions);
    } catch (error) {
      console.error('Error:', error);
    }
  }


// getImageSize('https://lh3.googleusercontent.com/a/ACg8ocIc3kK0S9P2yGgs_q085DTpLDAVBOpeNt4ZwN2Kt72k=s96-c')


export const genApiSecretKey = (): string => {
  const length: number = 32;
  const charset: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal: string = "";
  for (let i: number = 0, n: number = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }

  return retVal;
};



export function generateSecretKey(): string {
  const secretKey = createHash('sha256')
    .update(Math.random().toString())
    .digest('hex');

  return secretKey;
}