import React, { useState } from "react";

function TodoList() {
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState('');

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: newTask }]);
            setNewTask('');
        }
    };

    const removeTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        resetEditing();
    };

    const startEditing = (taskId) => {
        const taskToEdit = tasks.find((task) => task.id === taskId);
        setEditTaskId(taskId);
        setEditedTask(taskToEdit.text);
    };

    const cancelEditing = () => {
        resetEditing();
    };

    const updateTask = () => {
        if (editedTask.trim() !== '') {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === editTaskId ? { ...task, text: editedTask } : task
                )
            );
            resetEditing();
        }
    };

    const resetEditing = () => {
        setEditTaskId(null);
        setEditedTask('');
    };

    return (
        <>
            <div className="col-md-8 offset-2 d-flex justify-content-start flex-column p-5 bg-dark w-100">
                <div className='d-flex justify-content-between py-3'>
                    <input
                        type="text"
                        className='form-control w-70'
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task"
                    />
                    <button className='btn btn-success mx-2' onClick={addTask}>Add</button>
                </div>
                <ol type="A" className='list-group bg-secondary'>
                    {tasks.map((task) => (
                        <li key={task.id} className='list-group-item d-flex justify-content-between align-items-center'>
                            {editTaskId === task.id ? (
                                <>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={editedTask}
                                        onChange={(e) => setEditedTask(e.target.value)}
                                    />
                                    <div className='d-flex'>
                                        <button className='btn btn-success mx-2' onClick={updateTask}>Update</button>
                                        <button className='btn btn-danger' onClick={cancelEditing}>Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {task.text}
                                    <div className='d-flex'>
                                        <button className='btn btn-primary mx-2' onClick={() => startEditing(task.id)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => removeTask(task.id)}>Remove</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}

export default TodoList;