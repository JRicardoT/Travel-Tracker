import { expect } from 'chai';
import Traveler from '../src/Traveler';
import travelersData from './test-data/traveler-test-data';
import allTripsData from './test-data/trip-test-data';
import allDestinations from './test-data/trip-destinations-data';

describe('Traveler', () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler(travelersData[2], allTripsData, allDestinations);
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should store the traveler\'s data', () => {
    expect(traveler.id).to.equal(3);
    expect(traveler.name).to.equal('Sibby Dawidowitsch');
    expect(traveler.type).to.equal('shopper');
  });

  it('should store all traveler\'s trips', () => {
    expect(traveler.trips).to.deep.equal([
      {
        id: 3,
        userId: 3,
        destinationId: 22,
        travelers: 4,
        date: '2021/05/22',
        duration: 17,
        status: 'approved',
        suggestedActivities: [],
        destination: {
          id: 22,
          destination: 'Rome, Italy',
          estimatedLodgingCostPerDay: 90,
          estimatedFlightCostPerPerson: 650,
          image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          alt: 'people standing inside a colosseum during the day'
        }
      },
      {
        id: 41,
        userId: 3,
        destinationId: 25,
        travelers: 3,
        date: '2021/08/30',
        duration: 11,
        status: 'approved',
        suggestedActivities: [],
        destination: {
          id: 25,
          destination: 'New York, New York',
          estimatedLodgingCostPerDay: 175,
          estimatedFlightCostPerPerson: 200,
          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          alt: 'people crossing the street during the day surrounded by tall buildings and advertisements'
        }
      }
    ]);
  });

  it('should calculate the amount a traveler spent in a year', () => {
    const travelerAmountSpent = traveler.calculateTotalSpent();
    expect(travelerAmountSpent).to.equal(5989.5);
  })
});
