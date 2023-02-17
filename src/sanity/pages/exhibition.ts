import { defineType, defineField, defineArrayMember } from 'sanity'
import { DashboardIcon } from '@sanity/icons'

import eventType from './event'
import artworkType from './artwork'
import collectionType from './collection'

export default defineType({
  name: 'exhibition',
  title: 'Exhibition',
  icon: DashboardIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'exhibitionDescription',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: eventType.name }],
        }),
      ],
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'artworks',
      title: 'Artworks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: artworkType.name }],
        }),
      ],
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [ {type: collectionType.name}],
        }),
      ]
    })
  ],
})
