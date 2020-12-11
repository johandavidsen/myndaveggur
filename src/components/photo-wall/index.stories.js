import React from 'react'
import { Photo } from './index'

export default {
  title: 'fjakkarin/PhotoWall',
  component: Photo
}

const Template = (args) => <Photo {...args} />

export const Basic = Template.bind({})
