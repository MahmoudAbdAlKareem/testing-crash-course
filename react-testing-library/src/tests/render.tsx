import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import AppContext from "../contexts/AppContext";

const testRender = (
  Component: React.ReactElement,
  options: RenderOptions = {}
) => {
  function Wrapper({ children }) {
    return <AppContext>{children}</AppContext>;
  }

  return render(Component, { wrapper: Wrapper, ...options });
};

export default testRender;
