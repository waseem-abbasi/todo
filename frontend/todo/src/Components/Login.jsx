
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URL from '../api';
const Login = () => {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState()

    const [visiblePassword, setVisiblePassword] = useState()
    //show password
    const showPassword = (e) => {
        setVisiblePassword(e.target.checked)
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("login data", loginData);

        // let result = await fetch('http://localhost:2000/signup/login', {
        let result = await fetch(`${API_URL}/signup/login`, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();

        console.log("result", result); // 👈 yaha token dikhega

        if (result.success) {
           
            localStorage.setItem("token", result.token);

           
            localStorage.setItem("user", JSON.stringify(result.userData));

            toast.success("Successfully login");
            navigate("/");
        } else {
            toast.error("Please check email and password");
        }
    };
    console.log(loginData)
    return (
        <>
            <Container className='d-flex mt-5  justify-content-center '>
                <Form className='border rounded p-3' onSubmit={handleLogin}>
                    <h1 className=' text-center'>Login</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event) => setLoginData({ ...loginData, email: event.target.value })} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={visiblePassword ? "text" : "password"} placeholder="Password"
                            onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" onChange={showPassword} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <div>
                        <Link to="/signup" className="fw-semibold text-decoration-none"> Signup</Link>
                    </div>
                </Form>

            </Container>

        </>
    )
}
export default Login