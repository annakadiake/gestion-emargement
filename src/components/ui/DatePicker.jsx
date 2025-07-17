import { useState } from 'react';

export default function CustomDatePicker({ 
  label, 
  value, 
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
        <input
          type="date"
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          {...props}
        />
      </div>
    </div>
  );
}