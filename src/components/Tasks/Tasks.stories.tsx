import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Tasks} from "./Tasks";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLIST/Tasks',
    component: Tasks,
} as ComponentMeta<typeof Tasks>;

const Template: ComponentStory<typeof Tasks> = (args) => <Tasks {...args} />;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove button inside Task was clicked')

const baseArgs = {
    changeCheckBox: changeTaskStatusCallback,
    changeTaskTitleHandler: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

export const TasksIsDoneStories = Template.bind({});
TasksIsDoneStories.args = {
    ...baseArgs,
    id: '1234-DDS2-12WW-SSSS',
    title: 'HTML',
    isDone: true
};


export const TasksIsNotDoneStories = Template.bind({});
TasksIsNotDoneStories.args = {
    ...baseArgs,
    id: '1234-DDS2-12WW-SSSS',
    title: 'HTML',
    isDone: false
};

