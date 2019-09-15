import React from 'react'
import { shallow } from 'enzyme'

import SelectableButton from './selectable-button.component.jsx'

describe('Testing the SelectableButton component', () => {
  let wrapper
  beforeEach(() => {
    const props = {
      label: 'GP',
      selected: true,
      handleSelect: null,
    }
    wrapper = shallow(<SelectableButton {...props} />)
  })

  it('expect to render SelectableButton component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has the class selected', () => {
    const selectedButton = wrapper.find('.selected')
    expect(selectedButton.length).toEqual(1)
  })

  it('has the label GP', () => {
    const selectedButton = wrapper.find('div')
    expect(selectedButton.text()).toEqual('GP')
  })

  it('can have other label than GP', () => {
    const props = {
      label: 'Therapist',
      selected: true,
      handleSelect: null,
    }
    const wrapper = shallow(<SelectableButton {...props} />)
    const selectedButton = wrapper.find('div')
    expect(selectedButton.text()).toEqual('Therapist')
  })

  it('expect handleSelect to be called', () => {
    const mockHandleSelect = jest.fn()

    const props = {
      label: 'GP',
      selected: true,
      handleSelect: mockHandleSelect,
    }
    const wrapper = shallow(<SelectableButton {...props} />)

    wrapper.find('div').simulate('click')
    expect(mockHandleSelect).toHaveBeenCalledTimes(1)
    wrapper.find('div').simulate('click')
    expect(mockHandleSelect).toHaveBeenCalledTimes(2)
  })
})
