import React from 'react'
import classnames from 'classnames'

/**
 * @class Options
 *
 * This class is build on top of Modernizr and offers the user options to enable
 * different browser features:
 *
 * The features currently supported are:
 *
 * * geolocation - Enable/disable the GPS coordinations on the browser.
 *
 */
class Options extends React.Component {

  /**
   * @constructor
   *
   * The constructor initializes the state ( geoLoading, geoEnabled, geoError ) of the component and binds the function
   * toggleGeo.
   *
   */
  constructor (props) {
    super(props)
    this.state = {
      geoLoading: false,
      geoEnabled: false,
      geoError: ''
    }

    this._toggleGeo = this._toggleGeo.bind(this)
  }

  /**
   * @method _toggleGeo
   *
   *
   *
   */
  _toggleGeo () {
    if (!this.state.geoEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude)
          this.setState({ geoLoading: false })
        },
        (PositionError) => {
          // Disable the button
          this.setState({ geoLoading: false, geoError: PositionError.message })
        }
      )
      this.setState({ geoEnabled: !this.state.geoEnabled, geoLoading: true })
    }
    this.setState({ geoEnabled: !this.state.geoEnabled })
  }

  /**
   * @method render
   *
   *
   *
   */
  render () {
    let body = (<div />)
    // if (Modernizer && Modernizr.geolocation) {
    //   body = (
    //     <button type='button' className={classnames({ 'enabled': this.state.geoEnabled })} onClick={this._toggleGeo} >
    //     {this.state.geoLoading
    //     ? (<div className='small progress'><div>Loading…</div></div>)
    //     : ('Geo')
    //     }
    //     </button>
    //   )
    // }

    return (
      <div>
        {body}
      </div>
    )
  }
}

/**
 * @exports Options
 */
export default Options
