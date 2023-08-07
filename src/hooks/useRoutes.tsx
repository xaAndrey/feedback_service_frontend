import { Routes, Route, Navigate } from "react-router-dom"
import { routes } from "../helpers/routes"
import { LoginPage } from "../modules/login-page/LoginPage"
import { Registrations } from "../modules/registartions-page/Registrations"
import { NotFoundPage } from "../modules/no-found-page/NotFoundPage"

export const useRoutes = () => {

    return (
        <Routes>
            <Route path={routes.home} element={<Registrations />} />
            <Route path="/" element={<Navigate to={routes.login} />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}