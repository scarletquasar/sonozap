import { useContext, useState } from "react";
import { GraphQLResponseWithData } from "relay-runtime";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { fetchFunction } from "../fetching/fetchFunction";
import { SetAuthenticationInfoFunction } from "./Layout";
import { Fieldset } from 'primereact/fieldset';
import { toast } from 'react-toastify';
import { decodeJwt } from "../fetching/jwt";
import { ProfileContext } from "../profiling/ProfileContext";

const LayoutLoginQuery = `
    query LayoutLoginQuery($number: String!, $password: String!) {
        authenticate(number: $number, password: $password) {
            token
            tokenExpiration
        }
    }
`;

const LayoutLogin = (props: { setInfoMethod: SetAuthenticationInfoFunction }) => {
    const [number, setNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { contextValue, setContextValue } = useContext(ProfileContext);

    return (
        <Fieldset className="layout-login-fieldset">
            <InputText placeholder={'Number'} value={number} onChange={(e) => setNumber(e.target.value)} />   
            <InputText placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button label="Login" onClick={async () => {
                if (!!number && !!password) {
                    const observable = fetchFunction({
                        text: LayoutLoginQuery
                    }, { 
                        number, 
                        password 
                    });

                    toast.info('Connecting to server...', {
                        position: "top-right",
                        autoClose: 20000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });

                    observable.toPromise().then((response: GraphQLResponseWithData) => {
                        if (response.errors) {
                            toast.dismiss();

                            const errorOptions = {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            } as const;

                            response.errors.map(error => toast.error(error.message, errorOptions));
                            return;
                        }

                        const { 
                            token, 
                            tokenExpiration,
                        } = response.data.authenticate;

                        localStorage.setItem('token', token);
                        localStorage.setItem('token-expiration', tokenExpiration);
                        
                        const tokenPayload = decodeJwt(token);
                        localStorage.setItem('uuid', tokenPayload.uuid);
                        setContextValue({ ...contextValue, uuid: tokenPayload.uuid });

                        props.setInfoMethod({ 
                            token, 
                            tokenExpiration
                        });

                        toast.dismiss();
                    })
                    .catch(error => {
                        toast.dismiss();
                        toast.error(error.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    })
                }
            }} />
        </Fieldset>
    )
}

export { LayoutLogin }