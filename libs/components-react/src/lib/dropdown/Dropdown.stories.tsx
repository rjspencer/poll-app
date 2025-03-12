import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'Dropdown',
  args: {
    name: 'country',
    options: [
      {
        label: 'United States',
        value: 'us',
      },
      {
        label: 'Canada',
        value: 'ca',
      },
      {
        label: 'Mexico',
        value: 'mx',
      },
    ],
    label: 'Country',
    placeholder: 'Select one...',
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Primary = {};

export const Heading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Dropdown!/gi)).toBeTruthy();
  },
};
