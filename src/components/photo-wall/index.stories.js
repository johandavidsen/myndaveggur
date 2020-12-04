
import PhotoWallContainer from './index'
import React from 'react'

export default {
  title: 'fjakkarin/PhotoWall',
  component: PhotoWallContainer
}

const Template = (args) => <PhotoWallContainer {...args} />

export const Basic = Template.bind({})
Basic.args = {
  primary: true
}
