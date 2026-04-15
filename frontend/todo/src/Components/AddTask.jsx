import { useEffect, useState } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'
import API_URL from '../api.js';
const AddTask = () => {
    const [taskData, setTaskData] = useState({
        title: "",
        description: ""
    });
    const navigate = useNavigate()
    const location = useLocation()
    const editData = location.state;

    useEffect(() => {
        console.log("edit data", editData)
        if (editData) {
            setTaskData(editData);
            console.log("edit data", editData)
            console.log("edit data", taskData)
        }
    }, [editData]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        // let result = await fetch(('http://localhost:2000/users'), {
        let result = await fetch((`${API_URL}/users`), {
            method: 'Post',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/Json'
            }
        })
        result = await result.json()
        if (result) {
            console.log("task data is", taskData)
            navigate("/")
        }
        else {
            console.log("error print")
        }
    }
    //update value
    const hanldeUpdate = async (e) => {
        e.preventDefault();

        console.log("edit data", editData)
        console.log("task data", taskData.id)
        // let res = await fetch(`http://localhost:2000/users/${taskData.id}`, {
        let res = await fetch(`${API_URL}/users/${taskData.id}`, {
            method: 'PUT',
            body: JSON.stringify(taskData),   
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await res.json();
        if (data) {
            navigate("/")
        }
    }
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center mt-5">
                <Card className="p-4 border bg-transparent" style={{ width: "400px" }}>
                    <h1 className='text-center'>Add New Task</h1>
                    <Form onSubmit={editData ? hanldeUpdate : handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the title"
                                value={taskData.title}
                                onChange={(e) =>
                                    setTaskData({ ...taskData, title: e.target.value })
                                }
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={taskData.description}
                                onChange={(e) =>
                                    setTaskData({ ...taskData, description: e.target.value })
                                }
                            />
                        </Form.Group>



                        <Button variant="primary" type="submit">
                            {editData ? "Update" : " Submit"}

                        </Button>
                    </Form>
                </Card>
            </Container>
        </>
    )
}
export default AddTask