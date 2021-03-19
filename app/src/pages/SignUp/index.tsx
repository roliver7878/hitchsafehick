import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Form, Button } from 'react-bootstrap';

import api from '../../services/api';
import { Container } from './styles';

const SignUp: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('driver');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [policeCheck, setPoliceCheck] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();

        try {
            const response = await api.post('/users', {
                email,
                password,
                user_type: userType,
            });
            const { user_id } = response.data;

            const travelerData = {
                user_id,
                name,
                gender,
                age,
                police_check: policeCheck,
            };
            const driverData = {
                user_id,
                name,
                gender,
                age: parseInt(age),
                police_check: policeCheck,
                driver_licence: driverLicense,
                vehicle_plate_number: vehiclePlate,
                vehicle_model: vehicleModel,
            };
            console.log('driverData', driverData);
            if (userType === 'driver') {
                const response = await api.post('/drivers', driverData);
                const driverId = response.data.id;
                localStorage.setItem(
                    '@app:user',
                    JSON.stringify({ id: driverId, type: 'driver' }),
                );
            } else {
                const response = await api.post('/travelers', travelerData);
                const travelerId = response.data.id;
                localStorage.setItem(
                    '@app:user',
                    JSON.stringify({ id: travelerId, type: 'traveler' }),
                );
            }
            history.push('/');
        } catch (err) {
            console.log('err', err);
        }
    };

    return (
        <Container>
            <h1>Sign Up</h1>
            <h2>
                {userType === 'driver'
                    ? 'Driver informations'
                    : 'Traveler informations'}
            </h2>

            <form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group>
                        <Form.Label>
                            <strong>Role</strong>
                        </Form.Label>
                        <Form.Control
                            as="select"
                            size="sm"
                            custom
                            name="user_type"
                            onChange={e => setUserType(e.target.value)}
                        >
                            <option value="driver">Driver</option>
                            <option value="traveler">Traveler</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <strong>Email address</strong>
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            name="email"
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>
                            <strong>Password</strong>
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            name="password"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <strong>Name</strong>
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            type="text"
                            name="name"
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>
                            <strong>Gender</strong>
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            as="select"
                            name="gender"
                            custom
                            onChange={e => setGender(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <strong>Age</strong>
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            type="text"
                            name="age"
                            onChange={e => setAge(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>
                        <strong>Police Check</strong>
                    </Form.Label>
                    <Form.Control
                        size="sm"
                        type="text"
                        name="police_check"
                        onChange={e => setPoliceCheck(e.target.value)}
                    />
                </Form.Group>
                {userType === 'driver' && (
                    <>
                        <Form.Group>
                            <Form.Label>
                                <strong>Driver License</strong>
                            </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="driver_license"
                                onChange={e => setDriverLicense(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                <strong>Vehicle Plate Number</strong>
                            </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="vehicle_plate_number"
                                onChange={e => setVehiclePlate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                <strong>Vehicle Model</strong>
                            </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                name="vehicle_model"
                                onChange={e => setVehicleModel(e.target.value)}
                            />
                        </Form.Group>
                    </>
                )}

                <Button variant="primary" type="submit">
                    Create Account
                </Button>
                <Link to="/">Return</Link>
            </form>
        </Container>
    );
};

export default SignUp;
