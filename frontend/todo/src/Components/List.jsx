import { useEffect, useState } from "react"
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";
import { MdDelete } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";

const List = () => {
    const [taskData, setTaskData] = useState([])
    const [load, setLoad] = useState("")
    const navigate = useNavigate()

    const [selectedTask, setSelectedTask] = useState(" ")

    useEffect(() => {
        getListData();
    }, [])

    //fetch the data
    const getListData = async () => {
        try {
            // let data = await fetch('http://localhost:2000/users')
            let data = await fetch(`${API_URL}/users`)

            data = await data.json()


            if (data) {
                setTaskData(data)
            }
            else {
                setLoad("Loading.......")
            }
        } catch (err) {
            console.log(err)
        }

    }

    //delete the data
    const deleteTask = async (id) => {
        // let res = await fetch(`http://localhost:2000/users/${id}`, {
        let res = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE'
        });

        let data = await res.json();

        if (data) {
            console.log("deleted item", data);
            getListData(); // refresh list
        }
    }
    //update the data
    const updateTask = async (item) => {
        console.log("items", item)
        navigate("/add", { state: item })

    }
    //selected check box
    const handleSelect = (e) => {
        console.log("event", e.target.checked)
        if (e.target.checked) {
            let items = taskData.map((item) => item.id)
            setSelectedTask(items)
        }
        else {
            setSelectedTask([])
        }
    }
    //select single items
    const selectSingleItem = (id) => {
        console.log("id", id)
        if (selectedTask.includes(id)) {
            let items = selectedTask.filter((item) => item != id)
            setSelectedTask(items)
        } else {
            console.log("id", id)
            console.log("selected task", selectedTask)
            // setSelectedTask(id,...selectedTask)
            setSelectedTask([...selectedTask, id])
        }
    }
    //delete multiple
    const deleteMultiple = async () => {
        console.log("selected task", selectedTask);
         const cleanIds = selectedTask.filter(id => id && id.trim() !== "");
        // let res = await fetch(`http://localhost:2000/users/delete-multiple`, {
        let res = await fetch(`${API_URL}/users/delete-multiple`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: cleanIds   
            })
        });

        let data = await res.json();

        if (data.success) {
            console.log("deleted items", data);
            getListData(); // refresh list
        }
    };
    console.log("select items", selectedTask)
    return (
        <>
            <Container>
                <h1 className="text-center">List Data</h1>
                <Button variant="danger mb-2" onClick={deleteMultiple}> Delete </Button>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>< input type="checkbox" onChange={handleSelect} /></th>
                            <th>No.</th>
                            <th>title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taskData.map((item, index) => (
                                <tr key={item.id}>
                                    <th>< input type="checkbox" onChange={() => selectSingleItem(item.id)} checked={selectedTask.includes(item.id)} /></th>
                                    <th>{index + 1}</th>
                                    <th>{item.title}</th>
                                    <th>{item.description}</th>
                                    <th className="d-flex justify-content-center ">
                                        <MdDelete className="text-danger  fs-2" onClick={() => deleteTask(item.id)} />
                                        <MdOutlineSystemUpdateAlt className="text-info fs-2" onClick={() => updateTask(item)}/>
                                        
                                    {/* <Button >Delete</Button> */}
                                    </th>
                                    {/* <th><Button variant="primary" onClick={() => updateTask(item)}>Update</Button></th> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </Container>
        </>
    )
}

export default List