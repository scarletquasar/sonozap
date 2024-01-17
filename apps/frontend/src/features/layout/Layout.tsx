import { ProfileContext, ProfileContextState } from '../profiling/ProfileContext';
import { useState } from 'react';
import { LayoutLogin } from './LayoutLogin';
import { LayoutAuthenticated } from './LayoutAuthenticated';
import { ToastContainer } from 'react-toastify';

type SetAuthenticationInfoFunction = (info: { 
  token: string, 
  tokenExpiration: string
}) => void;

const Layout = () => {
  const [profile, setProfile] = useState<ProfileContextState['contextValue']>();
  const [authenticationInfo, setAuthenticationInfo] = useState({
    token: localStorage.getItem('token'),
    tokenExpiration: localStorage.getItem('token-expiration')
  });

  return (
    <ProfileContext.Provider value={{
      contextValue: {
        uuid: profile?.uuid ?? '',
        username: profile?.username ?? '',
        number: profile?.number ?? '',
        bio: profile?.bio ?? '',
        // TODO: CHANGE TO FETCH CONTACTS
        contacts: [{
          uuid: '1',
          username: 'test',
          bio: 'test',
          number: 'test',
          photo: undefined
      }]
      },
      setContextValue: setProfile as ProfileContextState['setContextValue']
    }}>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
      />
      {!authenticationInfo.token 
        ? <LayoutLogin setInfoMethod={setAuthenticationInfo}/>
        : <LayoutAuthenticated />}

    </ProfileContext.Provider>
  )
}

export { Layout, type SetAuthenticationInfoFunction }