// First Option 



"use client";

import { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function DigitalClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    // Set initial time when the component mounts
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    let ampm = '';

    if (!is24Hour) {
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // Convert to 12-hour format
    }

    // Format hours for 24-hour format (leading zeros)
    const formattedHours = is24Hour 
      ? hours.toString().padStart(2, '0') // Ensure two digits
      : hours.toString();

    return `${formattedHours}:${minutes}:${seconds}${ampm ? ' ' + ampm : ''}`;
  };

  // If time hasn't been set yet, don't render anything
  if (!time) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="text-6xl md:text-8xl font-bold mb-4 font-mono tracking-wider">
          {formatTime(time).split('').map((char, index) => (
            <span key={index} className="inline-block animate-pulse" style={{ animationDelay: `${index * 0.1}s` }}>
              {char}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Switch
            id="format-switch"
            checked={is24Hour}
            onCheckedChange={setIs24Hour}
          />
          <Label htmlFor="format-switch">
            {is24Hour ? '24-hour format' : '12-hour format'}
          </Label>
        </div>
      </div>
    </div>
  );
}




