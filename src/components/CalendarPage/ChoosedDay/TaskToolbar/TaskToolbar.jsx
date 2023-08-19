import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Popover } from 'react-tiny-popover';

import { useDeleteTasksMutation, useUpdateTasksMutation } from 'src/redux/tasks/tasksApi';

import { ArrowCircleBrokenRight, Pencil, Trash } from 'src/components/shared/Icons';

import {
  TaskToolbarStyles,
  TaskToolbarBtn,
  PopoverWrapper,
  RelocateButton
} from './TaskToolbar.styled';

export default function TaskToolbar({ task, openModal }) {
  const { t } = useTranslation();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [deleteTask, deleteResult] = useDeleteTasksMutation();
  const [updateTask, updateResult] = useUpdateTasksMutation();

  const categories = ['to-do', 'in-progress', 'done'];
  const categoriesFiltered = categories.filter((category) => category !== task.category);

  const getCategory = (category) => {
    switch (category) {
      case 'to-do':
        return 'To do';
      case 'To do':
        return 'to-do';
      case 'In progress':
        return 'in-progress';
      case 'in-progress':
        return 'In progress';
      case 'Done':
        return 'done';
      case 'done':
        return 'Done';
      default:
        break;
    }
  };

  const removeTask = () => {
    deleteTask(task._id);
  };

  const replaceTask = (newCategory) => {
    updateTask({
      id: task._id,
      title: task.title,
      start: task.start,
      end: task.end,
      priority: task.priority,
      date: task.date,
      category: getCategory(newCategory)
    });
  };

  return (
    <TaskToolbarStyles>
      <Popover
        isOpen={isPopoverOpen}
        positions={['bottom', 'right']}
        align="start"
        padding={8}
        content={
          <PopoverWrapper>
            <RelocateButton onClick={() => replaceTask(getCategory(categoriesFiltered[0]))}>
              {t(getCategory(categoriesFiltered[0]))}
              <ArrowCircleBrokenRight width="16" height="16" />
            </RelocateButton>
            <RelocateButton onClick={() => replaceTask(getCategory(categoriesFiltered[1]))}>
              {t(getCategory(categoriesFiltered[1]))}
              <ArrowCircleBrokenRight width="16" height="16" />
            </RelocateButton>
          </PopoverWrapper>
        }
        onClickOutside={() => setIsPopoverOpen(false)}
      >
        <TaskToolbarBtn onClick={() => setIsPopoverOpen(true)}>
          <ArrowCircleBrokenRight width="14" height="14" />
        </TaskToolbarBtn>
      </Popover>

      <TaskToolbarBtn onClick={() => openModal(task)}>
        <Pencil width="14" height="14" />
      </TaskToolbarBtn>

      <TaskToolbarBtn>
        <Trash width="14" height="14" onClick={removeTask} />
      </TaskToolbarBtn>
    </TaskToolbarStyles>
  );
}

TaskToolbar.propTypes = {
  task: PropTypes.object,
  openModal: PropTypes.func
};
