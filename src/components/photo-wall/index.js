import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import ImageLoader from 'react-imageloader'

//import './photo-wall.scss'

/**
 * @class Photo
 */
class Photo extends React.Component {

  /**
   * @method render
   */
  render () {
    const { source } = this.props

    return (
      <ImageLoader
        src={source}
        wrapper={React.createFactory('div')}
        // preloader={preloader}
        className='photo-wall-row-image'
      />
    )
  }
}

/**
 * @prop { string } source -
 */
Photo.PropTypes = {
  source: PropTypes.string
}

/**
 * @class PhotoWall
 *
 *
 */
class PhotoWall extends React.Component {

  /**
   * @constructor
   *
   *
   */
  constructor (props) {
    super(props)
    this.state = {
      viewPortHeight: 0,
      viewPortWidth: 0,
      images: []
    }
    this._screenResize = this._screenResize.bind(this)
  }

  // componentWillReceiveProps (nextProps) {
  //  const { images } = nextProps
  //  if (images.length > 0) {
  //    // Build Data structure
  //    this.setState({ images: images })
  //  }
  // }

  /**
   * @method componentDidMount
   */
  componentDidMount () {
    window.addEventListener('resize', this._screenResize)
    this._screenResize({ type: 'resize' })
  }

  /**
   * @method _screenResize
   */
  _screenResize () {
    const { wall } = this.refs
    if (wall) {
      this.setState({ viewPortHeight: wall.clientHeight, viewPortWidth: wall.clientWidth })
    }
  }

  /**
   * @method componentWillUnmount
   */
  componentWillUnmount () {
    window.removeEventListener('resize', this._screenResize)
  }

  /**
   * @method render
   */
  render () {
    const { images } = this.state
    const displayRows = []
    let i = 0
    let c = 0
    let col = 0
    if (this.state.viewPortHeight / 20 > 0.5) col = Math.ceil(this.state.viewPortWidth / 20)
    else col = Math.round(this.state.viewPortWidth / 20)
    const row = Math.round(this.state.viewPortHeight / 20)
    // Build photo grid
    while (++i <= row) {
      const displayCol = []
      while (++c <= col) {
        displayCol.push({ src: 'https://unsplash.it/40/40?random' })
      }
      displayRows.push(displayCol)
      c = 0
    }
    //
    return (
      <div ref='wall' className='photo-wall'>
        {displayRows.map((line, i) => {
          return (
            <div key={i} className='photo-wall-row'>
              {line.map((object, c) => {
                return (<Photo key={c} source={object.src} />)
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

/**
 * @exports PhotoWall
 *
 *
 */
export default class PhotoWallContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      images: []
    }
  }

  /**
   * @method componentDidMount
   */
  componentDidMount () {
    axios.get('https://api.github.com/users')
      .then((response) => {
        // , headers
        const { data } = response
        // const { link } = headers
        // Get the images from GitHub
        const images = []
        // Get url
        data.map((user) => {
          images.push(user.avatar_url)
        })
        this.setState({ images: images })
      })
  }

  /**
   * @method render
   */
  render () {
    const { images } = this.state
    return (
      <PhotoWall images={images} />
    )
  }
}
