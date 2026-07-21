import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'googleReview',
  title: 'Google Review',
  type: 'document',
  fields: [
    defineField({ name: 'reviewerName', title: 'Reviewer Name', type: 'string' }),
    defineField({ name: 'photo', title: 'Reviewer Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'review', title: 'Review Text', type: 'text', rows: 4 }),
    defineField({ name: 'rating', title: 'Rating (1-5)', type: 'number', initialValue: 5 }),
    defineField({ name: 'date', title: 'Date', type: 'string', description: 'e.g. 2 weeks ago' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'reviewerName', subtitle: 'rating' } },
})
