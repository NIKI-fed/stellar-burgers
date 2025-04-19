import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUserThunk, selectorIsLoading } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { useForm } from '../../services/hooks/useForm';

// ВЫПОЛНЕНО
export const Login: FC = () => {

  const isLoading = useSelector(selectorIsLoading); 
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({email: email, password: password}));
  };

  return (
    <>
    { isLoading
      ? <Preloader />
      : <LoginUI
          errorText=''
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      }
    </>
  );

  // return (
  //   <>
  //   { isLoading
  //     ? <Preloader />
  //     : <LoginUI
  //         errorText=''
  //         email={values.email}
  //         setEmail={handleChange}
  //         password={values.password}
  //         setPassword={handleChange}
  //         handleSubmit={handleSubmit}
  //       />
  //     }
  //   </>
  // );
};
