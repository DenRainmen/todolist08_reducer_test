import {UNION_ACTIONS_TYPE, todolistsReducer} from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'


let todolistId1 = v1()
let todolistId2 = v1()

const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
]





//test 1

test('correct todolist should be removed',
    () => {

        const action: UNION_ACTIONS_TYPE = {
            type: 'REMOVE-TODOLIST',
            payload: {
                id: todolistId1
            }
        }

        const testResult = todolistsReducer(startState, action)

        expect(testResult.length).toBe(1)
        expect(testResult[0].id).toBe(todolistId2)
    })

//test 2

test("new todolist should be adding", () => {

    const action: UNION_ACTIONS_TYPE = {
        type: "ADD-TODOLIST",

    }
    const testResult = todolistsReducer(startState, action)

    expect(testResult.length).toBe(3)
})


//test 3

test("todolist should change his title ", () => {



    const action: UNION_ACTIONS_TYPE = {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id: todolistId1,
            newTitle: "New todolist title"
        }
    }

    const testResult = todolistsReducer(startState, action)

    expect(testResult[0].title).toBe("New todolist title")
})


//test 4

test("todolist filter should change ", ()=>{

    const action: UNION_ACTIONS_TYPE = {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            id: todolistId1,
            filter: "active"
        }
    }

    const testResult = todolistsReducer(startState, action)

    expect(testResult[0].filter).toBe("active")
    expect(testResult[1].filter).toBe("all")
    console.log(testResult)

})