import React from 'react'
import { shallow } from 'enzyme'

import UserInfo from './user-info.component.jsx'

it('expect to render UserInfo component', () => {
  expect(shallow(<UserInfo />)).toMatchSnapshot()
})

it('componentDidMount fetched corretly', async () => {
  expect.assertions(3)
  const wrapper = shallow(<UserInfo userId="1" />)
  await wrapper.instance().fetchUserInfo()
  const state = wrapper.instance().state
  expect(state.id).toEqual(1)
  expect(state.firstName).toEqual('Jane')
  expect(state.lastName).toEqual('Doe')
})
