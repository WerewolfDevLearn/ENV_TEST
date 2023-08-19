import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { differenceInSeconds } from 'date-fns';

import { useUser } from 'src/redux/selectors';

import { Avatar } from '../../../shared/Icons';

import TaskToolbar from '../TaskToolbar/TaskToolbar';

import {
  TaskColumnCardStyles,
  TaskTitle,
  TaskCardWrap,
  TaskCardInner,
  OwnerAvatarOverlay,
  TaskPriority,
  UserAvatar
} from './TaskColumnCard.styled';

export default function TaskColumnCard({ task, tasksCount, openModal }) {
  const { t } = useTranslation();
  const { title, priority } = task;

  const { avatarUrl } = useUser();

  const getDifference = (date) => {
    const difference = differenceInSeconds(new Date(), new Date(date));
    if (task.category !== 'done') {
      return difference;
    }
    return -1;
  };

  return (
    <>
      <TaskColumnCardStyles
        initial={{
          height: 0,
          padding: 0,
          marginTop: 0
        }}
        animate={{
          height: '108px',
          padding: '14px',
          marginTop: '14px'
        }}
        exit={{
          height: 0,
          padding: 0,
          marginTop: 0
        }}
        transition={{
          duration: 0.1
        }}
        taskscount={tasksCount}
        difference={getDifference(new Date(`${task.date} ${task.end}`))}
      >
        <TaskTitle>{title}</TaskTitle>
        <TaskCardWrap>
          <TaskCardInner>
            <OwnerAvatarOverlay>
              {avatarUrl ? (
                <UserAvatar src={avatarUrl} width="100%" height="100%" />
              ) : (
                <Avatar width="100%" height="100%" />
              )}
            </OwnerAvatarOverlay>
            <TaskPriority priority={priority}>{t(priority)}</TaskPriority>
          </TaskCardInner>
          <TaskToolbar task={task} openModal={openModal} />
        </TaskCardWrap>
      </TaskColumnCardStyles>
    </>
  );
}

TaskColumnCard.propTypes = {
  task: PropTypes.object.isRequired,
  tasksCount: PropTypes.number,
  openModal: PropTypes.func
};
