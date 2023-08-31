import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Show from "./../Show";

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

test("renders without errors", () => {
  //Arrange
  render(<Show />);
});

test("renders Loading component when prop show is null", () => {
  //Arrange
  render(<Show show={null} />);

  //Act
  const loadingComponent = screen.getByTestId("loading-container");

  //Assert
  expect(loadingComponent).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  //Arrange
  render(
    <Show show={testShow} selectedSeason="none" handleSelect={() => {}} />
  );

  //Act
  const options = screen.queryAllByTestId("season-option");

  //Assert
  expect(options).toHaveLength(2);
});

test("handleSelect is called when an season is selected", () => {
  //Arrange
  const mockHandleSelect = jest.fn();
  render(
    <Show
      show={testShow}
      handleSelect={mockHandleSelect}
      selectedSeason="none"
    />
  );

  //Act
  const selectElement = screen.getByTestId("seasons");
  fireEvent.change(selectElement, { target: { value: "1" } });

  //Assert
  expect(mockHandleSelect).toHaveBeenCalled();
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  //Arrange
  const { rerender } = render(<Show show={testShow} selectedSeason="none" />);

  let episodes = screen.queryByTestId("episodes-container");

  expect(episodes).not.toBeInTheDocument();

  rerender(<Show show={testShow} selectedSeason={1} />);
  episodes = screen.queryByTestId("episodes-container");
  expect(episodes).toBeInTheDocument();
});
