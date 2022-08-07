import React from "react";
import { Button as MaterialButton, ButtonProps } from "@mui/material";

export const Button: React.FC<ButtonProps> = (props) => (
  <MaterialButton {...props} />
);
