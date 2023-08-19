import {
  MonthCalendarHeadStyles,
  WorkDay,
  WeekendDay,
  MobileDaysList,
  DesktopDayList
} from './MonthCalendarHead.styled';

const workDayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const weekendDayNames = ['SAT', 'SUN'];

export default function MonthCalendarHead() {
  return (
    <MonthCalendarHeadStyles>
      <DesktopDayList>
        {workDayNames.map((day) => (
          <WorkDay key={day}>{day}</WorkDay>
        ))}
        {weekendDayNames.map((day) => (
          <WeekendDay key={day}>{day}</WeekendDay>
        ))}
      </DesktopDayList>
      <MobileDaysList>
        {workDayNames.map((day) => (
          <WorkDay key={day}>{day[0]}</WorkDay>
        ))}
        {weekendDayNames.map((day) => (
          <WeekendDay key={day}>{day[0]}</WeekendDay>
        ))}
      </MobileDaysList>
    </MonthCalendarHeadStyles>
  );
}
