export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { 
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    { 
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      }
    },
    { 
      name: 'details',
      title: 'Details',
      type: 'string',
    },
    { 
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    {
      name: 'numReviews',
      title: 'NumReviews',
      type: 'number',
    },
    {
      name: 'countInStock',
      title: 'CountInStock',
      type: 'number',
    }
  ]
}