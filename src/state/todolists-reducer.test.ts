import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, TodolistsReducer} from './todolists-reducer'
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


        const testResult = TodolistsReducer(startState, (RemoveTodolistAC(todolistId1)))

        expect(testResult.length).toBe(1)
        expect(testResult[0].id).toBe(todolistId2)
    })

//test 2

test("new todolist should be adding", () => {

    const action = AddTodolistAC('New Todolist')

    const testResult = TodolistsReducer(startState, action)

    expect(testResult.length).toBe(3)
})


//test 3

test("todolist should change his title ", () => {

    const action = ChangeTodolistTitleAC(todolistId1, "New todolist title")

    const testResult = TodolistsReducer(startState, action)

    expect(testResult[0].title).toBe("New todolist title")
})


//test 4

test("todolist filter should change ", ()=>{


const action = ChangeTodolistFilterAC("active", todolistId1)

    const testResult = TodolistsReducer(startState, action)

    expect(testResult[0].filter).toBe("active")
    expect(testResult[1].filter).toBe("all")


})