import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'button clicked inside'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
    addItem: action('button clicked inside')
};

