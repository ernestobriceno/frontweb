import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './cal.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Nuevo estado para la fecha seleccionada

  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDate(newDate); // Actualizar la fecha seleccionada
  };

  const handleAddEvent = () => {
    if (newEvent) {
      const newEventObject = { id: Date.now(), date: new Date(date), event: newEvent, completed: false };
      setEvents([...events, newEventObject]);
      setNewEvent(''); // Limpiar el input después de agregar el evento
    }
  };

  const handleToggleCompletion = (id) => {
    const updatedEvents = events.map((event) => (event.id === id ? { ...event, completed: !event.completed } : event));
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const tileContent = ({ date }) => {
    const eventDates = events.map((event) => new Date(event.date).toDateString());
    return eventDates.includes(date.toDateString()) ? <div className={`dot ${selectedDate && selectedDate.toDateString() === date.toDateString() ? 'selected-dot' : ''}`} /> : null;
  };

  const tileClassName = ({ date }) => {
    // Clase por defecto para los días
    let className = 'calendar-day';

    // Si el día es hoy, cambiar la clase a 'today'
    if (date.toDateString() === new Date().toDateString()) {
      className = 'today';
    }

    // Si el día está seleccionado, agregar la clase 'selected-day'
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      className += ' selected-day';
    }

    return className;
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-2/3 pr-8">
        <h1 className="text-4xl font-bold mb-4 text-center center-title">Calendario</h1>
        <div className="flex justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setDate(new Date());
              setSelectedDate(new Date()); // Al seleccionar "Hoy", actualizar la fecha seleccionada
            }}
          >
            Hoy
          </button>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                console.log('Cambiando a la vista del Mes');
                setSelectedDate(null); // Al cambiar a la vista del mes, deseleccionar la fecha
              }}
            >
              Mes
            </button>
          </div>
        </div>
        <Calendar
          className="custom-calendar"
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent}
          view="day"
          tileClassName={tileClassName}
        />
      </div>
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-2/3">
        <div className="mb-4">
          <br />
          <h1 htmlFor="eventInput" className="text-2xl font-bold mb-2">
            Agendar Cita
          </h1>
          <div className="mt-1 flex flex-col md:flex-row">
            <input
              type="text"
              id="eventInput"
              className="mb-2 md:mb-0 md:mr-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full md:w-2/3 sm:text-sm border-gray-300 rounded-md"
              placeholder="Agendar Cita"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
            />
            <button
              className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddEvent}
            >
              Agendar
            </button>
          </div>
        </div>
        <div>
          <br />
          <h2 className="text-2xl font-bold mb-2">Eventos en: {date.toDateString()}</h2>
          <ul>
            {events
              .filter((event) => new Date(event.date).toDateString() === date.toDateString())
              .map((event) => (
                <li key={event.id} className="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={event.completed}
                    onChange={() => handleToggleCompletion(event.id)}
                    className="mr-2"
                  />
                  <span className={`text-lg ${event.completed ? 'line-through' : ''}`}>{event.event}</span>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2 text-sm"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
