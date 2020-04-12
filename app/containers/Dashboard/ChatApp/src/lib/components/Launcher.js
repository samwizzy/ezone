import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ChatWindow from './ChatWindow'
import DefaultLauncherIcon from './icons/DefaultLauncherIcon'
import defaultLauncherIconActive from './../assets/close-icon.png'

class Launcher extends Component {
  static propTypes = {
    onMessageWasReceived: PropTypes.func,
    onMessageWasSent: PropTypes.func,
    newMessagesCount: PropTypes.number,
    isOpen: PropTypes.bool,
    handleClick: PropTypes.func,
    messageList: PropTypes.arrayOf(PropTypes.object),
    showEmoji: PropTypes.bool,
    launcherIcon: PropTypes.string,
    launcherIconActive: PropTypes.string,
  }
  constructor() {
    super()
    this.state = {
      isOpen: false,
    }
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick()
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      })
    }
  }

  render() {
    const isOpen = this.props.hasOwnProperty('isOpen')
      ? this.props.isOpen
      : this.state.isOpen
    const classList = ['sc-launcher', isOpen ? 'opened' : '']
    return (
      <div>
        <div />
        <div
          className={classList.join(' ')}
          onClick={this.handleClick.bind(this)}
        >
          <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
          <img
            alt="open"
            className="sc-open-icon"
            src={this.props.launcherIconActive}
          />
          {this.props.launcherIcon ? (
            <img
              alt="close"
              className="sc-closed-icon"
              src={this.props.launcherIcon}
            />
          ) : (
            <DefaultLauncherIcon className="sc-closed-icon" />
          )}
        </div>
        <ChatWindow
          messageList={this.props.messageList}
          onUserInputSubmit={this.props.onMessageWasSent}
          agentProfile={this.props.agentProfile}
          isOpen={isOpen}
          onClose={this.handleClick.bind(this)}
          showEmoji={this.props.showEmoji}
        />
      </div>
    )
  }
}

const MessageCount = props => {
  if (props.count === 0 || props.isOpen === true) {
    return null
  }
  return <div className="sc-new-messsages-count">{props.count}</div>
}

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true,
  launcherIconActive: defaultLauncherIconActive,
}

export default Launcher
