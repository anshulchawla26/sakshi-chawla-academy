import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'learningStep',
  title: 'Learning Process Step',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Step Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'icon', title: 'Icon (lucide-react)', type: 'string', initialValue: 'MessageCircle' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'order' } },
})
