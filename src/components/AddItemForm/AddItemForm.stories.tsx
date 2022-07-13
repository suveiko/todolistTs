import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";

import {AddItemForm} from "./AddItemForm";


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

