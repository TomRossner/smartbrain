export const createAction = (actionType, value = null) => (
    {
       type: actionType,
       payload: value
   }
)