import { expect } from 'chai';
import TripRepo from '../src/Trip-repo';
import allTripsData from './test-data/trip-test-data';

describe('Triprepo', () => {
  let trip;

  beforeEach(() => {
    trip = new TripRepo(allTripsData[0]);
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

  // it('should calculate the money spent on trips for the year', () => {
    // {
    //   "id": 4,
    //   "userID": 43,
    //   "destinationID": 14,
    //   "travelers": 2,
    //   "date": "2022/02/25",
    //   "duration": 10,
    //   "status": "approved",
    //   "suggestedActivities": []
    // },
  //   trip.calcualteTripCost();

  // });
});
