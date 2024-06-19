"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/calendar/sidebar";

const Calendar = () => {
  const router = useRouter();
  const user = useAuth(router);
  const userEmail = user?.email || "";
  const accessToken = user?.googleAccessToken || "";

  return (
    <div className="w-full h-full flex">
      <Sidebar accessToken={accessToken} />
      <div className="w-full p-14">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
          eventSources={[
            {
              googleCalendarId: `${userEmail}`,
            },
          ]}
          nowIndicator
          now={new Date().toISOString()}
          allDaySlot={false}
          height="100%"
        />
      </div>
    </div>
  );
};

export default Calendar;
