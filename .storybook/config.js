import { configure } from '@kadira/storybook'

function loadStories () {
  require('../scripts/stories/photoWall')
}

configure(loadStories, module)
