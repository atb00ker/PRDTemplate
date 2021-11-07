import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import { Redirect, useHistory } from 'react-router';
import Form from 'react-bootstrap/Form';
import { HTTPResponse, signUpRequest } from '../../helpers/axios';
import { ILogin, ISignUp } from '../../types/User';
import { AuthContext } from '../../components/Authentication/AuthProvider';
import { RouterPath } from '../../enums/UrlPath';
import { AuthRequiredImage } from '../../components/ContentState/AuthRequiredImage';
import './signup.scss';
import { PageState } from '../../enums/PageStates';

const SignUp = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [loading, setShowLoader] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setShowError] = useState(false);

  const handleSignUpSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    changePageState(PageState.Loading);
    setValidated(true);
    if (form.checkValidity() === true) {
      const formValues: ISignUp = {
        username: form.elements.username.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      };

      signUpRequest(formValues)
        .then((_: HTTPResponse<string>) => {
          history.push(RouterPath.Login);
        })
        .catch((error: Error) => {
          console.error(error);
          changePageState(PageState.Error);
        });
    }
    changePageState(PageState.Data);
  };

  const changePageState = (state: string) => {
    setShowError(state == PageState.Error);
    setShowLoader(state == PageState.Loading);
  };

  if (auth.state && auth.state.isAuthenticated) {
    return <Redirect to={RouterPath.Home} />;
  }
  return (
    <Container>
      <Row>
        <Col>
          <AuthRequiredImage height='550px' width='100%' imgHeight='550px'  />
          <Card id='singup-form-card'>
            <Card.Body>
              <Card.Title>
                {!error && <span>Please provide your information</span>}
                {!!error && <span className='text-danger'>Couldn't create account...</span>}
              </Card.Title>
              <Form id='signUpForm' className='pb-2' noValidate
                    validated={validated} onSubmit={handleSignUpSubmit}>
                <Form.Group className='mt-2 mb-2' controlId='username'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type='username' required
                    placeholder='Enter username' />
                  <Form.Control.Feedback type="invalid">
                    Unique username required.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-2' controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' placeholder='Enter email'
                    required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}" />
                  <Form.Control.Feedback type="invalid">
                    Valid email required.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-2' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' required placeholder='Enter password' />
                  <Form.Control.Feedback type="invalid">
                    Password Required.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className='d-flex-center'>
                  <Button variant='primary' disabled={loading} type='submit'>
                    Sign Up
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

export { SignUp };
