import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statistic',
  title: 'Statistic',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'value', title: 'Numeric Value', type: 'number' }),
    defineField({ name: 'suffix', title: 'Suffix (e.g. +, %, /5)', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon (lucide-react)', type: 'string', initialValue: 'Users' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'label', subtitle: 'value' } },
})
