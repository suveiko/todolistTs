import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";

import {CheckboxForm} from "./CheckboxForm";


export default {
    title: 'TODOLIST/Checkbox',
    component: CheckboxForm,
    argTypes: {
        callBack: {
            description: 'checkbox clicked'
        }
    },
} as ComponentMeta<typeof CheckboxForm>;

const Template: ComponentStory<typeof CheckboxForm> = (args) => <CheckboxForm {...args} />;

export const CheckboxStoriesTrue = Template.bind({});
CheckboxStoriesTrue.args = {
    isDone: true,
    callBack: action('checkbox isDone true')
};

export const CheckboxStoriesFalse = Template.bind({});
CheckboxStoriesFalse.args = {
    isDone: false,
    callBack: action('checkbox isDone false')
};