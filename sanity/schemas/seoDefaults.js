import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seoDefaults',
  title: 'SEO Defaults',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'keywords', title: 'Keywords (comma separated)', type: 'string' }),
    defineField({ name: 'ogImage', title: 'Open Graph Image', type: 'image' }),
  ],
  preview: { prepare: () => ({ title: 'SEO Defaults' }) },
})
