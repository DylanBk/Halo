import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const nav = useNavigate();
    const pwInput = useRef<HTMLInputElement>(null);
    const errorMsg = useRef<HTMLParagraphElement>(null);
    const [pwVisible, setPwVisible] = useState<boolean>(false);

    const handleTogglePw = () => {
        if (pwVisible && pwInput.current) {
            pwInput.current.type = 'password';

            setPwVisible(false);
        } else if (pwInput.current) {
            pwInput.current.type = 'text';

            setPwVisible(true);
        };
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formDataObj = Object.fromEntries(formData);

        const req = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDataObj)
        });
        const res = await req.json();

        if (res.ok) {
            nav('/');
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
            <h2>Welcome Back!</h2>
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
                <label htmlFor="password">Enter your password:</label>

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
                            onClick={handleTogglePw}
                            className="icon"
                            size={24}
                        />
                    ) : (
                        <Eye
                            onClick={handleTogglePw}
                            className="icon"
                            size={24}
                        />
                    )}
                </div>
            </div>

            <p ref={errorMsg} className="text-sm !text-rose"></p>

            <button className="primary" type="submit">Login</button>
        
            <p>Already have an account? <Link to='/signup'>Sign Up</Link></p>
        </form>
    );
};

export default Login;