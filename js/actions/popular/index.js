import Types from '../types'
import DataStore from '../../expand/dao/DataStore'

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @return {function}
 */
export function onLoadPopularData(storeName, url) {
  return dispatch => {
    dispatch({
      types: Types.POPULAR_REFRESH,
      storeName: storeName
    });
    let dataStore = new DataStore();
    dataStore.fetchData(url) // 异步action与数据流
      .then(data => {
        handlerData(dispacth, storeName, data)
      })
      .catch(error => {
        console.log(error);
        dispatch({
          types: Types.LOAD_POPULAR_FAIL,
          storeName,
          error
        })
      })

  }
}

function handlerData(dispacth, storeName, data) {
  dispacth({
    types: Types.LOAD_POPULAR_SUCCESS,
    items: data && data.data && data.data.items,
    storeName
  })
}
