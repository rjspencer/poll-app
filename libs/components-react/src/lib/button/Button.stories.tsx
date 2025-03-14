import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary = {
  args: {
    children: 'Click me',
    onClick: '',
    props: '',
  },
};

export const Heading: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Click me/gi)).toBeTruthy();
  },
};
