import React from 'react'
import { shallow } from 'enzyme'

import UserInfo from './user-info.component.jsx'

it('expect to render UserInfo component', () => {
  expect(shallow(<UserInfo />)).toMatchSnapshot()
})

it('componentDidMount fetched corretly', async () => {
  const wrapper = shallow(<UserInfo userId="1" />)
  await wrapper.instance().fetchUserInfo()
  const state = wrapper.instance().state
  console.log(state)
})

it('componentDidMount calls fetchUserInfo', async () => {
  const wrapper = shallow(<UserInfo userId="1" />)
  await wrapper.instance().componentDidMount()
  wrapper.update()
  //expect(wrapper.instance().bar).toBe(100);
})
