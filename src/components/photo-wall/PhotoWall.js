import React from 'react'
import './photo-wall.scss'

/**
 * @class Photo
 */
class Photo extends React.Component {

  /**
   * @method render
   */
  render () {
    let { source } = this.props
    return (
      <img className='photo-wall-row-image' src={source} />
    )
  }
}

/**
 * @prop { string } source -
 */
Photo.PropTypes = {
  source: React.PropTypes.string
}

/**
 * @class PhotoWall
 *
 *
 */
class PhotoWall extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      viewPortHeight: 0,
      viewPortWidth: 0
    }
  }

  /**
   *
   */
  componentDidMount () {
    let { wall } = this.refs
    this.setState({ viewPortHeight: wall.clientHeight, viewPortWidth: wall.clientWidth })
  }

  /**
   * @method render
   *
   *
   */
  render () {
    let displayRows = []
    let i = 0
    let c = 0
    let col = 0
    if (this.state.viewPortHeight / 20 > 0.5) col = Math.ceil(this.state.viewPortWidth / 20)
    else col = Math.round(this.state.viewPortWidth / 20)
    let row = Math.round(this.state.viewPortHeight / 20)
    // Build photo grid
    while (++i <= row) {
      let displayCol = []
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
export default PhotoWall
