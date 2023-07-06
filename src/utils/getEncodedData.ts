import { Product } from '@/types/types';
import hasUnicodeCharacters from './hasUnicodeCharacters';

const getEncodedData = (data:Product) => {
    const encodedData = Object.entries(data).reduce((acc: any, [key, value]) => {
      if (hasUnicodeCharacters(value)) {
        acc[key] = encodeURIComponent(value as string);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  
    return encodedData;
  }
  
  export default getEncodedData;
