import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import axios from 'axios';
import './Calendar.css';

function TutorCalendar() {
  const [tutorAvailability, setTutorAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [showOpenButton, setShowOpenButton] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    Modal.setAppElement('#root');
    const fetchTutorAvailability = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/calendar', { params: { userId: 'tutor123' } });
        setTutorAvailability(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching tutor availability:', error);
      }
    };

    fetchTutorAvailability();
  }, []);

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrollEnabled]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
    setScrollEnabled(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setShowOpenButton(true);
    setScrollEnabled(true);
  };

  const assignClass = () => {
    const selectedClass = tutorAvailability.find(availability => {
        const availabilityDate = new Date(availability.date).toLocaleDateString();
        const availabilityTime = `${availability.startTime} --- ${availability.endTime}`;
        return availabilityDate === selectedDate.toLocaleDateString() && availabilityTime === selectedTime;
    });

    if (selectedClass) {
        const newClassData = {
            date: selectedClass.date,
            startTime: selectedClass.startTime,
            endTime: selectedClass.endTime,
            userId: selectedClass.userId,
            classId: selectedClass._id,
            reserved: 'IdUsuario'
        };

        console.log("New class data:", JSON.stringify(newClassData, null, 2));
    } else {
        console.error("No class found for the selected date and time.");
    }

    closeModal();

    // Restablecer selectedTime a una cadena vacía para reiniciar el select
    setSelectedTime('');
};



  const getAvailableTimesForDate = (date) => {
    const availabilityForDate = tutorAvailability.filter(availability => new Date(availability.date).getTime() === date.getTime());
    if (availabilityForDate.length > 0) {
      return availabilityForDate.map(availability => `${availability.startTime} --- ${availability.endTime}`);
    } else {
      return [];
    }
  };

  const customClasses = {};
  tutorAvailability.forEach(({ date }) => {
    customClasses[new Date(date).toLocaleDateString()] = 'available';
  });

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <>
      {showOpenButton && (
        <button onClick={() => {
          setModalIsOpen(true);
          setShowOpenButton(false);
          setScrollEnabled(false);
        }}>My Calendar</button>
      )}

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

        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">Select time</option>
          {getAvailableTimesForDate(selectedDate)?.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
        <div style={{ marginTop: 10 }}>
          <button onClick={assignClass} disabled={!selectedTime}>Assign Class</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </>
  );

}

export default TutorCalendar;
