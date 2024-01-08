import { ProfileContext, ProfileContextState } from '../profiling/ProfileContext';
import { useState } from 'react';
import { LayoutLogin } from './LayoutLogin';
import { LayoutAuthenticated } from './LayoutAuthenticated';

type SetAuthenticationInfoFunction = (info: { 
  token: string, 
  refreshToken: string, 
  tokenExpiration: string, 
  refreshTokenExpiration: string
}) => void;

const Layout = () => {
  const [profile, setProfile] = useState<ProfileContextState['contextValue']>();
  const [authenticationInfo, setAuthenticationInfo] = useState({
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refresh-token'),
    tokenExpiration: localStorage.getItem('token-expiration'),
    refreshTokenExpiration: localStorage.getItem('refresh-token-expiration')
  });

  return (
    <ProfileContext.Provider value={{
      contextValue: {
        uuid: profile?.uuid ?? '',
        username: profile?.username ?? '',
        number: profile?.number ?? '',
        bio: profile?.bio ?? '',
        contacts: profile?.contacts ?? []
      },
      setContextValue: setProfile as ProfileContextState['setContextValue']
    }}>
      {!authenticationInfo.token 
        ? <LayoutLogin setInfoMethod={setAuthenticationInfo}/>
        : <LayoutAuthenticated />}

    </ProfileContext.Provider>
  )
}

export { Layout, type SetAuthenticationInfoFunction }