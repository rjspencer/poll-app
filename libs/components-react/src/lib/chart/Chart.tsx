import {
  Chart as KendoChart,
  ChartTitle,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartCategoryAxisTitle,
  ChartSeries,
  ChartSeriesItem,
} from '@progress/kendo-react-charts';
import { ComponentProps, FC } from 'react';
import '@themebuilder-css';

type ChartProps = ComponentProps<typeof KendoChart> & {
  heading: string;
  dataTitle?: string;
  dataLabels?: string[];
  data: number[];
  type?: 'line' | 'bar' | 'column' | 'area' | 'pie';
};

export const Chart: FC<ChartProps> = ({
  heading,
  dataTitle,
  dataLabels,
  data,
  type,
  ...props
}) => {
  return (
    <KendoChart {...props}>
      <ChartTitle text={heading} />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={dataLabels}>
          <ChartCategoryAxisTitle text={dataTitle} />
        </ChartCategoryAxisItem>
      </ChartCategoryAxis>
      <ChartSeries>
        <ChartSeriesItem gap={2} spacing={0.25} data={data} type={type} />
      </ChartSeries>
    </KendoChart>
  );
};
