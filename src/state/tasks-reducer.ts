import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";



// Initial state
// let todolistId1 = v1();
// let todolistId2 = v1();

// const state = {
//     [todolistId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true}
//     ],
//     [todolistId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true}
//     ]
// }
//----------------------------------------------------------------------

// Типизация экшн-креэйтеров

export type RemoveTaskACType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}

export type AddTaskACType = {
    type: "ADD-TASK"
    todolistId: string
    title: string
}

export type ChangeTaskStatusACType = {
    type: "CHANGE_TASK_STATUS"
    todolistId: string
    taskId: string
    status: boolean
}

export type TitleTaskChangeACType = {
    type: "CHANGE_TASK_TITLE"
    todolistId: string
    taskId: string
    newTaskTitle: string
}




export type Unite_Actions_Type = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | TitleTaskChangeACType | AddTodolistActionType | RemoveTodolistActionType | AddTodolistActionType

//----------------------------------------------------------------------
const initialState:TasksStateType = {
    [todolistId1]: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true }
    ],
    [todolistId2]: [
        { id: v1(), title: "Milk", isDone: true },
        { id: v1(), title: "React Book", isDone: true }
    ]
}

// Task Reducer

/* Редакс при инициализации посылает сразу во ВСЕ редьюсеры хуй пойми какой экшен , а так же undefined вместо стейта.  */
export const TaskReducer = (state: TasksStateType = initialState, action: Unite_Actions_Type): TasksStateType => {

    switch (action.type) {



        case "REMOVE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(
                    el => el.id !== action.taskId
                )
            }

        case "ADD-TASK":
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}

        case "CHANGE_TASK_STATUS":

            return {...state, [action.todolistId]: state[action.todolistId].map
                (el => el.id === action.taskId ? {...el, isDone: action.status} : el)}

        case "CHANGE_TASK_TITLE":

            return {...state, [action.todolistId]: state[action.todolistId].map
                (el => el.id === action.taskId ? {...el, title: action.newTaskTitle} : el)}

        case 'ADD-TODOLIST':
            const newState = {[action.id]: [], ...state}
            console.log(newState)

            return newState

        case 'REMOVE-TODOLIST':


        delete state[action.payload.id]
        return state


        default:
            /* throw new Error("I dont know this action type") */
            return state
    }

}
//------------------------------------------------------------------------------------------------------------

// Action Creaters
export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskACType => {

    return {
        type: "REMOVE-TASK",
        todolistId: todolistId,
        taskId: taskId
    } as const
}


export const AddTaskAC = (todolistId: string, title: string): AddTaskACType => {

    return {
        type: "ADD-TASK",
        todolistId: todolistId,
        title: title

    } as const

}


export const ChangeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusACType => {

    return {
        type: "CHANGE_TASK_STATUS",
        todolistId: todolistId,
        taskId: id,
        status: isDone

    } as const
}

export const TitleTaskChangeAC = (taskId: string, newTaskTitle: string, todolistId: string): TitleTaskChangeACType => {

    return {
        type:"CHANGE_TASK_TITLE",
        todolistId: todolistId,
        taskId: taskId,
        newTaskTitle: newTaskTitle
    } as const
}




//-------------------------------------------------------------------