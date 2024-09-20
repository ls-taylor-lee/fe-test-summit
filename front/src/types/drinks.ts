export type IPicture = {
  id?: number;
  name: string;
  mimetype: string;
  path: string;
  createdAt: string;
  updatedAt: string;
};

export type IDrink = {
  pictures: Array<IPicture>;
  createdAt: string;
  description: string;
  id?: number;
  name: string;
  reviewAverageRating: number;
  reviewCount: number;
  updatedAt: string;
};

export type IDrinkForm = {
  name: string;
  description: string;
};

export type IReview = {
  id?: number;
  drinkId: number;
  user_name: string;
  description: string;
  rating: number;
  updatedAt?: string;
  createdAt?: string;
};

export type IReviewForm = {
  user_name: string;
  rating: number;
  description: string;
};
