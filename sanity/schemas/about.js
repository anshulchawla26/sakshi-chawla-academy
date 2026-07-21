import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'About the Academy' }),
    defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 4 }),
    defineField({ name: 'mission', title: 'Mission', type: 'text', rows: 3 }),
    defineField({ name: 'vision', title: 'Vision', type: 'text', rows: 3 }),
    defineField({ name: 'philosophy', title: 'Teaching Philosophy', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'About Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Concept-Based Learning', 'Personalized Attention'],
    }),
  ],
  preview: { prepare: () => ({ title: 'About Section' }) },
})
