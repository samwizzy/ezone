import React, { Component } from 'react'
import EmojiConvertor from 'emoji-js'
import emojiData from './emojiData'

class EmojiPicker extends Component {
  constructor() {
    super()
    this.emojiConvertor = new EmojiConvertor()
    this.emojiConvertor.init_env()
    this.state = {
      hidden: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ hidden: false })
    }, 1)
    this.domNode.focus() // works with onBlur to close the picker
  }

  render() {
    const { hidden } = this.state
    return (
      <div
        tabIndex="0"
        style={{ opacity: hidden ? 0 : 1, transition: 'opacity 350ms' }}
        onBlur={this.props.onBlur}
        className="sc-emoji-picker"
        ref={e => {
          this.domNode = e
        }}
      >
        <div className="sc-emoji-picker--content">
          {emojiData.map(category => {
            return (
              <div className="sc-emoji-picker--category" key={category.name}>
                <div className="sc-emoji-picker--category-title">
                  {category.name}
                </div>
                {category.emojis.map(emoji => {
                  return (
                    <span
                      key={emoji}
                      className="sc-emoji-picker--emoji"
                      onClick={() => {
                        this.props.onEmojiPicked(emoji)
                        this.domNode.blur()
                      }}
                    >
                      {emoji}
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default EmojiPicker
