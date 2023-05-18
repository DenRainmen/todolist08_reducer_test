import { TaskReducer } from './tests/tasks-reducer'
import { todolistsReducer } from './tests/todolists-reducer'
import { combineReducers} from 'redux'
import { legacy_createStore as createStore} from 'redux'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
//создали рутовый редьюсер, который собирёт в себя все остальные мелкие редьюсеры
const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolists: todolistsReducer
})


// непосредственно создаём сам store
export const store = createStore(rootReducer)


// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store