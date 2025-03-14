import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Input> = {
  component: (props) => <Input {...props} style={{ width: '16rem' }} />,
  title: 'Input',
  args: {
    label: 'First name:',
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Primary = {};

export const Heading: Story = {
  args: {
    defaultValue: 'John',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByLabelText(/First name/gi)).toHaveValue('John');
  },
};
