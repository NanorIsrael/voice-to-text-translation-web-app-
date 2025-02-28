export type Category = {
	id: string,
	name: string,
	image: string,
	description: string,
  quantity: number,
	subcategory: {
		id: string,
		name: string,
		description: string,
		category: string
	}
}

export type Subcategory = {
  id: string
  name: string
  description: string
  category: string
}

export type Product = {
  id: string
  name: string
  description: string
  price: string
  category: Category
  subcategory: Subcategory,
  colors: string[],
  sizes: string[],
  brand: string
  weights: string[],
  group: string
  cover_image: string
  product_images: [
    {
      image: string
      product: string
    },
  ],
  currency: string
  quantity: number
  status: string,
  total_rating: number
};

export type ProductExt = {
  title: string,
  reviews: number,
  price: string,
  discountedPrice: number,
  img: string,
  id: string,
  images: string[],
  imgs: { thumbnails: string[], previews: string[] },
}