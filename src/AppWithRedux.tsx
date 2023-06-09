import React from 'react'
import { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import { Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, TaskReducer, TitleTaskChangeAC } from './state/tasks-reducer';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, TodolistsReducer } from './state/todolists-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './store';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
   

// хук useDispatch отправляет ВСЕ в рутовый редьюсер
const dispatch = useDispatch()

// хук useSelector выбирает из REDUX-стейта ту часть стейта, которая нам нужна
const todolists = useSelector<AppRootState,TodolistType[]>(state => state.todolists)

const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


  



//tasks functions

    function removeTask(id: string, todolistId: string) {
        

      const action = RemoveTaskAC(todolistId, id)
      dispatch(action)

    }

    function addTask(title: string, todolistId: string) {
        const action = AddTaskAC(todolistId, title)
        dispatch(action)

    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
     const action = ChangeTaskStatusAC(id, isDone, todolistId)
     dispatch(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = TitleTaskChangeAC(id, newTitle, todolistId)
        dispatch(action)
    }


/* todolists functions */

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
        
    }


    function removeTodolist(id: string) {
        const action = RemoveTodolistAC(id)
        dispatch(action)
        
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatch(ChangeTodolistTitleAC(id, title))
    }    

    function addTodolist(title: string): void {
        const action = AddTodolistAC(title)
        dispatch(action)
       
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{ padding: "10px" }}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux
