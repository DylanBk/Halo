import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css';
import { SquarePen } from "lucide-react";

import Header from "../../layout/Header";
import User from "../../../types/user";

import isLoggedIn from "../../../utils/isLoggedIn";
import capitalise from "../../../utils/capitalise";

import userImg from '../../../assets/media/images/user.svg';
import userBanner from '../../../assets/media/images/banner.svg';

const Settings = () => {
    const [userData, setUserData] = useState<User>();
    const nav = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            if (!await isLoggedIn()) {
                nav('/login');
            };
        };
        checkAuth();

        const handleDataDecor = (userData: User) => {
            switch (Number(userData.role)) {
                case 1:
                    userData.roleBadge = 'owner';
                    break;
                case 2:
                    userData.roleBadge = 'admin';
                    break;
                case 3:
                    userData.roleBadge = 'moderator';
                    break;
                case 4:
                    userData.roleBadge = 'user';
                    break;
                case 5:
                    userData.roleBadge = 'suspended';
                    break;
                case 6:
                    userData.roleBadge = 'banned';
                    break;
                default:
                    userData.roleBadge = 'unknown';
                    break;
            };

            console.log(userData)
        };

        const getUserData = async () => {
            const req = await fetch('/api/user/me', {
                method: 'GET'
            });
            const res = await req.json();

            if (res.ok) {
                setUserData(res.data);
                handleDataDecor(res.data);
            } else {
                console.error("Failed to fetch user data:", res.message);
            };
        };

        getUserData();
    }, [nav]);

    const handleUpdatePfp = () => {
        console.log(userData)
    };

    const handleUpdateAttribute = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <Header />

            <main className="mt-28">
                <div id="settings-container">
                    <section id="profile" className="settings">
                        <h2>Profile Settings</h2>

                        <div>
                            <div className="flex flex-col !gap-0 items-center">
                                <div className="relative">
                                    <img
                                        id="banner"
                                        src={userData?.banner || userBanner}
                                        alt="User banner"
                                    />

                                    <button
                                        className="primary"
                                        onClick={() => null}>
                                        <SquarePen
                                            className="icon"
                                            size={24}
                                        />
                                    </button>

                                    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
                                        <img
                                            id="avatar"
                                            src={userData?.pfp || userImg}
                                            alt="User Avatar"
                                        />

                                        <button className="primary" onClick={handleUpdatePfp}>
                                            <SquarePen
                                                className="icon"
                                                size={24}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="details">
                                <p
                                    id={`role-${userData?.roleBadge}`}
                                    className="role">
                                    {userData?.roleBadge && capitalise(userData.roleBadge)}
                                </p>

                                <form onSubmit={handleUpdateAttribute}>
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder={userData?.username}
                                        aria-label="Enter new username"
                                        tabIndex={-1}
                                    />

                                    <button
                                        type="submit"
                                        aria-label="Update username">
                                        <SquarePen
                                            className="icon"
                                            size={24}
                                        />
                                    </button>
                                </form>

                                <textarea
                                    name="about"
                                    placeholder="Something cool about you..."
                                    maxLength={200}
                                    aria-label="Tell the world about yourself"
                                />
                            </div>
                        </div>
                    </section>
                    
                    <hr />

                    <section id="account" className="settings">
                        <h2>Account Settings</h2>

                        
                        <div>
                            <form onSubmit={handleUpdateAttribute}>
                                <label htmlFor="email">Enter new email:</label>

                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder={userData?.email}
                                    />

                                    <button
                                        type="submit"
                                        aria-label="Update email">
                                        <SquarePen
                                            className="icon"
                                            size={24}
                                        />
                                    </button>
                                </div>
                            </form>

                            <form onSubmit={handleUpdateAttribute}>
                                <label htmlFor="password">Enter new password:</label>

                                <div>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="********"
                                    />

                                    <button
                                        type="submit"
                                        aria-label="Update password">
                                        <SquarePen
                                            className="icon"
                                            size={24}
                                        />
                                    </button>
                                </div>
                            </form>

                            <button
                                className="mt-8 primary"
                                onClick={() => null}>
                                Enable 2FA
                            </button>

                            <button
                                className="mt-8 danger"
                                onClick={() => null}>
                                Logout
                            </button>

                            <button
                                className="danger"
                                onClick={() => null}>
                                Delete Account
                            </button>
                        </div>
                    </section>

                    <hr />

                    <section id="preferences" className="settings">
                        <h2>Preferences</h2>

                        <div>
                            <form onSubmit={() => null}>
                                <div>
                                    <label htmlFor="theme">Choose theme:</label>

                                    <select name="theme">
                                        <option value="system">System</option>
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                            </form>

                            <form onSubmit={() => null}>
                                <div>
                                    <label htmlFor="language">Choose language:</label>
                                    
                                    <select name="language">
                                        <option value="en">English</option>
                                    </select>
                                </div>
                            </form>

                            <form onSubmit={() => null}>
                                <fieldset>
                                    <legend>Notifications</legend>

                                    <div>
                                        <input
                                            type="radio"
                                            name="notifications"
                                            id="notifications-all"
                                            value="all"
                                            defaultChecked
                                        />
                                        <label htmlFor="notifications-all">All Notifications</label>
                                    </div>

                                    <div>
                                        <input
                                            type="radio"
                                            name="notifications"
                                            id="notifications-mentions"
                                            value="mentions"
                                        />
                                        <label htmlFor="notifications-mentions">Only Mentions</label>
                                    </div>

                                    <div>
                                        <input
                                            type="radio"
                                            name="notifications"
                                            id="notifications-none"
                                            value="none"
                                        />
                                        <label htmlFor="notifications-none">None</label>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </section>

                    <hr />

                    <section id="privacy" className="settings">
                        <h2>Privacy Settings</h2>

                        <div>
                            <form onSubmit={() => null}>
                                <p>Profile Visibility</p>

                                <label htmlFor="privacy-toggle" className="mt-2 text-xs">Private:</label>
                                <div className="toggle-container">
                                    <input
                                        name="privacy-toggle"
                                        type="checkbox"
                                    />
                                    
                                    <span className="slider"></span>
                                </div>
                            </form>

                            <button
                                className="primary"
                                onClick={() => null}>
                                Export Data
                            </button>

                            <div id="connections">
                                <h3>Connected Accounts</h3>

                                <ul>
                                    <li>
                                        <span>GitHub</span>
                                        <button className="secondary" onClick={() => null}>
                                            Connect
                                        </button>
                                    </li>
                                    <li>
                                        <span>Twitter</span>
                                        <button className="secondary" onClick={() => null}>
                                            Connect
                                        </button>
                                    </li>
                                    <li>
                                        <span>Discord</span>
                                        <button className="secondary" onClick={() => null}>
                                            Connect
                                        </button>
                                    </li>
                                    <li>
                                        <span>LinkedIn</span>
                                        <button className="secondary" onClick={() => null}>
                                            Connect
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <hr />

                    <section id="security" className="settings">
                        <h2>Security Settings</h2>

                        <div>
                            <section>
                                <h3>Recent Logins</h3>

                                <div>
                                    <p className="text-smoke">No recent logins found.</p>
                                </div>
                            </section>

                            <section>
                                <h3>Manage Sessions</h3>

                                <div>
                                    <p className="text-smoke">No active sessions found.</p>
                                </div>
                            </section>

                            <section>
                                <h3>Security Alerts</h3>

                                <div>
                                    <p className="text-smoke">No alerts found.</p>
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Settings;