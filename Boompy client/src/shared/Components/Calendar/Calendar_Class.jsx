import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './Calendar.css'; 
import axios from 'axios'; 

function CalendarClass({ isOpen, onRequestClose, onClose }) {

  const [tutorAvailability, setTutorAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true); 

  useEffect(() => {
    Modal.setAppElement('#root');
    setModalIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrollEnabled]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/calendar', { params: { userId: 'tutor123' } });
        setTutorAvailability(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/calendar', { params: { userId: 'tutor123' } });
        setTutorAvailability(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tutorAvailability]); // Se activará cada vez que tutorAvailability cambie

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setScrollEnabled(false); 
  };

  const closeModal = (event) => {
    if (event?.target?.id === "closeButton") {
      setModalIsOpen(false);
      setScrollEnabled(true);
      if (typeof onRequestClose === 'function') {
        onRequestClose();
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    }
  };

  const assignClass = () => {
    const currentDate = new Date(); 
    const selectedDateTime = selectedDate.getTime(); 
    const currentDateTime = currentDate.getTime(); 
     
    if (selectedDateTime <= currentDateTime) {      
        alert("Invalid date. Please select a date later than today.");
        return; 
    }
  
    const classData = {
        userId: "tutor123",
        date: selectedDate, 
        startTime: selectedStartTime,
        endTime: selectedEndTime,
    };
      
  
    // Connection to database using Axios
    axios.post('http://localhost:3001/api/calendar', classData)
        .then(response => {
            // Handle server response if necessary
           
            closeModal();
        })
        .catch(error => {
            // Handle error if request fails
            console.error('Error sending data:', error);
        });
  };

  const getAvailableDates = () => {
    const currentDate = new Date();
    return tutorAvailability.filter(({ date }) => new Date(date) >= currentDate).map(({ date }) => new Date(date));
  };

  const customClasses = {}; 

  getAvailableDates().forEach(date => {
    customClasses[date.toLocaleDateString()] = 'available';
  });

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const availableHoursForDate = tutorAvailability.filter(({ date }) => {
    return new Date(date).getDate() === selectedDate.getDate() &&
           new Date(date).getMonth() === selectedDate.getMonth() &&
           new Date(date).getFullYear() === selectedDate.getFullYear();
  });

  // Generate options for 24 hours of the day
  const hoursOptions = [];
  for (let i = 0; i < 24; i++) {
    const hour = (i < 10 ? '0' : '') + i + ':00';
    hoursOptions.push(hour);
  }

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        locale="en-US"
        tileClassName={({ date }) => {
          const classes = [];
          if (customClasses[date.toLocaleDateString()]) {
            classes.push(customClasses[date.toLocaleDateString()]);
          }
          if (isToday(date)) {
            classes.push('today');
          }
          return classes.join(' ');
        }}
      />
      
      <div>
        <p>Available Hours for {selectedDate.toLocaleDateString()}</p>
        <ul>
          {availableHoursForDate.map(({ startTime, endTime }, index) => (
            <li key={index}>
              {startTime} - {endTime}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div>
          <label>Start Time:</label>
          <select value={selectedStartTime} onChange={(e) => setSelectedStartTime(e.target.value)}>
            <option value="">Select time</option>
            {hoursOptions.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div>
          <label>End Time:</label>
          <select value={selectedEndTime} onChange={(e) => setSelectedEndTime(e.target.value)} disabled={!selectedStartTime}>
            <option value="">Select time</option>
            {hoursOptions.map((time, index) => (
              <option key={index} value={time} disabled={time <= selectedStartTime}>{time}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 10 }}>
          <button onClick={assignClass} disabled={!selectedStartTime || !selectedEndTime}>Assign Class</button>
          <button id="closeButton" onClick={closeModal}>Close</button>         
        </div>
      </div>
    </Modal>
  );
}

export default CalendarClass;
