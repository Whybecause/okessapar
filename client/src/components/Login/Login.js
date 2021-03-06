import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';
import AuthService from '../../services/auth.service';
import redirectTo from '../../services/redirect';

function Login() {
    const { register, handleSubmit } = useForm();
    const [ responseData, setResponseData ] = useState("");
    const [ redirect, setRedirect ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    if (redirect) return redirectTo;

    const onSubmit = (data) => {
        setLoading(true);
        AuthService.login(data)
        .then( (response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            setLoading(false);
            setRedirect(true);
            window.location.reload();
        })
        .catch( (error) => {
            setLoading(false);
            setResponseData(error.response.data.message)
        })
    }
    return (
        <Container className="h-page p-top-14vh">
            <div className=" dfjccaicfdrjcc form-bg form-border p-top-3 p-bot-3 m-top-1 m-bot-5">
                <form onSubmit={handleSubmit(onSubmit)} className="w-80">
                    <div>Login</div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            ref={register({ required: true})}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            ref={register({ required: true})}
                            
                        />
                    </div>
                    <button
                    type="submit"
                    className="contact-button w-100 d-flex align-items-center justify-content-center"
                    disabled={loading}
                    >
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Envoyer</span>
                    </button>
                    <div>{responseData}</div>
                </form>
            </div>
        </Container>
    )
}

export default Login;