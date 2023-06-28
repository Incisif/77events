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

jest.mock(
  "../../components/PeopleCard",
  () =>
    // eslint-disable-next-line react/prop-types
    ({ imageSrc, name, position }) =>
      (
        <div data-testid="people-card">
          <img data-testid="people-card-image" src={imageSrc} alt={name} />
          <div>{name}</div>
          <div>{position}</div>
        </div>
      )
);

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    const eventListComponent = screen.getByTestId("event-list");
    expect(eventListComponent).toBeInTheDocument();
  });

  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleCardComponents = screen.getAllByTestId("people-card");
    const peopleCardImages = screen.getAllByTestId("people-card-image");
    const expectedImageSources = [
      "/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png",
      "/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png"]

    peopleCardComponents.forEach((component) => {
      expect(component).toBeInTheDocument();
    });

    peopleCardImages.forEach((image, index) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        "src",
        expectedImageSources[index]
      );
    });
  });

  it("a footer is displayed", () => {
    // to implement
  });
  it("an event card, with the last event, is displayed", () => {
    // to implement
  });
});
