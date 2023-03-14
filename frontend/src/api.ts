import { IPhoto } from './types';

export async function getPhotos(page: number) {
  const response = await fetch(`/api/getImages/?page=${page}`);
  return (await response.json()) as IPhoto[];
}
