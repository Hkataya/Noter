import React, { useState, useEffect } from 'react';
import { CourseActionCreatorType } from '../../actions/courses';
import { WrapperForm, FormButton, FormInput, FormLabel } from './FormStyle';
import { CourseType } from '../../reducers/entities/types';

type Props = CourseActionCreatorType & {
  // closeModal: () => void;
  // data: CourseType | any | undefined;
};

const LoginForm = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const { data } = props;

  useEffect(() => {
    if (data) {
      if (data.username) setUsername(data.username);
      if (data.password) setPassword(data.password);
    }
  }, []);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setShowLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'ali', password: '1324' })
    };
    if (evt.target.value === 'CreateAccount') {
      fetch('http://localhost:3000/v1/users', requestOptions)
        .then(user => {
          console.log(user);
          setShowLoading(false);
          return 1;
        })
        .catch(e => console.log(e));
    }
    // else if (evt.target.value === 'Login') {
    // }
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <div className="mt-5">
        <FormLabel>Username</FormLabel>
        <FormInput
          type="text"
          placeholder="Username"
          name="username"
          onChange={e => setUsername(e.target.value)}
          required
          // defaultValue={data.username || ''}
        />
      </div>
      <div className="mt-5">
        <FormLabel> Password</FormLabel>
        <FormInput
          type="password"
          name="password"
          placeholder="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
          required
          // defaultValue={data.password || ''}
        />
      </div>
      <div className="mt-5">
        {/* <FormButton type="button" value="Login" onClick={handleSubmit}>
          Login
        </FormButton> */}
        <FormButton type="button" value="CreateAccount" onClick={handleSubmit}>
          Create Account
        </FormButton>
        {showLoading ? (
          <img
            src="components/Form/Spinner-1s-200px.svg"
            height="20px"
            width="20px"
            alt="React Logo"
          />
        ) : (
          ''
        )}
      </div>
    </WrapperForm>
  );
};

export default LoginForm;
