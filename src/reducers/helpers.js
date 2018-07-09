export function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues)
}

export function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      return item
    }

    // Use the provided callback to create an updated item.
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state
  }
}