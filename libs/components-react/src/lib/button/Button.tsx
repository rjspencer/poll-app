import React, { ComponentProps } from 'react';
import { Button as KendoButton } from '@progress/kendo-react-buttons';
import '@themebuilder-css';

type ButtonProps = ComponentProps<typeof KendoButton>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <KendoButton {...props}>{children}</KendoButton>;
};

export default Button;
