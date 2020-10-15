import * as contentful from 'contentful'

export interface Product {
  id: string,
  name: string,
  prices: ProductPrices,
  description: string,
  image: string,
  fileGuid: string,
}

export interface ProductPrices {
  physical: number,
  digital: number
}

const Products: Product[] = [
  {
    id: "demo-starry-night",
    name: "Starry Night",
    prices: {
      physical: 79.95,
      digital: 29.75
    },
    description: "High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh.",
    image: "/images/starry-night.jpg",
    fileGuid: "09e589c7-3d18-4c2e-9cee-4f447e9f054a"
  },
  {
    id: "demo-rosy",
    name: "Rosy-Fingered Dawn at Louse Point",
    prices: {
      physical: 49.95,
      digital: 29.75
    },
    description: "The title Rosy-Fingered Dawn at Louse Point refers to one of Willem de Kooning's favourite places in Long Island.",
    image: "/images/rosy.jpg",
    fileGuid: "98dbd416-159d-4f76-8a59-30703cf6189f"
  },
  {
    id: "demo-irises",
    name: "Irises",
    prices: {
      physical: 65.95,
      digital: 29.75
    },
    description: "Irises is yet again, another painting by the Dutch artist Vincent van Gogh.",
    image: "/images/irises.jpg",
    fileGuid: "66edfe7f-0851-4418-93e8-785975df7318"
  },
  {
    id: "demo-almond",
    name: "Branches with Almond Blossom",
    prices: {
      physical: 99.95,
      digital: 29.75
    },
    description: "Branches with Almond Blossom is another van Gogh painted in 1890.",
    image: "/images/almond.jpg",
    fileGuid: "79b1504d-9127-4e7f-bcdb-dff84a337775"
  },
]

const client = contentful.createClient({
  space: 'ar34yuvr7cd3',
  accessToken: 'QiLfFxRasUe656jVwRAZA-SSQMJWQYdP2RGRwmhbcc8'
})

export const getContentfulProducts = async (): Promise<any[]> => {
  const p = await client.getEntries({
    content_type: 'product',
    include: 10
  })

  return p.items
}

export const toProduct = (contentfulProduct: contentful.Entry<any>): Product => {
  return {
    id: contentfulProduct.fields.id,
    name: contentfulProduct.fields.name,
    prices: contentfulProduct.fields.prices.map(toPriceMap).reduce((acc: any, c: any) => Object.assign({}, acc, c), {}),
    description: contentfulProduct.fields.description,
    image: contentfulProduct.fields.image.fields.file.url,
    fileGuid: contentfulProduct.fields.fileGuid,
  }
}

const toPriceMap = (price: any) => {
  return {
    [price.fields.id]: price.fields.price
  }
}

export default Products;