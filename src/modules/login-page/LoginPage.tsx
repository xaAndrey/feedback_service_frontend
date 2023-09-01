import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { LoginPageContainer } from "../../containers/LoginPageContainer";
import { auth } from "../../api/auth/request";
import { cookies } from "../../hooks/useAuth"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { ACCESS_TOKEN_COOKIE_KEY, ACCESS_TOKEN_EXPIRATION_TIME_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY, REFRESH_TOKEN_EXPIRATION_TIME_COOKIE_KEY } from "../../utils/feedback-service.constants";
import { Container, IconButton, InputAdornment, Box } from "@mui/material";
import { OvalTextField } from "../../components/styled/OvalTextField";
import { WarningParagraph } from "../../components/styled/WarningParagraph";
import { OvalPrimaryButton } from "../../components/styled/OvalPrimaryButton";
import { routes } from "../../helpers/routes";

const LoginForm = (): JSX.Element => {
    const [form, setForm] = useState({ login: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
        setAuthError(false);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (form.login.length === 0 || form.password.length === 0) {
            setAuthError(true);
        }
        const response = await auth(form.login, form.password);
        if (response) {
            cookies.set(ACCESS_TOKEN_COOKIE_KEY, response.accessToken);
            cookies.set(ACCESS_TOKEN_EXPIRATION_TIME_COOKIE_KEY, (new Date()).getTime() + response.accessTokenExpirationTime - 1000);
            cookies.set(REFRESH_TOKEN_COOKIE_KEY, response.refreshToken);
            cookies.set(REFRESH_TOKEN_EXPIRATION_TIME_COOKIE_KEY, (new Date()).getTime() + response.refreshTokenExpirationTime - 1000);
            navigate(routes.registrations);
        } else {
            setAuthError(true);
        }
        console.log('Login: ', form.login, 'Password: ', form.password, 'Response: ', response);

    }

    return <Container maxWidth={'xs'}>
        <form onSubmit={handleSubmit}>
            <OvalTextField
                variant="filled"
                fullWidth
                onChange={handleChange}
                label="Логин"
                name={"login"}
                value={form.login}
                margin={'normal'}
            />

            <OvalTextField
                variant="filled"
                fullWidth
                onChange={handleChange}
                name={"password"}
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                margin={'normal'}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                style={{ paddingRight: '1rem' }}
                                onClick={() => setShowPassword(prevState => !prevState)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>,
                }}
            />
            {authError && <WarningParagraph variant={'subtitle2'}>Неверный логин или пароль</WarningParagraph>}

            <Box mt={1}>
                <OvalPrimaryButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color={'primary'}
                    style={{borderRadius: 12}}
                    >
                        ВОЙТИ
                    </OvalPrimaryButton>       
            </Box>
        </form>
    </Container>;
}

export function LoginPage() {
    return <LoginPageContainer children={LoginForm()} />
}