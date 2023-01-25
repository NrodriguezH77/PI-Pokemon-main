import { createStore, applyMiddleware,  compose} from 'redux';
import thunk from 'redux-thunk'
import reducer  from '../redux/reducer'

let middleware = [thunk]
const store = createStore(reducer,
    /* compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) */
        compose(
          applyMiddleware(...middleware),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
      );

export default store;