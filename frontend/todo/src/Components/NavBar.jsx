import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
const NavBar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");


        navigate("/");
    };
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">ToDo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className='justify-content-end'>
                        <Nav className="">
                            <Nav.Link as={Link} to="/list">List</Nav.Link>
                            <Nav.Link as={Link} to="/add">Add Task</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavBar