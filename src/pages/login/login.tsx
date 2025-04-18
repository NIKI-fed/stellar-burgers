import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUserThunk, selectorIsLoading } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';

// ВЫПОЛНЕНО
export const Login: FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const isLoading = useSelector(selectorIsLoading); 
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({email: email, password: password}));
    navigate(location.state?.from?.pathname || '/', { replace: true });
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
};
