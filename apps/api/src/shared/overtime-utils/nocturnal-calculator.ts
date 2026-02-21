export function checkIsNocturnal(start: Date, end: Date): boolean {
  // Convert to local time or assume UTC? Usually servers run UTC.
  // The rule "19:00 to 06:00" usually refers to local time (Colombia? Copower Energy Solutions sounds Latin American/Spanish).
  // Assuming UTC-5 (Colombia) or handling timezone offset.
  // Ideally, use a library like Luxon or date-fns-tz with the company's timezone.
  // For now, I'll assume the input Dates are correct JS Dates.
  // I'll check if the interval overlaps with 19:00 - 06:00 (next day) in the local context.
  // Since I don't know the timezone, I'll assume the Dates passed are already adjusted or I should check hours in UTC if stored as UTC.
  // If the server is UTC, 19:00 local might be 00:00 UTC (next day) for Colombia (UTC-5).
  // I'll implementation a simple check based on hours of the Date object (which uses server local time unless generic).
  // Better to use a timezone aware check.

  // Let's assume we use UTC dates and apply offset -5 for Colombia.
  const timezoneOffset = -5; // hours

  const startLocal = new Date(start.getTime() + timezoneOffset * 60 * 60 * 1000);
  const endLocal = new Date(end.getTime() + timezoneOffset * 60 * 60 * 1000);

  const startHour = startLocal.getUTCHours();
  const endHour = endLocal.getUTCHours();

  // Nocturnal range: 19:00 (19) to 06:00 (6).
  // If start is in nocturnal range OR end is in nocturnal range OR interval covers nocturnal range.

  // Simplify: Check minute by minute? No, too slow.
  // Check overlap.

  // 19:00 today.
  const nightStart = new Date(startLocal);
  nightStart.setUTCHours(19, 0, 0, 0);

  // 06:00 tomorrow.
  const nightEnd = new Date(startLocal);
  nightEnd.setUTCDate(nightEnd.getUTCDate() + 1);
  nightEnd.setUTCHours(6, 0, 0, 0);

  // Also consider previous night if start is early morning (e.g. 01:00)
  // If start is 01:00, it's nocturnal.

  // Helper to check if a specific time point is nocturnal
  const isTimeNocturnal = (d: Date) => {
    const h = d.getUTCHours();
    return h >= 19 || h < 6;
  };

  if (isTimeNocturnal(startLocal) || isTimeNocturnal(endLocal)) return true;

  // If neither start nor end is nocturnal, but they span across a night?
  // E.g. Start 18:00, End 07:00 (next day).
  // 18 is not >= 19. 7 is not < 6.
  // But it crosses 19:00 and 06:00.

  if (startLocal.getTime() < nightStart.getTime() && endLocal.getTime() > nightStart.getTime()) return true;

  return false;
}
