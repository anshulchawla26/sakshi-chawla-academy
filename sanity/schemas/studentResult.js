import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'studentResult',
  title: 'Student Result',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Student Name', type: 'string' }),
    defineField({ name: 'photo', title: 'Student Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'class', title: 'Class', type: 'string' }),
    defineField({ name: 'subject', title: 'Subject', type: 'string' }),
    defineField({ name: 'marks', title: 'Marks', type: 'string', description: 'e.g. 98/100 or 95%' }),
    defineField({ name: 'story', title: 'Success Story', type: 'text', rows: 3 }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'marks' } },
})
