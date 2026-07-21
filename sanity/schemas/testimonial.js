import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'parentName', title: 'Parent Name', type: 'string' }),
    defineField({ name: 'studentName', title: 'Student Name', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo (parent or student)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'review', title: 'Review', type: 'text', rows: 4 }),
    defineField({ name: 'rating', title: 'Rating (1-5)', type: 'number', initialValue: 5 }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'parentName', subtitle: 'studentName' } },
})
