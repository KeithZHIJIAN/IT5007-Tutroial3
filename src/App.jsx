const InitialTravellers = [];
const SeatRow = 5
const SeatColumn = 5

function DisplayHomepage() {
  return (
    <h1>Hi There! This is the Ticket to Ride 🚆. SG High-Speed Intercontinental Railway Reservation System.</h1>
  )
}

class AddTraveller extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.AddTraveller;
    const traveller = {
      name: form.name.value, phone: form.phone.value,
    }
    this.props.addTraveller(traveller);
    form.name.value = ""; form.phone.value = "";
  }

  render() {
    return (
      <form name="AddTraveller" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="phone" placeholder="Phone" required />
        <button>Add</button>
      </form>
    );
  }
}

class DeleteTraveller extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.DeleteTraveller;
    this.props.deleteTraveller(parseInt(form.id.value));
    form.id.value = "";
  }

  render() {
    return (
      <form name="DeleteTraveller" onSubmit={this.handleSubmit}>
        <input type="text" id="id" placeholder="Uid" required />
        <button>Delete</button>
      </form>
    );
  }
}

function TravellerRow(props) {
  const traveller = props.traveller;
  return (
    <tr>
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
    </tr>
  );
}

function DisplayTraveller(prop) {
  const TravellerRows = prop.travellers.map(traveller =>
    <TravellerRow key={traveller.id} traveller={traveller} />
  );

  return (
    <table className="Traveller-table">
      <thead>
        <tr>
          <th>Uid</th>
          <th>Name</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {TravellerRows}
      </tbody>
    </table>
  );
}

function DisplayFreeSeats(prop) {
  let occupiedSeats = prop.passengers;
  let msg = <p style={{ fontSize: 30 }, { opacity: 0.6 }}>🟥 Occupied: {occupiedSeats} ⬛ Free: {SeatRow * SeatColumn - occupiedSeats}</p>
  let seats = [];

  for (i = 0; i < SeatRow; i++) {
    for (j = 0; j < SeatColumn; j++) {
      if (occupiedSeats > 0) {
        seats.push(<b key={seats.length} style={{ fontSize: 30 }, { opacity: 0.6 }}>🟥</b>);
        occupiedSeats -= 1
      } else {
        seats.push(<b key={seats.length} style={{ fontSize: 30 }, { opacity: 0.6 }}>⬛</b>);
      }
    }
    seats.push(<br key={seats.length} />)
  }


  return (
    <>
      <h1>Seat Plan</h1>
      {seats}
      <br />
      {msg}
    </>
  );
}

class ReservationPage extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], nextUid: 1, page: "DisplayHomepage" };
    this.addTraveller = this.addTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleAddTravellerClick = this.handleAddTravellerClick.bind(this);
    this.handleDeleteTravellerClick = this.handleDeleteTravellerClick.bind(this);
    this.handleDisplayTravellerClick = this.handleDisplayTravellerClick.bind(this);
    this.handleDisplayFreeSeatsClick = this.handleDisplayFreeSeatsClick.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: InitialTravellers, nextUid: InitialTravellers.length + 1 });
    }, 500);
  }

  addTraveller(traveller) {
    const newTravellerList = this.state.travellers.slice();
    if (newTravellerList.length >= SeatRow * SeatColumn) {
      alert("No free seats!")
      return
    }
    traveller.id = this.state.nextUid;
    newTravellerList.push(traveller);
    this.setState({ travellers: newTravellerList, nextUid: traveller.id + 1 });
    alert("Successfully added!");
  }

  deleteTraveller(id) {
    const newTravellerList = this.state.travellers.filter(person => person.id !== id)
    if (this.state.travellers.length === newTravellerList.length) {
      alert("Uid does not exist, please refer to the traveller list.")
      return
    }
    this.setState({ travellers: newTravellerList });
    alert("Succfully deleted!");
  }

  handleHomeClick() {
    this.setState({ page: "DisplayHomepage" });
  }
  handleAddTravellerClick() {
    this.setState({ page: "AddTraveller" });
  }
  handleDeleteTravellerClick() {
    this.setState({ page: "DeleteTraveller" });
  }
  handleDisplayTravellerClick() {
    this.setState({ page: "DisplayTraveller" });
  }
  handleDisplayFreeSeatsClick() {
    this.setState({ page: "DisplayFreeSeats" });
  }

  render() {
    let NavigationBar =
      <>
        <button onClick={this.handleHomeClick}>Home</button>
        <button onClick={this.handleAddTravellerClick}>Add Traveller</button>
        <button onClick={this.handleDeleteTravellerClick}>Delete Traveller</button>
        <button onClick={this.handleDisplayTravellerClick}>Display Traveller</button>
        <button onClick={this.handleDisplayFreeSeatsClick}>Display Free Seats</button>
      </>

    let DispalyPage = null;
    let page = this.state.page;
    if (page === "DisplayHomepage") {
      DispalyPage = <DisplayHomepage />;
    } else if (page === "AddTraveller") {
      DispalyPage = <AddTraveller addTraveller={this.addTraveller} />;
    } else if (page === "DeleteTraveller") {
      DispalyPage = <DeleteTraveller deleteTraveller={this.deleteTraveller} />;
    } else if (page === "DisplayTraveller") {
      DispalyPage = <DisplayTraveller travellers={this.state.travellers} />;
    } else if (page === "DisplayFreeSeats") {
      DispalyPage = <DisplayFreeSeats passengers={this.state.travellers.length} />;
    }

    return (
      <>
        {NavigationBar}
        <hr />
        {DispalyPage}
      </>
    );
  }
}

const element = <ReservationPage />;

ReactDOM.render(element, document.getElementById('contents'));
