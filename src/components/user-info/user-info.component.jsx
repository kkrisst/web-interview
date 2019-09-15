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

  async componentDidMount() {
    try {
      if (this.props.userId) {
        const userData = await this.fetchUserInfo();
        if (userData !== null) {
          const { id, firstName, lastName, avatar } = userData;
          this.setState({
            id,
            firstName,
            lastName,
            avatar
          });
        } else {
          throw new Error("Fetching user data failed.");
        }
      }  
    } catch (error) {
      console.error(error);
    }
    
  }

  fetchUserInfo = () => {
    return fetch(`${API_ENDPOINT}/users/${this.props.userId}`)
      .then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          } else {
            return res.json();
          }
        })
      .then(json => {
        return json;
      })
      .catch(err => {
        console.error(err);
        return null;
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