import React from 'react'
import { shallow } from 'enzyme'

import FormSection from './form-section.component.jsx'

describe('Testing the FormSection component', () => {
  let wrapper

  beforeEach(() => {
    const props = {
      title: 'Consultant Type',
      iconName: 'stethoscope',
    }
    wrapper = shallow(<FormSection {...props} />)
  })

  it('expect FormSection to be defined', () => {
    expect(FormSection).toBeDefined()
  })

  it('expect to render FormSection component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has the correct title', () => {
    const titleElement = wrapper.find('.title')
    expect(titleElement.text()).toEqual('Consultant Type')
  })

  it('can have other title than Consultant Type', () => {
    const props = {
      title: 'alma',
      iconName: 'stethoscope',
    }
    const wrapper = shallow(<FormSection {...props} />)
    const titleElement = wrapper.find('.title')
    expect(titleElement.text()).toEqual('alma')
  })

  it('expext to pass the correct iconName', () => {
    const iconElement = wrapper.find('FontAwesomeIcon')
    expect(iconElement.props().icon).toEqual('stethoscope')
  })
})
