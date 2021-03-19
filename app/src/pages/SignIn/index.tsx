import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import api from '../../services/api';
import { Container } from './styles';

const SignIn: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();

        try {
            const response = await api.post('/login', {
                email,
                password,
            });
            const { user_type } = response.data;

            user_type === 'driver'
                ? history.push('/trips')
                : history.push('/travelers');
        } catch (err) {
            console.log('err', err);
        }
    };

    return (
        <Container>
            <h1 style={{ fontSize: 22 }}>Sign In</h1>

            <form onSubmit={handleSubmit}>
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

                <Button variant="primary" type="submit">
                    Enter
                </Button>
                <Link to="/sign-up">Create account</Link>
            </form>
        </Container>
    );
};

export default SignIn;
