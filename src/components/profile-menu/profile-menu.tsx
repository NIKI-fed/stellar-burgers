import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUserThunk } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  // console.log({ pathname })
  const dispatch = useDispatch();

  // TODO (ВЫПОЛНЕНО)
  const handleLogout = () => {
    dispatch(logoutUserThunk());
    // navigate(location.state?.from?.pathname || '/login', { replace: true });

  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
