import React, { useEffect, useState } from 'react';
import { Button, Toast } from 'react-bootstrap';

import api from '../../services/api';
import { Container, List } from './styles';

interface User {
    id: number;
    type: string;
}

interface Trip {
    trip_id: number;
    destination_a: string;
    destination_b: string;
    driver_id: number;
    driver_name: string;
}

const Travelers: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        (async () => {
            const hasUser = localStorage.getItem('@app:user');
            if (hasUser) {
                setUser(JSON.parse(hasUser));
            }

            const response = await api.get(`/trips`);
            setTrips(response.data.trips);
        })();
    }, []);

    async function handleCreateMatch(
        tripId: number,
        driverId: number,
    ): Promise<void> {
        try {
            const payload = {
                driver_id: driverId,
                traveler_id: user?.id,
                trip_id: tripId,
            };
            await api.post(`/matches`, payload);
            setShowToast(true);
        } catch (err) {
            console.log('err', err);
        }
    }

    return (
        <>
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                style={{
                    marginTop: '15px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
            >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                    />
                    <strong className="mr-auto">Successfully added</strong>
                </Toast.Header>
            </Toast>
            <Container>
                <h1>Travelers</h1>

                <List>
                    {trips.length > 0 ? (
                        trips.map(trip => (
                            <li key={trip.trip_id}>
                                <span>
                                    {trip.destination_a}/ {trip.destination_b} -{' '}
                                    {trip.driver_name}
                                </span>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    type="button"
                                    onClick={() =>
                                        handleCreateMatch(
                                            trip.trip_id,
                                            trip.driver_id,
                                        )
                                    }
                                >
                                    Add
                                </Button>
                            </li>
                        ))
                    ) : (
                        <span>They are no trips</span>
                    )}
                </List>
            </Container>
        </>
    );
};

export default Travelers;
