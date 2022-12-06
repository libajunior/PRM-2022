import { ICredential } from '@typesCustom';
import { MessageBar, MessageBarType, PrimaryButton, Spinner, SpinnerSize, Stack, TextField } from "@fluentui/react";
import { FormEvent, useState } from "react";
import { useAuth } from '../../hook/useAuth';

export function LoginPage() {

    const { user, signIn } = useAuth();

    //States Messages
    const [messageError, setMessageError] = useState('');

    //State - Loading
    const [loading, setLoading] = useState(false);

    const [credential, setCredential] = useState<ICredential>({
        email: '',
        password: ''
    });

    async function handleSignIn(event: FormEvent) {
        event.preventDefault();

        setLoading(true);

        try {
            await signIn(credential);
        } catch (e) {
            const error = e as Error;
            setMessageError(String(error.message));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div id="login-page">
            <Stack horizontal={false}>
                {messageError && (
                    <MessageBar
                        delayedRender={false}
                        messageBarType={MessageBarType.error}
                        onDismiss={() => setMessageError('')}>
                        {messageError}
                    </MessageBar>
                )}
                <form onSubmit={handleSignIn}>
                    <TextField label="E-mail"
                        required
                        value={credential.email}
                        onChange={event => setCredential({ ...credential, email: (event.target as HTMLInputElement).value })} />

                    <TextField label="Senha"
                        required
                        type="password"
                        value={credential.password}
                        onChange={event => setCredential({ ...credential, password: (event.target as HTMLInputElement).value })} />

                    <PrimaryButton type="submit"
                        disabled={loading}>
                        {!loading ? (
                            <span>Entrar</span>
                        ) : (
                            <Spinner size={SpinnerSize.medium} />
                        )}
                    </PrimaryButton>

                </form>

            </Stack>
        </div>
    )
}