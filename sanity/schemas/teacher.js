import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teacher',
  title: 'Meet Your Teacher',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Teacher Name', type: 'string', initialValue: 'Sakshi Chawla' }),
    defineField({ name: 'title', title: 'Title / Role', type: 'string', initialValue: 'Founder & Head Educator' }),
    defineField({ name: 'photo', title: 'Professional Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 4 }),
    defineField({ name: 'philosophy', title: 'Teaching Philosophy', type: 'text', rows: 3 }),
    defineField({ name: 'qualifications', title: 'Qualifications', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'experience', title: 'Experience', type: 'string' }),
    defineField({ name: 'achievements', title: 'Achievements', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Intro Video URL',
      type: 'url',
      description: 'Full YouTube video URL (watch or share link). Leave blank to show placeholder.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Meet Your Teacher' }) },
})
