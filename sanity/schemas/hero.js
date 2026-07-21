import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'headingLine1', title: 'Heading Line 1', type: 'string', initialValue: 'Build Strong Concepts.' }),
    defineField({ name: 'headingLine2', title: 'Heading Line 2 (accent)', type: 'string', initialValue: 'Achieve Outstanding Results.' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'primaryCtaLabel', title: 'Primary CTA Label', type: 'string', initialValue: 'Enquire Now' }),
    defineField({ name: 'badge', title: 'Badge (small text above heading)', type: 'string', initialValue: 'Premium Coaching Since 2015' }),
  ],
  preview: { prepare: () => ({ title: 'Hero Section' }) },
})
