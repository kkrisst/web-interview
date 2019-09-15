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
      availableSlots: [],
      availableAppointmentTypes: [],

      consultantType: 'gp',
      appointmentType: '',
      userDate: null,
      notes: ''
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

  onConsultantTypeChange = consultantType => {
    this.setState({ consultantType })
  }

  onDateChange = (userDate, availableAppointmentTypes) => {
    this.setState({ userDate, availableAppointmentTypes })
  }
  
  onAppointmentTypeChange = (appointmentType) => {
    this.setState({ appointmentType })
  }

  onNotesChange = notes => {
    this.setState({ notes });
  }

  render() {
    const { availableSlots, availableAppointmentTypes } = this.state;
    const { consultantType, userDate, appointmentType, notes } = this.state;

    // calculate matching slots
    let slots = []
    for (let i = 0; i < availableSlots.length; i++) {
      for (
        let j = 0;
        j < availableSlots[i]['consultantType'].length;
        j++
      ) {
        if (
          availableSlots[j]['consultantType'][i] ===
          consultantType
        ) {
          slots.push(availableSlots[j])
        }
      }
    }

    console.log(slots);

    const todayDate = new Date();

    // TODO handle the case when 0 slots are available
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
                selected={consultantType === 'gp'}
                handleSelect={() => this.onConsultantTypeChange('gp')}
              />
              <SelectableButton
                label='Therapist'
                selected={consultantType === 'therapist'}
                handleSelect={() => this.onConsultantTypeChange('therapist')}
              />
              <SelectableButton
                label='Specialist'
                selected={consultantType === 'specialist'}
                handleSelect={() => this.onConsultantTypeChange('specialist')}
              />
            </div>
          </div>

          <div className='form-block'>
            <div className='block-header'>
              <div className='block-icon'>
                <FontAwesomeIcon icon="clock" />
              </div>
              Date & Time
            </div>
            <div className='block-buttons'>
              {slots.map(slot => {
                const availDate = new Date(slot.time);

                let dateLabel = '';
                if (availDate.getFullYear() === todayDate.getFullYear() &&
                  availDate.getMonth() === todayDate.getMonth() &&
                  availDate.getDate() === todayDate.getDate()
                ) {
                  dateLabel += 'Today ';
                } else {
                  dateLabel += `${availDate.getDate() + 1}/${availDate.getMonth() + 1}/${availDate.getFullYear()}`;
                }
                dateLabel += ` ${availDate.getHours()}:${availDate.getMinutes()}`;

                return (
                  <SelectableButton
                    key={slot.id}
                    label={dateLabel}
                    selected={userDate === slot.time}
                    handleSelect={() => this.onDateChange(slot.time, slot.appointmentType)}
                  />
                );
              })}
            </div>
          </div>

          <div className='form-block'>
            <div className='block-header'>
              <div className='block-icon'>
                <FontAwesomeIcon icon="video" />
              </div>
              Appointment Type
            </div>
            <div className='block-buttons'>
              {availableAppointmentTypes.map(availType => {
                console.log(availType);
                return (
                  <SelectableButton
                    key={availType}
                    label={availType}
                    selected={appointmentType === availType}
                    handleSelect={() => this.onAppointmentTypeChange(availType)}
                  />
                );
              })}
            </div>
          </div>

          <div className='form-block'>
            <div className='block-header'>
              <div className='block-icon'>
                <FontAwesomeIcon icon="video" />
              </div>
              Notes
            </div>
            <div className='textarea-wrapper'>
              <textarea
                placeholder='Describe your symptoms'
                onChange={(e) => this.onNotesChange(e)}
              />
            </div>
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