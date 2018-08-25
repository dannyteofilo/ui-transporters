import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import {
    persistStore,
    persistReducer
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import logger from 'redux-logger';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const persistConfig = {
    key: 'root',
    storage,
}

let store = null;

const configureStore = () => {
    return new Promise((resolve, reject) => {
        try {
            const persistedReducer = persistReducer(persistConfig, rootReducer);
            const sagaMiddleware = createSagaMiddleware();

            store = createStore(persistedReducer, undefined, compose(
                applyMiddleware(logger, sagaMiddleware),

                // Commented out redux dev tools, production releases not guaranted browser extension is installed
                // so we don't break the web app.
                // Uncomment if you want but don't publish to git

                // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            ));

            persistStore(store, null, () => setTimeout(() => resolve(store)));

            sagaMiddleware.run(rootSaga);
        } catch (e) {
            reject(e);
        }
    });
}

export const getStore = () => {
    return store;
}

export default configureStore;