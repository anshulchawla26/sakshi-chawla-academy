import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Course Title', type: 'string' }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Choose a lucide-react icon name (e.g. GraduationCap, Calculator, Sigma, BookOpen, Sparkles)',
      initialValue: 'GraduationCap',
    }),
    defineField({ name: 'subjects', title: 'Subjects', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'mode', title: 'Mode', type: 'string', description: 'e.g. Online + Offline' }),
    defineField({ name: 'audience', title: 'Audience Note', type: 'string', description: 'e.g. For Indian & International Students' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'gradient', title: 'Card Gradient', type: 'string', options: { list: ['navy', 'orange', 'blend'] }, initialValue: 'navy' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'mode' } },
})
