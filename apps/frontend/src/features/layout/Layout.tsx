import { createBrowserRouter } from 'react-router-dom';
import { Contacts } from '../contacts/Contacts';
import { Messages } from '../messages/Messages';
import { ProfileContext, ProfileContextState } from '../profiling/ProfileContext';
import { useEffect, useState } from 'react';
import fetchGraphQL from '../graphql/relay';

// TODO: Change to dynamic mapping based on contacts
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

const style = {
    marginBlock: '5px',
    width: '83.3vw',
    backgroundImage: "url('./whatsapp-bg.jpg')",
    backgroundSize: '20%',
    height: '96vh',
    display: 'flex',
    padding: '0'
}

const Layout = () => {
  const [profile, setProfile] = useState<ProfileContextState['contextValue']>();

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const uuid = localStorage.getItem('profile-uuid');

    fetchGraphQL(`
      query Query {
        getProfileWithContacts(uuid: $uuid, token: $token)
      }
    `, { uuid, token })
    .then((response: Response) => response.json())
    .then((data: ProfileContextState['contextValue']) => setProfile(data));
  }, []);

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
      <div style={style}>
          <Contacts router={router} />
          <Messages router={router} />
      </div>  
    </ProfileContext.Provider>
  )
}

export { Layout }