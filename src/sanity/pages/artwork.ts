import { ThLargeIcon } from '@sanity/icons'
import { defineArrayMember,defineField, defineType } from 'sanity'

import drawing from '../objects/artTypes/drawing'
import painting from '../objects/artTypes/painting'
import photograph from '../objects/artTypes/photograph'
import sculpture from '../objects/artTypes/sculpture'
import artistType from './artist'

// Check If we will need prefilled fields
export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          title: 'Artist',
          to: [{ type: artistType.name }],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'artworksEdition',
      title: 'Artworks Edition',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          title: 'Artwork',
          to: [{ type: 'artwork' }],
        }),
      ],
    }),
    defineField({
      title: 'Artwork photos',
      name: 'photos',
      type: 'array',
      of: [defineArrayMember({ type: 'image' })],
    }),
    defineField({
      title: 'Artworks Type to fill',
      name: 'artworkTypeToFill',
      type: 'array',
      of: [
        defineArrayMember({ type: drawing.name }),
        defineArrayMember({ type: painting.name }),
        defineArrayMember({ type: photograph.name }),
        defineArrayMember({ type: sculpture.name }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {

      return { title }
    },
  },
})
