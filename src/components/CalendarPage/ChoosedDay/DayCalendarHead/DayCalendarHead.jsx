import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { addDays, eachDayOfInterval, format, startOfWeek } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import {
  DayCalendarHeadStyles,
  DayCalendarHeadItem,
  WeekDay,
  DateDayWrap,
  DateDay
} from './DayCalendarHead.styled';

export default function DayCalendarHead({ date }) {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState(date);
  const navigate = useNavigate();

  const screenWidth = window.innerWidth;

  const firstWeekDay = startOfWeek(new Date(date), { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({
    start: firstWeekDay,
    end: addDays(firstWeekDay, 6)
  });

  const getWeekDay = (day) => {
    if (screenWidth >= 768) {
      return t(format(day, 'eee'));
    }
    return t(`mob_${format(day, 'eee')}`);
  };

  const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd');
  };

  const onSelectDay = (date) => {
    const path = `/calendar/day/${formatDate(date)}`;

    setSelectedDay(formatDate(date));

    navigate(path, { replace: true });
  };

  return (
    <DayCalendarHeadStyles>
      {weekDays.map((day) => (
        <DayCalendarHeadItem key={day}>
          <a onClick={() => onSelectDay(day)}>
            <WeekDay>{getWeekDay(day)}</WeekDay>
            <DateDayWrap selected={formatDate(day) === selectedDay}>
              <DateDay>{format(day, 'd')}</DateDay>
            </DateDayWrap>
          </a>
        </DayCalendarHeadItem>
      ))}
    </DayCalendarHeadStyles>
  );
}

DayCalendarHead.propTypes = {
  date: PropTypes.string
};
