import { configure } from '@kadira/storybook'

function loadStories () {
  require('../story/photoWall')
}

configure(loadStories, module)
