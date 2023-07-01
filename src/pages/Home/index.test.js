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
const firstMockEvent = {
  cover: "firstEventCover.png",
  title: "First event",
  date: "2023-01-01",
};
const lastMockEvent = {
  cover: "lastEventCover.png",
  title: "Last event",
  date: "2023-02-01",
};
jest.mock("../../contexts/DataContext", () => ({
  useData: () => ({ data: { events: [firstMockEvent, lastMockEvent] } }),
}));

describe("When a page is created", () => {});
it("a list of events is displayed", () => {
  render(<Home />);
  const eventListComponent = screen.getByTestId("event-list");
  expect(eventListComponent).toBeInTheDocument();
});

it("affiche une liste de cartes de personnes", () => {
  render(<Home />);
  const peopleCardComponents = screen.getAllByTestId("people-card");
  expect(peopleCardComponents).toHaveLength(6);
  peopleCardComponents.forEach((component) => {
    const image = component.querySelector("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
  });
});

it("a footer is displayed", () => {
  render(<Home />);
  const footer = screen.getByTestId("footer");
  expect(footer).toBeInTheDocument();
});
it("an event card, with the last event, is displayed", async () => {
  render(<Home />);
  const lastEvent = await screen.findByText("Last event");
  expect(lastEvent).toBeInTheDocument();
});
