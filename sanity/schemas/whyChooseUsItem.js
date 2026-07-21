import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'whyChooseUsItem',
  title: 'Why Choose Us Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({
      name: 'icon',
      title: 'Icon (lucide-react name)',
      type: 'string',
      initialValue: 'Award',
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'icon' } },
})
