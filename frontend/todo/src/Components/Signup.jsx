import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import API_URL from '../api';

const Signup = () => {
    const navigate = useNavigate()
    const [visiblePassword, setVisiblePassword] = useState()
    const [userData, setUserData] = useState()

    const showPassword = (e) => {
        console.log("events", e.target.checked)
        setVisiblePassword(e.target.checked)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("userdata--->",userData)
        // let result = await fetch(('http://localhost:2000/signup'), {
        let result = await fetch((`${API_URL}/signup`), {
            method: 'Post',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'Application/Json'
            }
        })
        result = await result.json()
        if (result) {
           toast.success("user create successfully")
            navigate("/login")
        }
        else {
            console.log("error print")
        }
    }
    console.log("userdata--->", userData)
    return (
        <>
            <Container className='d-flex mt-5  justify-content-center '>
                <Form className='border rounded p-3' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={(event) => setUserData({ ...userData, name: event.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event) => setUserData({ ...userData, email: event.target.value })} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={visiblePassword ? "text" : "password"} placeholder="Password"
                            onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" onChange={showPassword} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <div>
                        <Link to="/login">Login</Link>
                    </div>
                </Form>
            </Container>

        </>
    )
}

export default Signup