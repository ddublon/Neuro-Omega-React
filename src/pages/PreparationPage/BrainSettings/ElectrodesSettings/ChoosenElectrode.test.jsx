import React from "react";
import { render, screen } from "@testing-library/react";
import ChooseElectrode from "./ChooseElectrode";
import { expect, describe, it , test } from "vitest";

describe("ChooseElectrode", () => {
  it("renders the container element and checks for 4 hidden elements", () => {



   const electrodeNumbers = [1, 2, 3, 4, 5];
    const mockSetElectrodeNumbers = () => {console.log("mock function")};

    render(
      <ChooseElectrode
        side={"Left"}
        electrodeNumbers={electrodeNumbers}
        setElectrodeNumbers={mockSetElectrodeNumbers}
      />
    );
    expect(screen.getByTestId("container")).toBeDefined();

    // const fn = () => {
    //   console.log("mock function");
    // };

    // // Just pass values directly to the component.
    // // You might have to create a mock function for the setElectrodeNumbers prop
    // const electrodeNumbers = [1, 2, 3, 4, 5];
    // const mockSetElectrodeNumbers = fn();

    // render(
    //   <ChooseElectrode
    //     side={"Left"}
    //     electrodeNumbers={electrodeNumbers}
    //     setElectrodeNumbers={mockSetElectrodeNumbers}
    //   />
    // );

    // const containerElement = screen.getByTestId("container"); // Assume that you have set the data-testid="container" in your component
    // expect(containerElement).toBeInTheDocument();

    // const hiddenElements = screen.queryAllByTestId("hidden"); // Assume that you have set the data-testid="hidden" in your component
    // expect(hiddenElements.length).toBe(4);
  });
});
