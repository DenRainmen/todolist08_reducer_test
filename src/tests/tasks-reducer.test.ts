import {
    TaskReducer,
    Unite_Actions_Type,
    RemoveTaskAC,
    AddTaskAC,
    ChangeTaskStatusAC,
    TitleTaskChangeAC
} from "./tasks-reducer";
import {v1} from "uuid";
import {AddTodolistAC} from "./todolists-reducer";

let todolistId1 = "todolistId-1";
let todolistId2 = "todolistId-2";

const initialState = {
    [todolistId1]: [
        {id: "1", title: "HTML&CSS", isDone: false},
        {id: "2", title: "JS", isDone: false}
    ],
    [todolistId2]: [
        {id: "1", title: "Milk", isDone: false},
        {id: "2", title: "React Book", isDone: false}
    ]
}

// TEST 1 - Task Removed
test("task should be removed",
    () => {

        const action: Unite_Actions_Type = RemoveTaskAC(todolistId1,
            initialState[todolistId1][0].id)


        const result = TaskReducer(initialState, action)

        expect(result[todolistId1].length).toBe(1)
        expect(result[todolistId2].length).toBe(2)


    })

// TEST 2 - Task Added
test("task should be added", () => {

    const action: Unite_Actions_Type = AddTaskAC(todolistId1)


    const result = TaskReducer(initialState, action)

    expect(result[todolistId1].length).toBe(3)
    expect(result[todolistId1][0].title).toBe("New Task Title")
    expect(result[todolistId1][0].id).toBeDefined()
    expect(typeof (result[todolistId1][0].id)).toBe('string')
    expect(result[todolistId2].length).toBe(2)


})

//TEST 3 - Change Task Status

test("task status should be changed", () => {

    //action
    const action: Unite_Actions_Type = ChangeTaskStatusAC(todolistId1, "1")

    //result
    const result = TaskReducer(initialState, action)

    // tests
    expect(result[todolistId1][0].isDone).toBe(true)
    expect(result[todolistId1][1].isDone).toBe(false)
})


//TEST 4 - Change Task Title

test("task tittle should be changed", () => {
    //action

    const action: Unite_Actions_Type = TitleTaskChangeAC(todolistId1, "1", "New Task Title")

    //result
    const result = TaskReducer(initialState, action)
    // tests
    expect(result[todolistId1][0].title).toBe("New Task Title")
    expect(result[todolistId1][1].title).toBe("JS")
})


//Test 5 - Add Todolist


test("when new todolist add also should be adding empty array task by todolist ID key", () => {

    // action
    const action: Unite_Actions_Type = AddTodolistAC()

    //result
    const result = TaskReducer(initialState, action)


    const keys = Object.keys(result)

    const newKey = keys.find(k => k !== "todolistId1" &&
    k !== "todolistId2")

    !newKey &&  new Error("At adding todolist  new key for task is missing")


    // tests
    expect(keys.length).toBe(3)
    expect (typeof(newKey)).toEqual('string')
    expect(result[newKey]).toEqual([])


})


