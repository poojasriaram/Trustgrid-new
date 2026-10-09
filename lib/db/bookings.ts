import { getDatabase } from './index'

export interface DbSessionBooking {
  id: string
  name: string
  email: string
  company: string
  job_title?: string
  phone?: string
  area_of_interest: string
  challenge_description: string
  booking_date: string
  start_time: string
  end_time: string
  timezone: string
  additional_context?: string
  google_calendar_event_id?: string
  google_calendar_status?: string
  meet_link?: string
  status?: string
  created_at: string
  updated_at: string
}

/**
 * Insert or update a session booking record
 */
export function insertBookingDb(booking: DbSessionBooking): void {
  const db = getDatabase()
  const stmt = db.prepare(`
    INSERT INTO session_bookings (
      id, name, email, company, job_title, phone,
      area_of_interest, challenge_description,
      booking_date, start_time, end_time, timezone,
      additional_context, google_calendar_event_id,
      google_calendar_status, meet_link, status,
      created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name=excluded.name,
      email=excluded.email,
      company=excluded.company,
      job_title=excluded.job_title,
      phone=excluded.phone,
      area_of_interest=excluded.area_of_interest,
      challenge_description=excluded.challenge_description,
      booking_date=excluded.booking_date,
      start_time=excluded.start_time,
      end_time=excluded.end_time,
      timezone=excluded.timezone,
      additional_context=excluded.additional_context,
      google_calendar_event_id=excluded.google_calendar_event_id,
      google_calendar_status=excluded.google_calendar_status,
      meet_link=excluded.meet_link,
      status=excluded.status,
      updated_at=excluded.updated_at
  `)

  stmt.run(
    booking.id,
    booking.name,
    booking.email,
    booking.company,
    booking.job_title || '',
    booking.phone || '',
    booking.area_of_interest,
    booking.challenge_description,
    booking.booking_date,
    booking.start_time,
    booking.end_time,
    booking.timezone,
    booking.additional_context || '',
    booking.google_calendar_event_id || '',
    booking.google_calendar_status || 'pending',
    booking.meet_link || '',
    booking.status || 'confirmed',
    booking.created_at,
    booking.updated_at
  )
}

/**
 * Retrieve all bookings for a specific date
 */
export function getBookingsByDateDb(date: string): DbSessionBooking[] {
  try {
    const db = getDatabase()
    const stmt = db.prepare(`
      SELECT id, name, email, company, job_title, phone,
             area_of_interest, challenge_description,
             booking_date, start_time, end_time, timezone,
             additional_context, google_calendar_event_id,
             google_calendar_status, meet_link, status,
             created_at, updated_at
      FROM session_bookings
      WHERE booking_date = ? AND status != 'cancelled'
      ORDER BY start_time ASC
    `)
    return stmt.all(date) as unknown as DbSessionBooking[]
  } catch (err) {
    console.error('[DB] Failed to query bookings by date:', err)
    return []
  }
}

/**
 * Check if a time slot is already booked for a specific date
 */
export function isSlotBookedDb(date: string, startTime: string, endTime: string): boolean {
  try {
    const db = getDatabase()
    const stmt = db.prepare(`
      SELECT id FROM session_bookings
      WHERE booking_date = ?
        AND status != 'cancelled'
        AND (
          (start_time <= ? AND end_time > ?) OR
          (start_time < ? AND end_time >= ?) OR
          (start_time >= ? AND end_time <= ?)
        )
      LIMIT 1
    `)
    const row = stmt.get(date, startTime, startTime, endTime, endTime, startTime, endTime)
    return !!row
  } catch (err) {
    console.error('[DB] Failed to check slot collision:', err)
    return false
  }
}

/**
 * Retrieve a specific booking by ID
 */
export function getBookingByIdDb(id: string): DbSessionBooking | null {
  try {
    const db = getDatabase()
    const stmt = db.prepare(`
      SELECT id, name, email, company, job_title, phone,
             area_of_interest, challenge_description,
             booking_date, start_time, end_time, timezone,
             additional_context, google_calendar_event_id,
             google_calendar_status, meet_link, status,
             created_at, updated_at
      FROM session_bookings
      WHERE id = ?
      LIMIT 1
    `)
    const row = stmt.get(id) as unknown as DbSessionBooking | undefined
    return row || null
  } catch (err) {
    console.error('[DB] Failed to query booking by ID:', err)
    return null
  }
}

/**
 * Retrieve all session bookings
 */
export function getAllBookingsDb(limit: number = 50): DbSessionBooking[] {
  try {
    const db = getDatabase()
    const stmt = db.prepare(`
      SELECT id, name, email, company, job_title, phone,
             area_of_interest, challenge_description,
             booking_date, start_time, end_time, timezone,
             additional_context, google_calendar_event_id,
             google_calendar_status, meet_link, status,
             created_at, updated_at
      FROM session_bookings
      ORDER BY booking_date DESC, start_time DESC
      LIMIT ?
    `)
    return stmt.all(limit) as unknown as DbSessionBooking[]
  } catch (err) {
    console.error('[DB] Failed to query all bookings:', err)
    return []
  }
}
