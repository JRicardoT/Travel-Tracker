import { expect } from 'chai';
import TripRepo from '../src/Trip-repo';
import allTripsData from './test-data/trip-test-data';
import allDestinations from './test-data/trip-destinations-data';

describe('Triprepo', () => {
  let trip;

  beforeEach(() => {
    trip = new TripRepo(allTripsData[0], allDestinations);
  })

  it('should be a function', () => {
    expect(TripRepo).to.be.a('function');
  });

  it('should be an instance of TripRepo', () => {
    expect(trip).to.be.an.instanceOf(TripRepo);
  });

  it('should store trip data', () => {
    expect(trip.id).to.equal(1);
    expect(trip.userId).to.equal(44);
    expect(trip.destinationId).to.equal(49);
    expect(trip.travelers).to.equal(1);
    expect(trip.date).to.equal('2022/09/16');
    expect(trip.duration).to.equal(8);
    expect(trip.status).to.equal('approved');
    expect(trip.suggestedActivities).to.deep.equal([]);
  });

  it('should have a destination', () => {
    expect(trip.destination).to.deep.equal(allDestinations[2]);
  });
  
  it('should calculate the cost of the trip', () => {
    const cost = trip.calculateTripCost();
    expect(cost).to.equal(4761);
  });
});
