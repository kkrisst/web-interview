import React, { Component } from 'react';

import UserInfo from '../../components/user-info/user-info.component.jsx';
import SelectableButton from '../../components/selectable-button/selectable-button.component.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_ENDPOINT } from '../../config'
import './new-appointment-page.styles.scss';

class NewAppointmentPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1, // TODO
      selectedAppointmentType: 'gp',
      availableSlots: [],
    }
  }

  componentDidMount() {
    fetch(`${API_ENDPOINT}/availableSlots`)
      .then(res => res.json())
      .then(json => {
        this.setState({ availableSlots: json })
      })
      .catch(err => {
        console.error(err)
      })
  }

  onAppointmentTypeChange = appointmentType => {
    this.setState({ selectedAppointmentType: appointmentType })
  }

  render() {
    // calculate matching slots
    let slots = []
    for (let i = 0; i < this.state.availableSlots.length; i++) {
      for (
        let j = 0;
        j < this.state.availableSlots[i]['consultantType'].length;
        j++
      ) {
        if (
          this.state.availableSlots[j]['consultantType'][i] ===
          this.state.selectedAppointmentType
        ) {
          slots.push(this.state.availableSlots[j])
        }
      }
    }

    console.log(slots);

    const { selectedAppointmentType } = this.state;

    return (
      <div className='new-appointment-page'>
        <h2 className="h6">New appointment</h2>
        <UserInfo />
        <div className="appointment-form">
          <div className='form-block'>
            <div className='block-header'>
              <div className='block-icon'>
                <FontAwesomeIcon icon="stethoscope" />
              </div>
              Consultant Type
            </div>
            <div className='block-buttons'>
              <SelectableButton
                label='GP'
                selected={selectedAppointmentType === 'gp'}
                handleSelect={() => this.onAppointmentTypeChange('gp')}
              />
              <SelectableButton
                label='Therapist'
                selected={selectedAppointmentType === 'therapist'}
                handleSelect={() => this.onAppointmentTypeChange('therapist')}
              />
              <SelectableButton
                label='Specialist'
                selected={selectedAppointmentType === 'specialist'}
                handleSelect={() => this.onAppointmentTypeChange('specialist')}
              />
            </div>
          </div>
          <div>
            <strong>Appointments</strong>
            {slots.map(slot => (
              <li
                key={slot.id}
                className="appointment-button"
                onClick={() => {
                  this.setState({ selectedAppointment: slot })
                }}
              >
                {slot.time}
              </li>
            ))}
          </div>
          <div>
            <strong>Notes</strong>
            <textarea />
          </div>
          <div>
            <div
              className="button"
              onClick={() => {
                /* TODO: submit the data */
              }}
            >
              Book appointment
            </div>
          </div>
        </div>
      </div>
    )
  }

};

export default NewAppointmentPage;