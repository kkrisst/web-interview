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

  onDateChange = userDate => {
    this.setState({ userDate })
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
          this.state.consultantType
        ) {
          slots.push(this.state.availableSlots[j])
        }
      }
    }

    console.log(slots);

    const { consultantType, userDate, appointmentType, notes } = this.state;
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
                    handleSelect={() => this.onDateChange(slot.time)}
                  />
                );
              })}
            </div>
          </div>


          <div>
            <strong>Appointments</strong>
            
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