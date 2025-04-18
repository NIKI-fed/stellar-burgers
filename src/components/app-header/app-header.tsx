import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectorUser } from '../../services/slices/userSlice';



export const AppHeader: FC = () => {

    const user = useSelector(selectorUser);
    // console.log(user, 'dsjhkfgk')
    return <AppHeaderUI userName={user?.name} />;
}

