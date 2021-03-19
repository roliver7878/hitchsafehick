from typing import Dict

from app.models.tables import Driver


class DriversServices:
    driver_model = Driver

    def get_one(self, driver_id):
        return self.driver_model.find_by_id(driver_id)

    def get_all(self):
        return self.driver_model.find_all()

    def create(self, payload) -> Dict:
        driver = self.driver_model(
            name=payload['name'],
            gender=payload['gender'],
            age=payload['age'],
            police_check=payload['police_check'],
            driver_licence=payload['driver_licence'],
            vehicle_plate_number=payload['vehicle_plate_number'],
            vehicle_model=payload['vehicle_model'],
            user_id=payload['user_id']
        )
        driver.save()
        return driver.to_dict()

