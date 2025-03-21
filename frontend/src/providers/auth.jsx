// File: C:\Users\hanos\nextall\frontend\src\providers\auth.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../redux';
import { setLogout } from '../redux/slices/user';
import { setWishlist } from '../redux/slices/wishlist';
import { deleteCookies } from 'src/hooks/cookies';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(({ user }) => user);

  useEffect(() => {
    if (!isAuthenticated) {
      deleteCookies('token');
      dispatch(setLogout());
      dispatch(setWishlist());
    }
  }, [isAuthenticated, dispatch]);

  return children;
}
