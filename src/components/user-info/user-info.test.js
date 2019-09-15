import React from 'react'
import { shallow } from 'enzyme'

import UserInfo from './user-info.component.jsx'

const setUp = props => {
  return shallow(<UserInfo {...props} />)
}

describe('UserInfo component', () => {
  it('expect UserInfo to be defined', () => {
    expect(UserInfo).toBeDefined()
  })

  it('expect to render UserInfo component', () => {
    const wrapper = setUp({ userId: 1 })
    expect(wrapper).toMatchSnapshot()
  })

  it('expect fetchUserInfo to be called', async () => {
    expect.assertions(1)
    const wrapper = setUp({ userId: 1 })

    const spy = jest
      .spyOn(wrapper.instance(), 'fetchUserInfo')
      .mockImplementation(() => Promise.resolve({}))
    await wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  it('componentDidMount does not call fetchUserInfo without a userId', async () => {
    expect.assertions(1)
    const wrapper = setUp()
    const spy = jest
      .spyOn(wrapper.instance(), 'fetchUserInfo')
      .mockImplementation(() => Promise.resolve({}))
    await wrapper.instance().componentDidMount()
    expect(spy).not.toBeCalled()
    spy.mockRestore()
  })

  it('sets the correct data', async () => {
    expect.assertions(4)
    const wrapper = setUp({ userId: 1 })
    const spy = jest
      .spyOn(wrapper.instance(), 'fetchUserInfo')
      .mockImplementation(() => {
        return Promise.resolve({
          id: 1,
          firstName: 'Jane',
          lastName: 'Doe',
          avatar: 'avatar',
        })
      })
    await wrapper.instance().componentDidMount()
    const state = wrapper.instance().state
    expect(state.id).toEqual(1)
    expect(state.firstName).toEqual('Jane')
    expect(state.lastName).toEqual('Doe')
    expect(state.avatar).toEqual('avatar')

    spy.mockRestore()
  })

  // TODO: fix the toThrow assertions, now they always fail
  /*
  it('expect componentDidMount to throw Error when no data is received', async () => {
    expect.assertions(1);
    const wrapper = setUp({ userId: 1 });
    const spy = jest.spyOn(wrapper.instance(), 'fetchUserInfo').mockImplementation(() => {
      return Promise.resolve( null );
    });
    expect(() => {
      wrapper.instance().componentDidMount();
    }).toThrow();

    spy.mockRestore();
  });

  it('expect componentDidMount to throw Error when no data is received', async () => {
    expect.assertions(1);
    const wrapper = setUp({ userId: 1 });
    const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve( { ok: false } );
    });
    expect(() => {
      wrapper.instance().fetchUserInfo();
    }).toThrow();

    spy.mockRestore();
  });
  */

  it('componentDidMount fetched corretly', async () => {
    expect.assertions(3)
    const wrapper = setUp({ userId: 1 })
    await wrapper.instance().fetchUserInfo()
    const state = wrapper.instance().state
    expect(state.id).toEqual(1)
    expect(state.firstName).toEqual('Jane')
    expect(state.lastName).toEqual('Doe')
  })
})
