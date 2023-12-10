import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tile } from "../components/Tile";
import { PLAYER_ONE, PLAYER_TWO } from "../constants";
//import renderer from 'react-test-renderer'
//
describe("Tile Component", () => {
  test("should display O for PlayerOne", async () => {
    render(<Tile row={0} column={0} owner={PLAYER_ONE} onClick={() => null} />);
    expect(await screen.findByText("O")).toBeInTheDocument();
  });

  test("should display X for PlayerTwo", async () => {
    render(<Tile row={0} column={0} owner={PLAYER_TWO} onClick={() => null} />);
    expect(await screen.findByText("X")).toBeInTheDocument();
  });
});
