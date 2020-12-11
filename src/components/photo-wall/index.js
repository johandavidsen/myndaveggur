import React from 'react'
import axios from 'axios'

import './index.css'

/**
 * @class Photo
 */
export class Photo extends React.Component {
  /**
   *
   */
  constructor (props) {
    super(props)
    this.state = {
      images: [],
      nextFetch: 'https://api.github.com/users',
      error: null
    }

    this._loadImages = this._loadImages.bind(this)
  }

  componentDidMount () {
    this._loadImages()
  }

  _loadImages () {
    const images = this.state.images
    axios.get(this.state.nextFetch)
      .then((response) => {
        const { data, headers: { link } } = response
        const nextFetch = link.split(';')[0].slice(1, -1)
        // eslint-disable-next-line array-callback-return,camelcase
        data.map(({ avatar_url, login }) => {
          images.push({ url: avatar_url, name: login })
        })
        this.setState({ images: images, nextFetch: nextFetch })
      })
      .catch(({ code, message, response }) => {
        const { status, statusText, data } = response
        this.setState({ error: { status: status, statusText: statusText, message: data.message } })
      })
  }

  /**
   * @method render
   */
  render () {
    if (this.state.error) {
      return (
        <div className='error'>
          <div className='meta'>
            <div>{this.state.error.status}</div>
            <div>{this.state.error.statusText}</div>
          </div>
          <div>
            {this.state.error.message}
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className='app'>
          <div className='container'>
            {this.state.images.map((item, index) =>
              <div className='wrapper' key={index}>
                <img src={item.url} alt={item.name} />
              </div>)}
          </div>
        </div>
        <button onClick={this._loadImages}>load</button>
      </div>
    )
  }
}
