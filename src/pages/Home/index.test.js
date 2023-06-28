import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

const mockEvents = [
  { id: 1, title: "Event 1", description: "Description 1" },
  { id: 2, title: "Event 2", description: "Description 2" },
];

jest.mock(
  "../../containers/Events",
  () =>
    function MockedEventList() {
      return (
        <div data-testid="event-list">
          {mockEvents.map((event) => (
            <div key={event.id} data-testid={event}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      );
    }
);


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />)
    const eventListComponent = screen.getByTestId("event-list");
    expect(eventListComponent).toBeInTheDocument();
  });

  it("a list a people is displayed", () => {
    render(<Home />)
    const peopleCardComponents = screen.getAllByTestId("people-card");
    peopleCardComponents.forEach((component) => {
      expect(component).toBeInTheDocument();
    });
  });

  it("a footer is displayed", () => {
    render(<Home/>)
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", () => {
    // to implement
  });
});
