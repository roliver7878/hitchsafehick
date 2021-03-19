import React, { FormEvent, useEffect, useState } from 'react';
import { Row, Form, Button, Spinner, Toast } from 'react-bootstrap';

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
}

const Trips: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(false);
    const [destinationA, setDestinationA] = useState('');
    const [destinationB, setDestinationB] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        (async () => {
            const hasUser = localStorage.getItem('@app:user');
            if (hasUser) {
                const user = JSON.parse(hasUser);
                const response = await api.get(`/trips/${user.id}`);
                setUser(user);
                setTrips(response.data.trips);
            }
        })();
    }, []);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();
        setLoading(true);

        try {
            const payload = {
                destination_a: destinationA,
                destination_b: destinationB,
                driver_id: user?.id,
            };
            const response = await api.post('/trips', payload);
            const data = {
                trip_id: response.data.id,
                destination_a: response.data.destination_a,
                destination_b: response.data.destination_b,
            };

            setTrips([...trips, data]);
        } catch (err) {
            console.log('err', err);
        } finally {
            setLoading(false);
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
                <h1>My trips</h1>

                <form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group>
                            <Form.Label>
                                <strong>Destination A</strong>
                            </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="destination_a"
                                onChange={e => setDestinationA(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                <strong>Destination B</strong>
                            </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="destination_b"
                                onChange={e => setDestinationB(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Button variant="primary" size="sm" type="submit">
                        {loading ? (
                            <Spinner
                                animation="border"
                                size="sm"
                                variant="primary"
                            />
                        ) : (
                            'Add'
                        )}
                    </Button>
                </form>

                <List>
                    {trips.map(trip => (
                        <li key={trip.trip_id}>
                            {trip.destination_a}/ {trip.destination_b}
                        </li>
                    ))}
                </List>
            </Container>
        </>
    );
};

export default Trips;
