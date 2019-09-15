import React, { Component } from 'react';

import UserInfo from '../../components/user-info/user-info.component.jsx';
import FormSection from '../../components/form-section/form-section.component.jsx';
import SelectableButton from '../../components/selectable-button/selectable-button.component.jsx';

import { API_ENDPOINT } from '../../config'
import './new-appointment-page.styles.scss';

class NewAppointmentPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      availableSlots: [],
      filteredSlots: [],
      availableAppointmentTypes: [],

      consultantType: 'gp',
      appointmentType: '',
      userDate: null,
      notes: null
    }
  }

  componentDidMount() {
    fetch(`${API_ENDPOINT}/availableSlots`)
      .then(res => res.json())
      .then(json => {
        this.setState({ availableSlots: json }, () => {
          this.filterAvailableSlots();
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  filterAvailableSlots = () => {
    const { consultantType, availableSlots } = this.state;
    let filteredSlots = availableSlots.filter(slot => 
      slot['consultantType'].includes(consultantType)
    );

    if (filteredSlots.length === 0) {
      this.setState({
        filteredSlots,
        appointmentType: '',
        userDate: null,
        notes: null
      })
    } else {
      this.setState({
        filteredSlots
      })
    }
  }

  onConsultantTypeChange = consultantType => {
    this.setState({ consultantType, availableAppointmentTypes: [], userDate: null }, () => {
      this.filterAvailableSlots();
    })
  }

  onDateChange = (userDate, availableAppointmentTypes) => {
    this.setState({ userDate, availableAppointmentTypes })
  }
  
  onAppointmentTypeChange = (appointmentType) => {
    this.setState({ appointmentType })
  }

  onNotesChange = event => {
    const notes = event.target.value;
    this.setState({ notes });
  }

  sendAppointmentRequest = event => {
    const { userId, consultantType, appointmentType, userDate, notes } = this.state;

    if (consultantType === '') {
      alert('Please select a consultant type.');
    } else if (userDate === null) {
      alert('Please select a date for the appointment.');
    } else if (appointmentType === '') {
      alert('Please select an appointment type.');
    } else {
      const dataToPost = {
        userId,
        dateTime: userDate,
        notes,
        consultantType: this.translateConsultantType(consultantType),
        appointmentType
      };
  
      fetch(`${API_ENDPOINT}/appointments`, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToPost)
      })
        .then(res => {
          if (res.status === 201) {
            alert("Appointment successfully booked.");
          } else {
            alert(res.statusText);
          }
          return res.json();
        })
        .then(json => {
          // console.log(json)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  translateConsultantType = cType => {
    let translatedCType = '';
    switch (cType) {
      case 'gp':
        translatedCType = 'GP appointment';
        break;
      case 'therapist':
        translatedCType = 'Therapist appointment';
        break;
      case 'specialist':
        translatedCType = 'Specialist appointment';
        break;
      default:
        translatedCType = 'Other type of appointment';
    }

    return translatedCType;
  }

  render() {
    const { userId, filteredSlots, availableAppointmentTypes } = this.state;
    const { consultantType, userDate, appointmentType } = this.state;

    const todayDate = new Date();

    return (
      <div className='new-appointment-page'>
        <h2 className="h6">New appointment</h2>
        <UserInfo userId={userId}/>
        <div className="appointment-form">
          <FormSection title='Consultant Type' iconName='stethoscope'>
            <div className='section-button-list'>
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
          </FormSection>
          <FormSection title='Date & Time' iconName='clock'>
            {
              filteredSlots.length === 0
              ? (<div className='empty-block'>There are no available dates for the selected consultant type.</div>)
              : (
                <div className='section-button-list'>
                  {filteredSlots.map(slot => {
                    const availDate = new Date(slot.time);

                    // Determining if the date of the slot is today
                    let dateLabel = `${availDate.getHours()}:${availDate.getMinutes()}`;
                    if (availDate.getFullYear() === todayDate.getFullYear() &&
                      availDate.getMonth() === todayDate.getMonth() &&
                      availDate.getDate() === todayDate.getDate()
                    ) {
                      dateLabel = `Today ${dateLabel}`;
                    } else {
                      dateLabel = `${availDate.getDate() + 1}/${availDate.getMonth() + 1}/${availDate.getFullYear()} ${dateLabel}`;
                    }

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
              )
            }
          </FormSection>
          <FormSection title='Appointment Type' iconName='video'>
            {
              userDate === null
              ? (<div className='empty-block'>Please select a date to see the available appointment types.</div>)
              : (
                <div className='section-button-list'>
                  {availableAppointmentTypes.map(availType => {
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
              )
            }
          </FormSection>
          <FormSection title='Notes' iconName='sticky-note'>
            <div className='textarea-wrapper'>
              <textarea
                placeholder='Describe your symptoms'
                onChange={(e) => this.onNotesChange(e)}
              />
            </div>
          </FormSection>
          <div className='book-section'>
            <div
              className="book-appointment-button"
              onClick={this.sendAppointmentRequest}
            >Book appointment</div>
          </div>

        </div>
      </div>
    )
  }
};

export default NewAppointmentPage;