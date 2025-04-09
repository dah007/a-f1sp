import { configureStore } from '@reduxjs/toolkit';

const addTodo = (text: string) => ({
    type: 'ADD_TODO',
    payload: {
        text,
        completed: false,
    },
});

const makeStore = () => {
    // a mock store that has a get state method that returns the initial state
    // and an addToDo method that dispatches an action
    const store = configureStore({
        reducer: (state = { todos: [] }, action) => {
            switch (action.type) {
                case 'ADD_TODO':
                    return {
                        ...state,
                        todos: [...state.todos, action.payload],
                    };
                default:
                    return state;
            }
        },
    });
    return store;
};

it('should add a todo', () => {
    const store = makeStore(); // a user defined reusable store factory

    store.dispatch(addTodo('Use Redux'));
});
