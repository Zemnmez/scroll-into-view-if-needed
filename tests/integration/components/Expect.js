import PropTypes from 'prop-types'
import { Component, Fragment, createRef } from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'

export default class Expect extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    toBe: PropTypes.func.isRequired,
    options: PropTypes.object,
  }
  static defaultProps = {
    setup: () => {},
  }

  target = createRef()

  state = { test: undefined }

  componentDidMount() {
    console.log('interesting')
    const node = this.target.current
    const { setup, options, toBe } = this.props

    setup(node)
    scrollIntoView(node, options)
    this.setState({ test: toBe(node) ? 'pass' : 'fail' })
  }

  render() {
    return this.props.children({
      target: (
        <div
          className={`test-assertion test-${this.state.test}`}
          ref={this.target}
        />
      ),
    })
  }
}
