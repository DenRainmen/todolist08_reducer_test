import {FilterValuesType, TodolistType} from '../App'
import {v1} from "uuid";



/* export type ActionType = {
    type: string
    [key: string]: any
} */

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
   
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id: string
        newTitle: string
    }
   
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id: string
        filter: FilterValuesType
    }
   
}

export type UNION_ACTIONS_TYPE = 
RemoveTodolistActionType | AddTodolistActionType |
ChangeTodolistTitleActionType | ChangeTodolistFilterActionType




export const todolistsReducer = (state: TodolistType[], action: UNION_ACTIONS_TYPE): TodolistType[] => {

    switch (action.type) {

        case 'REMOVE-TODOLIST':

            return state.filter(el => el.id !== action.payload.id)

        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: v1(), title: "New Todolist", filter: 'all'}
            return [newTodolist,...state]

        case "CHANGE-TODOLIST-TITLE":

            return state.map(el => el.id === action.payload.id ? {...el, title:action.payload.newTitle}  : el)

        case "CHANGE-TODOLIST-FILTER":

            return state.map(el => el.id === action.payload.id ? {...el, filter:action.payload.filter}  : el)


        default:
            throw new Error('I don\'t understand this type')
    }
}