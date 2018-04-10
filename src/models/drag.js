export default {
  namespace: 'drag',

  state: {
    data: [],
    properties: [],
  },

  effects: {
  },

  reducers: {
    save(state, action) {
      let data = [...state.data];
      data.push(action.payload);

      let properties = [...state.properties];
      properties.push({key: action.payload.key, value:""});
      return {
        ...state,
        data: data,
        properties: properties,
      };
    },
    saveProp(state, action) {
      return {
        ...state,
        properties: action.payload,
      };
    },
    delete(state, action) {
      let data = [...state.data];
      let key = action.payload;
      let newData = data.filter((item)=>{
          return item.key != key;
      });
      return {
        ...state,
        data: newData,
      };
    },
  },
};
