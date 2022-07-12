import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    argTypes: {
        updateTitle: {
            description: 'Button inside form clicked'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
    title: 'hi',
    updateTitle: action('EditableSpan value changed')
};

