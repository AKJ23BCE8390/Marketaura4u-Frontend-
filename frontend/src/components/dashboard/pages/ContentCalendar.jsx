import React from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

// --- Content Calendar Page ---
const ContentCalendar = () => {
  // Static data for a September 2025 calendar view
  const calendarDays = [
    { day: 31, isCurrentMonth: false, events: [{ title: 'Campaign Asset', status: 'red' }] },
    { day: 1, isCurrentMonth: true, events: [] },
    { day: 2, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'gray' }] },
    { day: 3, isCurrentMonth: true, events: [] },
    { day: 4, isCurrentMonth: true, events: [] },
    { day: 5, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'gray' }] },
    { day: 6, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'gray' }] },
    { day: 7, isCurrentMonth: true, events: [] },
    { day: 8, isCurrentMonth: true, events: [] },
    { day: 9, isCurrentMonth: true, events: [] },
    { day: 10, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'blue' }] },
    { day: 11, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'blue' }, { title: 'Campaign Asset', status: 'blue' }] },
    { day: 12, isCurrentMonth: true, events: [] },
    { day: 13, isCurrentMonth: true, events: [] },
    { day: 14, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'gray' }] },
    { day: 15, isCurrentMonth: true, events: [] },
    { day: 16, isCurrentMonth: true, events: [] },
    { day: 17, isCurrentMonth: true, events: [] },
    { day: 18, isCurrentMonth: true, events: [] },
    { day: 19, isCurrentMonth: true, events: [] },
    { day: 20, isCurrentMonth: true, events: [] },
    { day: 21, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'red' }, { title: 'Campaign Asset', status: 'red' }] },
    { day: 22, isCurrentMonth: true, events: [] },
    { day: 23, isCurrentMonth: true, events: [] },
    { day: 24, isCurrentMonth: true, events: [] },
    { day: 25, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'blue' }, { title: 'Campaign Asset', status: 'red' }] },
    { day: 26, isCurrentMonth: true, events: [] },
    { day: 27, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'red' }, { title: 'Campaign Asset', status: 'red' }] },
    { day: 28, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'red' }, { title: 'Campaign Asset', status: 'red' }] },
    { day: 29, isCurrentMonth: true, events: [] },
    { day: 30, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'blue' }] },
    { day: 1, isCurrentMonth: false, events: [] },
    { day: 2, isCurrentMonth: false, events: [] },
    { day: 3, isCurrentMonth: false, events: [] },
    { day: 4, isCurrentMonth: false, events: [] },
  ];
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStatusColor = (status) => {
    if (status === 'red') return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
    if (status === 'blue') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
  }

  return (
    <div className="animate-fade-in-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">September 2025</h2>
          <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Quick Create
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-px rounded-lg border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800">
        {weekDays.map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500 dark:bg-gray-950 dark:text-gray-400">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => (
          <div key={index} className={`relative h-36 overflow-y-auto bg-white p-2 dark:bg-gray-950 ${!day.isCurrentMonth ? 'opacity-50' : ''}`}>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{day.day}</span>
            <div className="mt-1 space-y-1">
              {day.events.map((event, i) => (
                <div key={i} className={`flex items-center rounded px-2 py-0.5 text-xs font-medium ${getStatusColor(event.status)}`}>
                  <X className="h-3 w-3 mr-1" /> {event.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCalendar;