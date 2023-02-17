import {SchemaTypeDefinition} from 'sanity'

import heroType from './components/header/hero'
import drawingType from './objects/artTypes/drawing'
import paintingType from './objects/artTypes/painting'
import photographType from './objects/artTypes/photograph'
import sculptureType from './objects/artTypes/sculpture'
import accessibleImage from './objects/utils/accessibleImage'
import artist from './pages/artist'
import artwork from './pages/artwork'
import authorType from './pages/author'
import bookType from './pages/book'
import collection from './pages/collection'
import event from './pages/event'
import exhibition from './pages/exhibition'
import locationType from './pages/location'
import pageType from './pages/page'
import postType from './pages/post'

export const previewTypes = [artwork.name, postType.name]

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    heroType,
    pageType,
    paintingType,
    drawingType,
    bookType,
    locationType,
    event,
    artwork,
    collection,
    exhibition,
    artist,
    sculptureType,
    photographType,
    postType,
    authorType,
    accessibleImage,
  ],
}
