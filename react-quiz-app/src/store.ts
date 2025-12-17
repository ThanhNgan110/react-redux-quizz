import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import questionReducer from './slices/question.slices'
import leaderboardReducer from './slices/leaderboard.slices'

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	question: questionReducer,
	leaderboard: leaderboardReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
