import { useEffect, useState } from "react";
import './Auth.module.css';

import isLoggedIn from "../../../utils/isLoggedIn";

import Header from "../../layout/Header";
import Signup from '../../layout/Signup';
import Login from '../../layout/Login';
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const nav = useNavigate();
    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(() => {

        const authCheck = async () => {
            if (await isLoggedIn) {
                nav('/');
            };
        };
        // authCheck();

        if (window.location.href.includes('login')) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        };
    }, [nav])

    return (
        <>
            <Header />

            <main className="pt-28">
                {isLogin ? (
                    <Login />
                ) : (
                    <Signup />
                )}
            </main>
        </>
    );
};

export default Auth;