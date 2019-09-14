import React from 'react'
import { shallow } from 'enzyme'

import UserInfo from './user-info.component.jsx'

it('expect to render UserInfo component', () => {
  expect(shallow(<UserInfo />)).toMatchSnapshot()
})
