import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentCustomer } from '../../api/customers';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Overlay from '../../components/Modal/Overlay';
import { useStoreSelector } from '../../hooks/userRedux';
import { ROUTE_PATH } from '../../utils/globalVariables';

export default function UserProfile() {
  const navigate = useNavigate();
  const { isUserAuthorized } = useStoreSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isUserAuthorized) {
      setIsLoading(false);
      navigate(ROUTE_PATH.main);
      return;
    }

    async function getUser() {
      const user = await getCurrentCustomer();
      setIsLoading(false);
      return user;
    }

    getUser();
  }, [isUserAuthorized, navigate]);

  if (isLoading)
    return (
      <Overlay>
        <LoadingSpinner />
      </Overlay>
    );

  return <div>UserProfile page</div>;
}
