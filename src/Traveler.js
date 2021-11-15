import TripRepo from "./Trip-repo";

class Traveler {
  constructor(travelersData, allTripsData, allDestinations) {
    this.id = travelersData.id;
    this.name = travelersData.name;
    this.type = travelersData.travelerType;
    this.trips = this.getAllTravelerTrips(allTripsData, allDestinations);
  }

  getAllTravelerTrips(allTripsData, allDestinations) {
    let trips = [];
    allTripsData.forEach(trip => {
      if (trip.userID === this.id) {
        const newTrip = new TripRepo(trip, allDestinations);
        trips.push(newTrip);
      }
    });
    return trips;
  }

  calculateTotalSpent()  {
    const thisYearTrips = this.trips.filter(trip => {
      if (new Date(trip.date).getFullYear() === 2021) {
        return trip;
      }
    });
    const totalSpentInYear = thisYearTrips.reduce((total, trip) => {
      return total += trip.calculateTripCost();
    }, 0);
    return totalSpentInYear;
    // .toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
}

export default Traveler;
