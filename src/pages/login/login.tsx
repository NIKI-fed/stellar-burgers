import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUserThunk, selectorIsLoading } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
// import { useForm } from '../../services/hooks/useForm';


// Выполнено с использованием кастомного хука useForm
// export const Login: FC = () => {

//   const isLoading = useSelector(selectorIsLoading); 
//   const dispatch = useDispatch();

//   const { values, handleChange, setValues } = useForm({email: '', password: ''});

//   console.log(values)
  
//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//     dispatch(loginUserThunk(values));
//   };
  
//   return (
//     <>
//     { isLoading
//       ? <Preloader />
//       : <LoginUI
//           errorText=''
//           email={values.email}
//           password={values.password}
//           setEmail={setValues}
//           setPassword={setValues}
//           handleSubmit={handleSubmit}
//         />
//       }
//     </>
//   );
// };



// ВЫПОЛНЕНО
export const Login: FC = () => {

  const isLoading = useSelector(selectorIsLoading); 
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
};