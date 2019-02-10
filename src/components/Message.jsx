import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({ mounted: true });
    });
  }

  copyEmailLink() {
    const mail = 'hello@antoniofullone.com';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = mail;
    input.setAttribute('readonly', '');
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.select();
    this.setState({
      copied: true
    });
  }

  render() {
    const { children } = this.props;
    const { mounted, copied } = this.state;
    return (
      <div
        className={classNames('msg', 'msg--info', {
          active: mounted
        })}
      >
        {copied && <i className="fas fa-check-circle" />}
        {children}
      </div>
    );
  }
}

Message.defaultProps = {
  children: ''
};

Message.propTypes = {
  children: PropTypes.node
};

export default Message;
