import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'photograph',
  title: 'Photograph',
  type: 'object',
  fields: [
    defineField({
      name: 'abstract',
      title: 'abstract',
      type: 'text',
      description: 'An abstract is a short description that summarizes a CreativeWork.'
    }),
  ]
})