'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'sakshi-chawla-academy',
  title: 'Sakshi Chawla Academy CMS',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1lxnu5gg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document().schemaType('siteSettings').documentId('siteSettings')
              ),
            S.listItem()
              .title('Hero Section')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.listItem()
              .title('About Section')
              .child(S.document().schemaType('about').documentId('about')),
            S.listItem()
              .title('Meet Teacher')
              .child(S.document().schemaType('teacher').documentId('teacher')),
            S.listItem()
              .title('SEO Defaults')
              .child(S.document().schemaType('seoDefaults').documentId('seoDefaults')),
            S.divider(),
            S.documentTypeListItem('course').title('Courses'),
            S.documentTypeListItem('whyChooseUsItem').title('Why Choose Us'),
            S.documentTypeListItem('learningStep').title('Learning Process Steps'),
            S.documentTypeListItem('statistic').title('Statistics'),
            S.documentTypeListItem('studentResult').title('Student Results'),
            S.documentTypeListItem('galleryCategory').title('Gallery Categories'),
            S.documentTypeListItem('galleryImage').title('Gallery Images'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('googleReview').title('Google Reviews'),
            S.documentTypeListItem('faq').title('FAQs'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
