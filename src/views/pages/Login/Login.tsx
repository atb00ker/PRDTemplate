import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import { Redirect, useHistory } from 'react-router';
import Form from 'react-bootstrap/Form';
import { getAuthTokenRequest, HTTPResponse } from '../../helpers/axios';
import { IAuthDispatcherUser, ILogin, IToken } from '../../types/User';
import { AuthContext } from '../../components/Authentication/AuthProvider';
import './login.scss';
import { AuthReducer } from '../../enums/Reducers';
import { RouterPath } from '../../enums/UrlPath';
import { AuthRequiredImage } from '../../components/ContentState/AuthRequiredImage';

const Login = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLoginSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);
    const formValues: ILogin = {
      username: form.elements.username.value,
      password: form.elements.password.value,
    };

    getAuthTokenRequest(formValues)
      .then((response: HTTPResponse<IToken>) => {
        const user: IAuthDispatcherUser = {
          token: response.data.token,
          username: formValues.username,
        };
        auth.dispatcher({ type: AuthReducer.Login, user });
        history.push(RouterPath.Dashboard);
      })
      .catch((error: Error) => {
        console.error(error);
        setLoading(false);
        setError(true);
      });
  };
  if (auth.state && auth.state.isAuthenticated) return <Redirect to={RouterPath.Home} />;

  return (
    <Container>
      <Row>
        <Col>
          <AuthRequiredImage height='550px' width='100%' imgHeight='550px'  />
          <Card id='login-form-card'>
            <Card.Body>
              <Card.Title>
                {!error && <span>Please provide your credentials</span>}
                {!!error && <span className='text-danger'>Incorrect credentials provided</span>}
              </Card.Title>
              <Form id='loginForm' className='mb-5 pb-2' noValidate onSubmit={handleLoginSubmit}>
                <Form.Group className='mt-2 mb-2' controlId='username'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type='username' placeholder='Enter username' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Enter password' />
                </Form.Group>

                <div className='d-flex-center'>
                  <Button variant='primary' disabled={loading} type='submit'>
                    Login
                  </Button>
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
