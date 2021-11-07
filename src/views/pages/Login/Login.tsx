import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import AuthBlockerImage from '../../assets/illustrations/website-auth-1.svg';
import { useHistory } from 'react-router';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import './login.scss';
import { getAuthTokenRequest } from '../../helpers/axios';
import { IAuth } from '../../types/IUser';

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLoginSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);
    const formValues: IAuth = {
      username: form.elements.username.value,
      password: form.elements.password.value,
    };

    getAuthTokenRequest(formValues)
      .then((_: any) => history.push('/'))
      .catch((_: any) => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className='text-center d-flex' style={{ height: '550px' }}>
            <div className='text-center m-auto'>
              <Image style={{ maxHeight: '550px', width: '100%' }} src={AuthBlockerImage} alt='Provide Credentials' />
            </div>
          </div>
          <Card id="login-form-card">
            <Card.Body>
              <Card.Title>
              {!error && <span>Please provide your credentials</span>}
              {!!error && <span className='text-danger'>Incorrect credentials provided</span>}
              </Card.Title>
              <Form
                id='loginForm'
                className='mb-5 pb-2'
                noValidate
                onSubmit={handleLoginSubmit}>
                <Form.Group className="mt-2 mb-2" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>

                <div className='d-flex-center'>
                  <Button variant="primary" disabled={loading} type="submit">Login</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { Login };
