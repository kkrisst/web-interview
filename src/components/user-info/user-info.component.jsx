import React, { Component } from 'react';
import { API_ENDPOINT } from '../../config';

import './user-info.styles.scss';

class UserInfo extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      id: 1,
      firstName: '',
      lastName: '',
      avatar: '',
    }
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo = () => {
    return fetch(`${API_ENDPOINT}/users/${this.props.userId}`)
      .then(res => res.json())
      .then(json => {
        const { id, firstName, lastName, avatar } = json;
        this.setState({
          id,
          firstName,
          lastName,
          avatar
        });
      })
      .catch(err => {
        console.error(err);
      })
  }

  render () {
    const { firstName, lastName, avatar } = this.state;

    return (
      <div className='user-info'>
        <img className='avatar' src={avatar} alt="User avatar" />
        <div className='name'>
          <div className='first-name'>{firstName}</div>
          <div className='last-name'>{lastName}</div>
        </div>
      </div>
    );
  }
  
};

export default UserInfo;