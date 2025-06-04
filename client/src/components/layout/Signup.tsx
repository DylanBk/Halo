import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
    const nav = useNavigate();
    const pwInput = useRef<HTMLInputElement>(null);
    const errorMsg = useRef<HTMLParagraphElement>(null);
    const [pwVisible, setPwVisible] = useState<boolean>(false);

    const handleTogglePw = () => {
        if (pwVisible && pwInput.current) {
            pwInput.current.type = 'password';

            setPwVisible(false)
        } else if (pwInput.current) {
            pwInput.current.type = 'text';

            setPwVisible(true);
        };
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formDataObj = Object.fromEntries(formData);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

        if (!passwordRegex.test(formDataObj.password as string)) {
            if (errorMsg.current) {
                errorMsg.current.textContent = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
            };

            return;
        };


        const req = await fetch('/api/user/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDataObj)
        });
        const res = await req.json();

        if (res.ok) {
            nav('/login');
        } else {
            if (errorMsg.current) {
                errorMsg.current.textContent = res.error;
            };
        };
    };

    return (
        <form
            className="auth-form"
            onSubmit={handleFormSubmit}>
            <h2>Create an Account</h2>

            <div>
                <label htmlFor="username">Create Your Username:</label>

                <input
                    name="username"
                    type="text"
                    placeholder="Your username..."
                    required
                />
            </div>

            <div>
                <label htmlFor="email">Enter your email address:</label>

                <input
                    name="email"
                    type="email"
                    placeholder="Your email..."
                    required
                />
            </div>

            <div>
                <label htmlFor="password">Create a password:</label>

                <div className="!w-full relative flex flex-row">
                    <input
                        ref={pwInput}
                        name="password"
                        type="password"
                        placeholder="Your password..."
                        minLength={8}
                        required
                    />

                    {pwVisible ? (
                        <EyeOff
                            className="absolute right-2 top-1/2 -translate-y-1/2 stroke-smoke hover:stroke-snow icon"
                            size={24}
                            onClick={handleTogglePw}
                            aria-label="Hide Password"
                        />
                    ) : (
                        <Eye
                            className="absolute right-2 top-1/2 -translate-y-1/2 stroke-smoke hover:stroke-snow icon"
                            size={24}
                            onClick={handleTogglePw}
                            aria-label="Show Password"
                        />
                    )}
                </div>
            </div>

            <p ref={errorMsg} className="text-sm !text-rose"></p>

            <button className="primary" type="submit">Sign Up</button>
        
            <p>Already have an account? <Link to='/login'>Login</Link></p>
        </form>
    );
};

export default Signup;