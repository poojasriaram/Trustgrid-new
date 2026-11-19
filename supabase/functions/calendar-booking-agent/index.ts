import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://ndalgvpvpzwrqoikkpyb.supabase.co";
const SUPABASE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
  Deno.env.get("SUPABASE_ANON_KEY") ||
  "sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv";

const STANDARD_SLOTS = [
  { startTime: "09:00", endTime: "09:45", label: "09:00 AM - 09:45 AM" },
  { startTime: "10:00", endTime: "10:45", label: "10:00 AM - 10:45 AM" },
  { startTime: "11:00", endTime: "11:45", label: "11:00 AM - 11:45 AM" },
  { startTime: "13:00", endTime: "13:45", label: "01:00 PM - 01:45 PM" },
  { startTime: "14:00", endTime: "14:45", label: "02:00 PM - 02:45 PM" },
  { startTime: "15:00", endTime: "15:45", label: "03:00 PM - 03:45 PM" },
  { startTime: "16:00", endTime: "16:45", label: "04:00 PM - 04:45 PM" }
];

async function sbRest(path: string, options: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);

  try {
    // GET: Check slot availability for a date & list recent bookings
    if (req.method === "GET") {
      const date = url.searchParams.get("date") || new Date().toISOString().slice(0, 10);
      const timezone = url.searchParams.get("timezone") || "America/New_York";

      const [dateBookingsRes, allBookingsRes] = await Promise.all([
        sbRest(`session_bookings?booking_date=eq.${encodeURIComponent(date)}&status=neq.cancelled&select=*`),
        sbRest("session_bookings?select=*&order=created_at.desc&limit=20")
      ]);

      const dateBookings = dateBookingsRes.ok ? await dateBookingsRes.json() : [];
      const recentBookings = allBookingsRes.ok ? await allBookingsRes.json() : [];
      const bookedStarts = new Set(dateBookings.map((b: any) => b.start_time));

      const slots = STANDARD_SLOTS.map((s) => ({
        ...s,
        available: !bookedStarts.has(s.startTime)
      }));

      return new Response(
        JSON.stringify({
          success: true,
          agent: "calendar-booking-agent",
          status: "ONLINE",
          date,
          timezone,
          availableSlotsCount: slots.filter((s) => s.available).length,
          slots,
          recentBookings
        }, null, 2),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST: Book a 45-minute executive consultation session
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim();
      const company = String(body.company || "Enterprise Organization").trim();
      const jobTitle = String(body.jobTitle || body.role || "").trim();
      const phone = String(body.phone || "").trim();
      const areaOfInterest = String(body.areaOfInterest || "Enterprise AI Architecture").trim();
      const challengeDescription = String(body.challengeDescription || body.message || "Architecture Consultation").trim();
      const bookingDate = String(body.bookingDate || new Date().toISOString().slice(0, 10)).trim();
      const startTime = String(body.startTime || "10:00").trim();
      const endTime = String(body.endTime || "10:45").trim();
      const timezone = String(body.timezone || "America/New_York").trim();

      if (!name || !email || !email.includes("@")) {
        return new Response(
          JSON.stringify({ success: false, message: "Valid name and business email are required." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check slot collision
      const collisionRes = await sbRest(
        `session_bookings?booking_date=eq.${encodeURIComponent(bookingDate)}&start_time=eq.${encodeURIComponent(startTime)}&status=neq.cancelled&select=id`
      );
      const collisions = collisionRes.ok ? await collisionRes.json() : [];
      if (collisions.length > 0) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `Slot ${startTime} on ${bookingDate} is already reserved. Please choose another slot.`
          }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const nowIso = new Date().toISOString();
      const bookingId = `TG-BK-${bookingDate.replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

      await Promise.all([
        sbRest("session_bookings?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify({
            id: bookingId,
            name,
            email,
            company,
            job_title: jobTitle,
            phone,
            area_of_interest: areaOfInterest,
            challenge_description: challengeDescription,
            booking_date: bookingDate,
            start_time: startTime,
            end_time: endTime,
            timezone,
            status: "confirmed",
            created_at: nowIso,
            updated_at: nowIso
          })
        }),
        sbRest("talk_to_architect", {
          method: "POST",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({
            submission_id: bookingId,
            name,
            work_email: email,
            company,
            phone: phone || null,
            architecture_query: `${areaOfInterest}: ${challengeDescription}`,
            preferred_time: `${bookingDate} ${startTime} (${timezone})`,
            status: "Booked",
            timestamp: nowIso
          })
        }),
        sbRest("form_consultation_bookings", {
          method: "POST",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({
            submission_id: bookingId,
            full_name: name,
            work_email: email,
            phone: phone || null,
            company_name: company,
            designation_role: jobTitle || null,
            transformation_interest: areaOfInterest,
            primary_challenge: challengeDescription,
            target_timeline: `${bookingDate} ${startTime}`,
            source: "Calendar Booking Agent",
            status: "Booked",
            timestamp: nowIso
          })
        })
      ]);

      return new Response(
        JSON.stringify({
          success: true,
          agent: "calendar-booking-agent",
          bookingId,
          bookingDate,
          startTime,
          endTime,
          timezone,
          status: "confirmed",
          message: "Executive consultation session confirmed and synced to Supabase."
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: `Method ${req.method} not supported` }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || "Internal agent error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

