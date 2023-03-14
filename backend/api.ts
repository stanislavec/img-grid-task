import { IPhoto } from './types';

export async function getPhotos(page: string) {
  const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=30`);
  return (await response.json()) as IPhoto[];
}
