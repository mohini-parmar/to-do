import React, { useEffect, useState } from 'react'

const AddTask = () => {

    const [task, setTask] = useState([])
    // const [taskList , setTaskList ] = useState('')

    const handleAddTask = () => {
        const prmVal = window.prompt('Please Add Task in To-Do list using comma(,)', 'Demo Task');
        console.log(prmVal)
        if (prmVal) {
            let arr = prmVal.split(',')
            setTask(arr)
            localStorage.setItem('Tasks', JSON.stringify(arr))
        }
    }

    const handleListmodify = (index) =>{
        const modifyVal = window.prompt(`Please nodify the task ${task[index]}`)
        if(modifyVal !== task[index]){
            const updatedTask = [...task];
            updatedTask[index] = modifyVal;
            setTask(updatedTask)
            localStorage.setItem('Tasks', JSON.stringify(updatedTask))
        }
    }

    const handleTaskDelete = (i) =>{
        let delAns = window.confirm(`Are you sure you want to delete task : ${task[i]}`)
        if(delAns === true){
            const updatedList = [...task];
            updatedList.splice(i,1);
            setTask(updatedList)
            localStorage.setItem('Tasks', JSON.stringify(updatedList))
        }
    }

    const handleOnLoadData = (val) => {
        setTask(val);
    }

    //load the tasks when window loads 
    useEffect(() => {
        const taskItems = JSON.parse(localStorage.getItem('Tasks')) || []
        console.log("task data : ", taskItems)
        if (taskItems) {
            handleOnLoadData(taskItems)
        }
    },[])

    // store the item whenever there is update

    useEffect(() => {
        localStorage.setItem('Tasks', JSON.stringify(task))
    }, [task])

    // add the tsks using comma(,) and then add those tasks all together in the localstorage
    return (
        <div>
            <button name='addTask' onClick={handleAddTask}>&#43; Add Task</button>
            <ul>
                {task && task.map((t, i) => {
                    return (
                        <li key={i}>{t} <button name='editbtn' onClick={()=>handleListmodify(i)}> Edit </button> <button name='delbtn' onClick={() => handleTaskDelete(i)}>Delete</button></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AddTask
