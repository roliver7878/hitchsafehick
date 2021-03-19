from typing import Dict

from app.models.tables import Trip


class TripsService:
    trip_model = Trip

    def get_one(self, trip_id):
        return self.trip_model.find_by_id(trip_id)

    def get_all_trips_with_driver_id(self, driver_id):
        return self.trip_model.find_all(driver_id)

    def get_all_trips(self):
        return self.trip_model.find_all_trips()

    def create(self, payload) -> Dict:
        trip = self.trip_model(
            driver_id=payload['driver_id'],
            destination_a=payload['destination_a'],
            destination_b=payload['destination_b'])
        trip.save()
        return trip.to_dict()

    def update(self, payload, user_id):
        user = self.trip_model.create_instance_with_id(user_id)
        user.update(email=payload['email'], password=payload['password'])
        return True
