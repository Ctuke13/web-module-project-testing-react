import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Display from "./../Display";

import mockFetchShow from "./../../api/fetchShow";
jest.mock("./../../api/fetchShow");

const testShow = {
  name: "",
  image: {},
  seasons: [
    {
      id: 0,
      name: "Szn 1",
      episodes: [],
    },
    {
      id: 1,
      name: "Szn 2",
      episodes: [],
    },
  ],
  summary: "",
};

test("renders without errors with no props", async () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  //Mocked API
  mockFetchShow.mockResolvedValueOnce(testShow);

  //Arrange
  render(<Display />);
  const button = screen.getByRole("button");

  //Act
  fireEvent.click(button);
  const show = await screen.findByTestId("show-container");

  //Assert
  expect(show).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  //Mocked API
  mockFetchShow.mockResolvedValueOnce(testShow);

  //Arrange
  render(<Display />);
  const button = screen.getByRole("button");

  //Act
  fireEvent.click(button);

  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId("season-option");
    console.log(seasonOptions);
    expect(seasonOptions).toHaveLength(2);
  });
});
