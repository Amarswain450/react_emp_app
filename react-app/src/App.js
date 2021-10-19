// Importing Components
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

function App() {
    const [loading, setloading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false); 

    useEffect(() => {
        setTimeout(() => {
            
            setloading(false);
        }, 2500);
    }, [])

    
    const getTasks = JSON.parse(localStorage.getItem("taskAdded"));

    useEffect(() => {
        if (getTasks == null) {
            setTasks([])
        } else {
            setTasks(getTasks);
        }
    }, [])


    const addTask = (task) => {
        const id = uuidv4();
        const newTask = { id, ...task }

        setTasks([...tasks, newTask]);

        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully added a new employee detail!'
        })

        localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
    }

    // Delete Task
    const deleteTask = (id) => {
        const deleteTask = tasks.filter((task) => task.id !== id);

        setTasks(deleteTask);

        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'You have successfully deleted a employee detail!'
        })

        localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
    }

    // Edit Task
    const editTask = (id) => {

        const text = prompt("EmployeeName");
        const day = prompt("Sallery");
        let data = JSON.parse(localStorage.getItem('taskAdded'));

        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    text: text,
                    day: day,
                    id: uuidv4()
                }
            }
            return x;
        })

        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully edited an existing task!'
        })

        localStorage.setItem("taskAdded", JSON.stringify(myData));
       
    }

    return (
        <>
            {
                    
                    <div className="container">
                        <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />

                        
                        {showAddTask && <AddTask onSave={addTask} />}

                        
                        <h3>Number of employee: {tasks.length}</h3>

                        
                        {
                            tasks.length > 0
                                ?
                                (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />)
                                :
                                ('Employee Detail not found !')
                        }
                    </div>
            }
        </>
    )
}

export default App;