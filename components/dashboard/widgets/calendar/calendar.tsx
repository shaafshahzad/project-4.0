"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDateTitle } from "@/lib/get-date-title";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";

const Calendar = () => {
  const title = getDateTitle();
  const router = useRouter();
  const user = useAuth(router);
  const userEmail = user?.email || "";

  return (
    <Card className="flex flex-col col-span-3 col-start-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin]}
          initialView="timeGridWeek"
          headerToolbar={false}
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
      </CardContent>
    </Card>
  );
};

export default Calendar;
