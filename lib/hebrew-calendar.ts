import { HDate, HebrewCalendar, HolidayEvent } from '@hebcal/core';
import { HebrewDate } from '@/types';

/**
 * Convert a Gregorian date to Hebrew date with additional info
 */
export function convertToHebrewDate(gregorianDate: Date): HebrewDate {
  const hdate = new HDate(gregorianDate);
  
  // Get Hebrew calendar events for this date
  const events = HebrewCalendar.calendar({
    start: gregorianDate,
    end: gregorianDate,
    sedrot: true,
    omer: true,
  });

  // Find the Torah reading (parashat hashavua)
  const sedraEvent = events.find(event => event.getDesc().includes('Parashat'));
  const parashat = sedraEvent ? sedraEvent.getDesc().replace('Parashat ', '') : undefined;

  // Check for holidays
  const holidayEvent = events.find(event => event instanceof HolidayEvent);
  const isHoliday = !!holidayEvent;
  const holidayName = holidayEvent?.getDesc();

  return {
    hebrewDate: hdate.toString(),
    hebrewMonth: hdate.getMonthName(),
    hebrewYear: hdate.getFullYear(),
    parashat,
    isHoliday,
    holidayName,
  };
}

/**
 * Get Hebrew month name in Hebrew
 */
export function getHebrewMonthHebrew(gregorianDate: Date): string {
  const hdate = new HDate(gregorianDate);
  return hdate.getMonthName(); // Returns Hebrew month name
}

/**
 * Get current Torah reading (Parashat HaShavua)
 */
export function getCurrentParasha(date: Date = new Date()): string {
  const events = HebrewCalendar.calendar({
    start: date,
    end: date,
    sedrot: true,
  });

  const sedraEvent = events.find(event => event.getDesc().includes('Parashat'));
  return sedraEvent ? sedraEvent.getDesc().replace('Parashat ', '') : '';
}

/**
 * Get Hebrew calendar info for a date range
 */
export function getHebrewCalendarRange(startDate: Date, endDate: Date) {
  const events = HebrewCalendar.calendar({
    start: startDate,
    end: endDate,
    sedrot: true,
    omer: true,
  });

  return events.map(event => ({
    date: event.getDate().greg(),
    hebrewDate: event.getDate().toString(),
    description: event.getDesc(),
    isHoliday: event instanceof HolidayEvent,
    isTorchReading: event.getDesc().includes('Parashat'),
  }));
}

/**
 * Group data by Hebrew months
 */
export function groupByHebrewMonth<T extends { date: Date }>(data: T[]) {
  const grouped: Record<string, T[]> = {};
  
  data.forEach(item => {
    const hebrewMonth = getHebrewMonthHebrew(item.date);
    if (!grouped[hebrewMonth]) {
      grouped[hebrewMonth] = [];
    }
    grouped[hebrewMonth].push(item);
  });

  return grouped;
}

/**
 * Group data by Torah portions (Parashat)
 */
export function groupByParasha<T extends { date: Date }>(data: T[]) {
  const grouped: Record<string, T[]> = {};
  
  data.forEach(item => {
    const parasha = getCurrentParasha(item.date);
    if (!grouped[parasha]) {
      grouped[parasha] = [];
    }
    grouped[parasha].push(item);
  });

  return grouped;
}

/**
 * Get Hebrew calendar months for a year
 */
export function getHebrewMonths(hebrewYear?: number): string[] {
  const year = hebrewYear || new HDate().getFullYear();
  const months: string[] = [];
  
  // Hebrew calendar months (some years have 13 months)
  const monthNames = [
    'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar',
    'Nissan', 'Iyar', 'Sivan', 'Tamuz', 'Av', 'Elul'
  ];

  monthNames.forEach(month => {
    months.push(month);
  });

  // Add Adar II in leap years
  if (HDate.isLeapYear(year)) {
    const adarIndex = months.indexOf('Adar');
    months.splice(adarIndex + 1, 0, 'Adar II');
  }

  return months;
}

/**
 * Format Hebrew date for display
 */
export function formatHebrewDate(date: Date, includeParasha: boolean = false): string {
  const hebrewInfo = convertToHebrewDate(date);
  let formatted = hebrewInfo.hebrewDate;
  
  if (includeParasha && hebrewInfo.parashat) {
    formatted += ` (${hebrewInfo.parashat})`;
  }
  
  return formatted;
}
