import React from 'react'
import { shallow } from 'enzyme'

import NewAppointmentPage from './new-appointment-page.component.jsx'

describe('Testing the NewAppointmentPage component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NewAppointmentPage />)
    wrapper.setState({
      userId: 1,
      availableSlots: [
        {
          id: 1,
          consultantType: ['gp'],
          appointmentType: ['audio', 'video'],
          time: '2019-11-27T10:11:00.000Z',
        },
        {
          id: 2,
          consultantType: ['specialist'],
          appointmentType: ['audio', 'video'],
          time: '2019-12-01T14:16:30.000Z',
        },
      ],
      filteredSlots: [
        {
          id: 1,
          consultantType: ['gp'],
          appointmentType: ['audio', 'video'],
          time: '2019-11-27T10:11:00.000Z',
        },
      ],
      availableAppointmentTypes: ['audio', 'video'],

      consultantType: 'gp',
      appointmentType: 'video',
      userDate: '2019-08-30T20:21:30.000Z',
      notes: 'my symptoms...',
    })
  })

  it('expect NewAppointmentPage to be defined', () => {
    expect(NewAppointmentPage).toBeDefined()
  })

  it('expect to render NewAppointmentPage component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('expect fetchAvailableSlots to be called', async () => {
    expect.assertions(1)

    const spy = jest
      .spyOn(wrapper.instance(), 'fetchAvailableSlots')
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: 1,
            consultantType: ['gp'],
            appointmentType: ['audio', 'video'],
            time: '2019-11-27T10:11:00.000Z',
          },
        ])
      )
    await wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  it('sets the available slots correctly', async () => {
    expect.assertions(1)

    const spy = jest
      .spyOn(wrapper.instance(), 'fetchAvailableSlots')
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: 1,
            consultantType: ['gp'],
            appointmentType: ['audio', 'video'],
            time: '2019-11-27T10:11:00.000Z',
          },
        ])
      )
    await wrapper.instance().componentDidMount()
    const state = wrapper.instance().state
    expect(state.availableSlots).toEqual([
      {
        id: 1,
        consultantType: ['gp'],
        appointmentType: ['audio', 'video'],
        time: '2019-11-27T10:11:00.000Z',
      },
    ])
    spy.mockRestore()
  })

  it('expect to filter the available slots correctly', async () => {
    expect.assertions(2)

    const spy = jest
      .spyOn(wrapper.instance(), 'fetchAvailableSlots')
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: 1,
            consultantType: ['gp'],
            appointmentType: ['audio', 'video'],
            time: '2019-11-27T10:11:00.000Z',
          },
          {
            id: 1,
            consultantType: ['specialist'],
            appointmentType: ['audio', 'video'],
            time: '2019-12-20T10:11:00.000Z',
          },
        ])
      )
    await wrapper.instance().componentDidMount()
    const state = wrapper.instance().state
    expect(state.filteredSlots.length).toEqual(1)
    expect(state.filteredSlots).toEqual([
      {
        id: 1,
        consultantType: ['gp'],
        appointmentType: ['audio', 'video'],
        time: '2019-11-27T10:11:00.000Z',
      },
    ])
  })

  it('expect translateConsultantType to translate correctly', async () => {
    await wrapper.instance().componentDidMount()
    expect(wrapper.instance().translateConsultantType('gp')).toEqual(
      'GP appointment'
    )
    expect(wrapper.instance().translateConsultantType('therapist')).toEqual(
      'Therapist appointment'
    )
    expect(wrapper.instance().translateConsultantType('specialist')).toEqual(
      'Specialist appointment'
    )
  })

  it('expect consultant-type FormSection to have SectionButton children', () => {
    const selButtons = wrapper.find('#consultant-type').find('SelectableButton')
    expect(selButtons.length).toEqual(3)
  })

  it('expect onConsultantTypeChange to be called', async () => {
    const spy = jest
      .spyOn(wrapper.instance(), 'onConsultantTypeChange')
      .mockImplementation(() => {
        return ''
      })
    await wrapper.instance().componentDidMount()
    wrapper
      .find('#consultant-type')
      .find('SelectableButton')
      .at(0)
      .props()
      .handleSelect()
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  it('expect consultant-type SectionButton to set the state correctly', async () => {
    await wrapper.instance().componentDidMount()
    wrapper
      .find('#consultant-type')
      .find('SelectableButton')
      .at(1)
      .props()
      .handleSelect()
    wrapper.update()
    const state = wrapper.instance().state
    expect(state.consultantType).toEqual('therapist')
  })

  it('expect onDateChange to be called', async () => {
    const spy = jest
      .spyOn(wrapper.instance(), 'onDateChange')
      .mockImplementation(() => {
        return ''
      })
    await wrapper.instance().componentDidMount()
    wrapper
      .find('#date-time')
      .find('SelectableButton')
      .at(0)
      .props()
      .handleSelect()
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  it('expect date SectionButton to set the state correctly', async () => {
    await wrapper.instance().componentDidMount()
    wrapper
      .find('#date-time')
      .find('SelectableButton')
      .at(0)
      .props()
      .handleSelect()
    wrapper.update()
    const state = wrapper.instance().state
    expect(state.userDate).toEqual('2019-11-27T10:11:00.000Z')
  })

  it('expect onAppointmentTypeChange to be called', async () => {
    const spy = jest
      .spyOn(wrapper.instance(), 'onAppointmentTypeChange')
      .mockImplementation(() => {
        return ''
      })
    await wrapper.instance().componentDidMount()
    wrapper
      .find('#appointment-type')
      .find('SelectableButton')
      .at(0)
      .props()
      .handleSelect()
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  it('expect appointment-type SectionButton to set the state correctly', async () => {
    await wrapper.instance().componentDidMount()
    wrapper
      .find('#appointment-type')
      .find('SelectableButton')
      .at(0)
      .props()
      .handleSelect()
    wrapper.update()
    const state = wrapper.instance().state
    expect(state.appointmentType).toEqual('audio')
  })

  it('expect onNotesChange to be called', async () => {
    const spy = jest
      .spyOn(wrapper.instance(), 'onNotesChange')
      .mockImplementation(() => {
        return ''
      })
    await wrapper.instance().componentDidMount()
    const event = { target: { value: 'symtoms' } }
    wrapper.find('textarea').simulate('change', event)
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  it('expect notes textarea to set the state correctly', () => {
    const event = { target: { value: 'symtoms' } }
    wrapper.find('textarea').simulate('change', event)

    wrapper.update()
    const state = wrapper.instance().state
    expect(state.notes).toEqual('symtoms')
  })

  it('expect date-time section to display a message: no available dates', () => {
    wrapper.setState({ filteredSlots: [] })
    const messageElement = wrapper.find('#date-time > .empty-block')
    expect(messageElement.length).toEqual(1)
  })

  it('expect date-time section NOT to display a message: no available dates', () => {
    const messageElement = wrapper.find('#date-time > .empty-block')
    expect(messageElement.length).toEqual(0)
  })

  it('expect appointment-type section to display a message: select a date', () => {
    wrapper.setState({ userDate: null })
    const messageElement = wrapper.find('#appointment-type > .empty-block')
    expect(messageElement.length).toEqual(1)
  })

  it('expect appointment-type section NOT to display a message: select a date', () => {
    const messageElement = wrapper.find('#appointment-type > .empty-block')
    expect(messageElement.length).toEqual(0)
  })

  it('expect setAppointmentRequest to be called', async () => {
    window.alert = jest.fn()
    const spy = jest
      .spyOn(wrapper.instance(), 'setAppointmentRequest')
      .mockImplementation(() => {
        return ''
      })
    await wrapper.instance().componentDidMount()
    wrapper.find('.book-appointment-button').simulate('click')
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  it('expect every required option to be set', async () => {
    window.alert = jest.fn()
    const spy = jest
      .spyOn(wrapper.instance(), 'postAppointmentData')
      .mockImplementation(() => {
        return ''
      })
    await wrapper.instance().componentDidMount()

    wrapper.find('.book-appointment-button').simulate('click')
    wrapper.update()
    const state = wrapper.instance().state
    expect(state.allRequiredSet).toEqual(true)
  })

  it('expect required option to be missing', async () => {
    window.alert = jest.fn()
    const spy = jest
      .spyOn(wrapper.instance(), 'postAppointmentData')
      .mockImplementation(() => {
        return ''
      })
    await wrapper.instance().componentDidMount()

    wrapper.setState({ userDate: null })
    wrapper.find('.book-appointment-button').simulate('click')
    wrapper.update()
    const state = wrapper.instance().state
    expect(state.allRequiredSet).toEqual(false)
  })

  it('expect book button to call postAppointmentData', async () => {
    window.alert = jest.fn()
    const spy = jest
      .spyOn(wrapper.instance(), 'postAppointmentData')
      .mockImplementation(() => {
        return ''
      })
    await wrapper.instance().componentDidMount()
    wrapper.find('.book-appointment-button').simulate('click')
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
