import { useState } from "react";
import { GraphQLResponseWithData } from "relay-runtime";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { fetchFunction } from "../fetching/fetchFunction";
import { SetAuthenticationInfoFunction } from "./Layout";
import { Fieldset } from 'primereact/fieldset';

const LayoutLoginQuery = `
    {
        authenticate(number: $number, password: $password) {
            token
            refreshToken
            tokenExpiration
            refreshTokenExpiration
        }
    }
`;

const LayoutLogin = (props: { setInfoMethod: SetAuthenticationInfoFunction }) => {
    const [number, setNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <Fieldset className="layout-login-fieldset">
            <InputText placeholder={'Number'} value={number} onChange={(e) => setNumber(e.target.value)} />   
            <InputText placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button label="Login" onClick={async () => {
                if (!!number && !!password) {
                    const observable = fetchFunction({
                        text: LayoutLoginQuery
                    }, { number, password });

                    observable.toPromise().then((response: GraphQLResponseWithData) => {
                        if (response.errors) {
                            return;
                        }

                        const { 
                            token, 
                            refreshToken, 
                            tokenExpiration, 
                            refreshTokenExpiration 
                        } = response.data.authenticate;

                        localStorage.setItem('token', token);
                        localStorage.setItem('refresh-token', refreshToken);
                        localStorage.setItem('token-expiration', tokenExpiration);
                        localStorage.setItem('refresh-token-expiration', refreshTokenExpiration);

                        props.setInfoMethod({ 
                            token, 
                            refreshToken, 
                            tokenExpiration, 
                            refreshTokenExpiration 
                        });
                    })
                }
            }} />
        </Fieldset>
    )
}

export { LayoutLogin }