import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, TrendingUp, Search, User } from 'lucide-react';

import isLoggedIn from "../../utils/isLoggedIn";
import Halo from '../../assets/media/icons/halo.svg';

const Header = () => {
    const [isScreenLarge, setIsScreenLarge] = useState<boolean>(window.screen.width >= 640);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [isHome, setIsHome] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const nav = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            if (await isLoggedIn()) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            };
        };
        checkAuth();

        if (window.location.href === window.location.origin + '/') {
            setIsHome(true);
        };

        if (window.location.href.includes('login') || window.location.href.includes('signup')) {
            setIsAuth(true);
        };

        window.addEventListener('resize', () => setIsScreenLarge(window.screen.width >= 640));

        return () => window.removeEventListener('resize', () => setIsScreenLarge(window.screen.width >= 640));
    }, []);

    const handleSearch = () => {

    };


    return (
        <header className={`${isHome ? 'h-28 sm:h-20' : 'h-20'} w-full fixed inset-0 z-10 flex flex-col gap-4 justify-center p-4 border-b border-steel bg-bg`}>
            <div className="flex flex-row items-center justify-between">
                <Link
                    className="w-fit flex flex-row sm:gap-2 items-center"
                    to='/'>
                    <img
                        className="h-8 sm:h-10 md:h-12"
                        src={Halo}
                        alt="Halo Logo"
                    />
                    <h1 className="text-snow text-3xl sm:text-4xl md:text-5xl">Halo</h1>
                </Link>

                <nav className="w-max flex flex-row items-center justify-between">
                    <div className="absolute left-1/2 -translate-x-1/2 flex flex-row gap-4 sm:gap-8 items-center justify-center">
                        <Link to='/'>
                            <Home
                                className="icon"
                                size={24}
                            />
                        </Link>

                        <Link to='/trending'>
                            <TrendingUp
                                className="icon"
                                size={24}
                            />
                        </Link>

                        {isHome && isScreenLarge && (
                            <button onClick={handleSearch}>
                                <Search
                                    className="icon"
                                    size={24}
                                />
                            </button>
                        )}
                    </div>

                    {loggedIn ? (
                        <Link to='/settings'>
                            <User
                                className="icon"
                                size={24}
                            />
                        </Link>
                    ) : ( !isAuth && (
                            <button className="primary" onClick={() => nav('/login')}>Login</button>
                    ))}
                </nav>
            </div>

            {isHome && !isScreenLarge && (
                <form className="w-2/3 relative flex flex-row justify-center mx-auto">
                    <input
                        className="w-full p-1 border-r border-steel rounded-xl bg-surface text-snow outline-none focus-visible:ring-2 focus-visible:ring-steel"
                        name="query"
                        type="text"
                        placeholder="Search..."
                        aria-label="Search bar"
                    />

                    <button className="h-6 w-6 flex flex-row items-center justify-center rounded-full bg-surface hover:bg-rose" type="submit">
                        <Search
                            className="h-full p-1 rounded-full icon"
                            size={24}
                        />
                    </button>
                </form>
            )}
        </header>
    );
};

export default Header;