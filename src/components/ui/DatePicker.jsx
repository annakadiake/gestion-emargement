import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CustomDatePicker({ 
  label, 
  selected, 
  onChange, 
  className = '', 
  ...props 
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1">
        <DatePicker
          selected={selected}
          onChange={onChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          dateFormat="dd/MM/yyyy"
          {...props}
        />
      </div>
    </div>
  );
}