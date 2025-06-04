const Signup = () => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form
            className="auth-form"
            onSubmit={handleFormSubmit}>
            <div className="label-input-container">
                <label htmlFor="username">Create Your Username:</label>

                <input
                    name="username"
                    type="text"
                    placeholder="Your username..."
                    required
                />
            </div>
        </form>
    );
};

export default Signup;