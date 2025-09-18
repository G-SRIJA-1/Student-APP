import React, { useState } from 'react';
import { Calendar, Clock, User, Shield, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  counselor: string;
  type: string;
  status: 'scheduled' | 'confirmed' | 'completed';
}

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [preferredCounselor, setPreferredCounselor] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '14:00',
      counselor: 'Dr. Smith',
      type: 'General Counseling',
      status: 'scheduled'
    }
  ]);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const counselors = [
    'Dr. Sarah Johnson - General Counseling',
    'Dr. Michael Chen - Anxiety & Depression',
    'Dr. Priya Sharma - Academic Stress',
    'Dr. Ahmed Hassan - Crisis Intervention',
    'Any Available Counselor'
  ];

  const appointmentTypes = [
    'General Counseling',
    'Anxiety Support',
    'Depression Support',
    'Academic Stress',
    'Relationship Issues',
    'Crisis Support',
    'Follow-up Session'
  ];

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateDisabled = (date: string) => {
    const today = new Date();
    const selectedDateObj = new Date(date);
    return selectedDateObj < today || selectedDateObj.getDay() === 0; // Disable past dates and Sundays
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !appointmentType || !preferredCounselor) {
      alert('Please fill in all required fields');
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime,
      counselor: preferredCounselor.split(' - ')[0],
      type: appointmentType,
      status: 'scheduled'
    };

    setAppointments([...appointments, newAppointment]);
    
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setAppointmentType('');
    setPreferredCounselor('');
    
    alert('Appointment booked successfully! You will receive a confirmation email shortly.');
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = isDateDisabled(dateString);
      const isSelected = selectedDate === dateString;

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && setSelectedDate(dateString)}
          disabled={isDisabled}
          className={`p-2 text-sm rounded-lg transition-all duration-200 ${
            isSelected
              ? 'bg-blue-600 text-white'
              : isDisabled
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-blue-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Confidential Appointment</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Schedule a private counseling session with our licensed professionals. 
          All appointments are completely confidential and secure.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Calendar className="mr-2 text-blue-600" size={20} />
            Schedule New Appointment
          </h2>

          {/* Calendar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Select Date</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-medium">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-3 flex items-center">
              <Clock className="mr-2 text-blue-600" size={16} />
              Select Time
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 text-sm rounded-lg border transition-all duration-200 ${
                    selectedTime === time
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Appointment Type */}
          <div className="mb-6">
            <label className="block font-medium mb-3">Appointment Type</label>
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select appointment type</option>
              {appointmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Counselor Preference */}
          <div className="mb-6">
            <label className="block font-medium mb-3 flex items-center">
              <User className="mr-2 text-blue-600" size={16} />
              Preferred Counselor
            </label>
            <select
              value={preferredCounselor}
              onChange={(e) => setPreferredCounselor(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select counselor</option>
              {counselors.map(counselor => (
                <option key={counselor} value={counselor}>{counselor}</option>
              ))}
            </select>
          </div>

          {/* Privacy Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <Shield className="text-green-600 mt-1 flex-shrink-0" size={16} />
              <div className="text-sm">
                <p className="font-medium text-green-800 mb-1">Complete Privacy Guaranteed</p>
                <p className="text-green-700">
                  All appointments are confidential. No personal information is shared without your consent.
                  You can cancel or reschedule anytime.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleBookAppointment}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Book Appointment
          </button>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Your Appointments</h2>
          
          {appointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No appointments scheduled yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map(appointment => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{appointment.type}</p>
                      <p className="text-sm text-gray-600">with {appointment.counselor}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {appointment.time}
                    </span>
                  </div>
                  {appointment.status === 'scheduled' && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 flex items-center">
                        <CheckCircle size={12} className="mr-1" />
                        Confirmation email will be sent 24 hours before your appointment
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;