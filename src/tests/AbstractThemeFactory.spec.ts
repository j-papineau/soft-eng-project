import { describe, expect, test } from "vitest";
import {
  BaseTheme,
  BlueTheme,
  DarkTheme,
  GreenTheme,
  makeTheme,
} from "../lib/AbstractThemeFactory";
//import renderer from 'react-test-renderer'
//
describe("Themes", () => {
  test("should make DefaultTheme", () => {
    makeTheme(new BaseTheme());
    const res = document.documentElement.getAttribute("style");
    console.log(res);
    expect(res).toEqual(
      "--color-text: black; --color-bg: white; --color-tile: white; --color-grid: black; --color-warning: red; --color-x: black; --color-o: black; --color-modal: white; --color-input: white; --color-input-text: black; --color-button: blue; --color-button-text: white;"
    );
  });

  test("should make DarkTheme", () => {
    makeTheme(new DarkTheme());
    const res = document.documentElement.getAttribute("style");
    expect(res).toEqual(
      "--color-text: white; --color-bg: #444; --color-tile: #eee; --color-grid: black; --color-warning: #ee1100; --color-x: black; --color-o: black; --color-modal: blue; --color-input: white; --color-input-text: black; --color-button: black; --color-button-text: white;"
    );
  });

  test("should make GreenTheme", () => {
    makeTheme(new GreenTheme());
    const res = document.documentElement.getAttribute("style");
    expect(res).toEqual(
      "--color-text: white; --color-bg: #00aa11; --color-tile: #green; --color-grid: black; --color-warning: #ee11ea; --color-x: #eaf; --color-o: #eaf; --color-modal: green; --color-input: teal; --color-input-text: white; --color-button: green; --color-button-text: white;"
    );
  });
  test("should make BlueTheme", () => {
    makeTheme(new BlueTheme());
    const res = document.documentElement.getAttribute("style");
    expect(res).toEqual(
      "--color-text: black; --color-bg: lightsteelblue; --color-tile: #eee; --color-grid: black; --color-warning: #0022ee; --color-x: blue; --color-o: blue; --color-modal: blue; --color-input: white; --color-input-text: black; --color-button: #0022aa; --color-button-text: white;"
    );
  });
});
