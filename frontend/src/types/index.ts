export type IPhoto = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export type IPhotoContext = {
  photos: IPhoto[];
  fetchNext(): void;
  addToFavorite(item: IPhoto): void;
  removeFromFavorite(id: string): void;
  favorites: IPhoto[];
  loading: boolean;
};
