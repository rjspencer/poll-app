import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';

const meta: Meta<typeof Chart> = {
  component: Chart,
  args: {
    header: 'This is a chart',
    dataLabels: ['Jan', 'Feb', 'Mar', 'Apr'],
    data: [10, 20, 40, 30],
    dataTitle: 'Monthly Data',
    type: 'column',
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const Primary: Story = {};

export const Bar: Story = {
  args: {
    type: 'bar',
  },
};

export const Column: Story = {
  args: {
    type: 'column',
  },
};

export const Area: Story = {
  args: {
    type: 'area',
  },
};

export const Pie: Story = {
  args: {
    type: 'pie',
  },
};

export const Line: Story = {
  args: {
    type: 'line',
  },
};
