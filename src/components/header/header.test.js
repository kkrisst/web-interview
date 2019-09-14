import React from 'react'
import { shallow } from 'enzyme'

import Header from './header.component.jsx'

it('expect to render Header component', () => {
  expect(shallow(<Header />)).toMatchSnapshot()
})
