 import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

//  const tempEvent= {
//         _id: new Date().getTime(),
//         title:'cumpleaños de l jefe ',
//         notes:' hay que comprar el pastel',
//         start: new Date(),
//         end:addHours(new Date(), 1 ),
//         bgColor:'#fafafa',
//         user:{
//           _id:'123',
//           name:'Andrés'
//         }
//  }

export const calendarSlice = createSlice({
name:'calendar',
 initialState: {
  isLoadingEvents: true,
events:[
    // tempEvent
],
activeEvent:null
},
reducers: {
onSetActiveEvent :(state, {payload} ) => {
 
 state.activeEvent=payload
    },
    onAddNewEvent :(state, {payload} ) => {
      // de la action extraigo el payload
        // payload sería la nueva nota
        // gracias al toolkit de react es posible utilizar el push y mutar el estado 
      state.events.push(payload)
      state.activeEvent=null // limpio el evento activo, para crear una nueva nota 
         },

         onUpdateEvent :(state, {payload} ) => {
          state.events=state.events.map( event =>{
              if( event.id === payload.id){ 
                return payload
              } 
              return event
          }) 

         },
         onDeleteEvent :(state ) => {

          if( state.activeEvent)
        { state.events =state.events.filter(event =>event.id !== state.activeEvent.id);
          state.activeEvent= null;
            }
        },

        onLoadEvents: (state,{payload=[] }) =>{

          state.isLoadingEvents = false;
          // state.events = payload;
            payload.forEach(event => {
              const exists= state.events.some(dbEvent=> dbEvent.id === event.id);
              
              if (!exists){
                state.events.push(event)
              }
              
            });
        },

        onLogoutCalendar:(state)=>{
          state.isLoadingEvents= true,
          state.events=[],
          state.activeEvent=null
        }

    }
});

// Action creators are generated for each case reducer function
export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onUpdateEvent,
 onSetActiveEvent ,
onLogoutCalendar} = calendarSlice.actions;
