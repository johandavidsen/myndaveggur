import React from 'react'
import { storiesOf } from '@kadira/storybook'

import PhotoWall from '../../../src/components/photo-wall'

storiesOf('PhotoWall', module)
  .add('Default Options', () => (
    <PhotoWall />
  ))
