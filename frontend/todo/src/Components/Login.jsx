import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../api";

const Login = () => {
  const navigate = useNavigate();

 
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);

  const showPassword = (e) => {
    setVisiblePassword(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

   
    let newErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email is required";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(`${API_URL}/signup/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (result.token) {
          localStorage.setItem("token", result.token);
        }
        if (result.userData) {
          localStorage.setItem("user", JSON.stringify(result.userData));
        }

        toast.success("Successfully login");
        navigate("/list");
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <Container className="d-flex mt-5 justify-content-center">
      <Form className="border rounded p-3" onSubmit={handleLogin}>
        <h1 className="text-center">Login</h1>

        {/* EMAIL */}
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={loginData.email}
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
              setErrors({ ...errors, email: "" }); // clear error
            }}
            isInvalid={!!errors.email} // bootstrap red border
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={visiblePassword ? "text" : "password"}
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
              setErrors({ ...errors, password: "" });
            }}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Show Password"
            onChange={showPassword}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>

        <div>
          <Link to="/signup" className="fw-semibold text-decoration-none">
            Signup
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;