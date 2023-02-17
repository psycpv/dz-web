import { defineType, defineField } from 'sanity'
import strings from 'constants/descriptions/visualArtwork'

export default defineType({
  name: 'visualArtWork',
  title: 'Visual Artwork',
  type: 'object',
  fields: [
    defineField({
      name: 'artEdition',
      title: 'artEdition',
      type: 'number',
      description: strings.artEdition
    }),
  ]
})