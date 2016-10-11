import React from 'react'
import { storiesOf } from '@kadira/storybook'

import Options from '../../../src/components/options'

storiesOf('Options', module)
  .add('Default Options', () => (
    <Options />
  ))
