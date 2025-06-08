const isLoggedIn = async () => {
    const req = await fetch('/api/user/me', {
        method: 'GET'
    });
    const res = await req.json();

    return res.ok;
};

export default isLoggedIn;