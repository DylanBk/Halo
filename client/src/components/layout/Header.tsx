import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, TrendingUp, Search, User } from 'lucide-react';

import Halo from '../../assets/media/icons/halo.svg';
import { useEffect } from "react";

const Header = () => {
    const [isScreenLarge, setIsScreenLarge] = useState<boolean>(window.screen.width >= 640);

    useEffect(() => {
        window.addEventListener('resize', () => setIsScreenLarge(window.screen.width >= 640));

        return () => window.removeEventListener('resize', () => setIsScreenLarge(window.screen.width >= 640));
    }, []);

    const handleSearch = () => {

    };

    return (
        <header className="h-28 sm:h-20 w-full fixed inset-0 z-10 flex flex-col gap-4 justify-center p-4 border-b border-steel bg-bg">
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

                <nav className="w-max flex flex-row justify-between">
                    <div className="absolute left-1/2 -translate-x-1/2 flex flex-row gap-4 sm:gap-8 items-center justify-center">
                        <Link to='/'>
                            <Home
                                className="icon stroke-snow hover:stroke-smoke"
                                size={24}
                            />
                        </Link>

                        <Link to='/trending'>
                            <TrendingUp
                                className="icon stroke-snow hover:stroke-smoke"
                                size={24}
                            />
                        </Link>

                        {isScreenLarge && (
                            <button onClick={handleSearch}>
                                <Search
                                    className="icon stroke-snow hover:stroke-smoke"
                                    size={24}
                                />
                            </button>
                        )}
                    </div>

                    <Link to='/settings'>
                        <User
                            className="icon stroke-snow hover:stroke-smoke"
                            size={24}
                        />
                    </Link>
                </nav>
            </div>

            {!isScreenLarge && (
                <form className="w-2/3 relative flex flex-row justify-center mx-auto">
                    <input
                        className="w-full p-1 border-r border-steel rounded-xl bg-surface text-snow outline-none focus:ring-2 focus:ring-steel"
                        name="query"
                        type="text"
                        placeholder="Search..."
                        aria-label="Search bar"
                    />

                    <button className="h-6 w-6 absolute right-2 top-1/2 -translate-y-1/2 flex flex-row items-center justify-center rounded-full bg-surface hover:bg-rose" type="submit">
                        <Search
                            className="h-full p-1 rounded-full stroke-snow hover:stroke-smoke icon"
                            size={24}
                        />
                    </button>
                </form>
            )}
        </header>
    );
};

export default Header;