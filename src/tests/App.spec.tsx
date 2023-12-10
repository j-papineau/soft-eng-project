import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
//import renderer from 'react-test-renderer'
//
describe("App Component", () => {
  test("should be true", () => {
    render(<App />);
    expect(!!App).toBe(true);
  });
});
