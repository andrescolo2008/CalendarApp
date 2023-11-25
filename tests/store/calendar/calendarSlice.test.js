import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, events, initialState } from "../../__fixtures/calendarStates";

describe('pruebas en < calendarSlice>',()=>{
test('debe de retornar el estado inicial ', () => { 
        const state= calendarSlice.getInitialState();
        expect(state).toEqual(initialState)
  })

  test('onSetActiveEvent debe de activar el evento ', () => { 
    const state= calendarSlice.reducer(calendarWithActiveEventState,onSetActiveEvent(events[0]))
        expect(state.activeEvent).toEqual(events[0])
   })

   test('onAddNewEvent debe de activar el evento ', () => { 
    
    const newEvent = {
        id: '3',
        title:'cumpleaños de Andrea  ',
        notes:' hay que comprar el pastel',
        start: new Date('2024-11-22 19:00:00'),
        end:new Date('2024-11-22 20:00:00'),
        
    }

    const state= calendarSlice.reducer(calendarWithActiveEventState,onAddNewEvent(newEvent))
        expect(state.events).toEqual([...events,newEvent])
   })

   test('onUpdateEvent debe de actualziar el evento ', () => { 
    
    const upDateEvent = {
        id: '1',
        title:'cumpleaños de l pastel 2 ',
        notes:' hay que comprar el pastel y la gaseosa !!!',
        start: new Date('2024-11-22 15:00:00'),
        end:new Date('2024-11-22 18:00:00'),
        
    }

    const state= calendarSlice.reducer(calendarWithActiveEventState,onUpdateEvent(upDateEvent))
        expect(state.events).toContain(upDateEvent)
   })


   test('onDeelteEvent debe de borrar el evento el evento ', () => { 
    
     const state= calendarSlice.reducer(calendarWithActiveEventState,onDeleteEvent())
        
     expect(state.activeEvent).toBe(null)
     expect(state.events).not.toContain(events[0])
   
   
      })

      test('onOadaEvent debe de establecer el evento ', () => { 
    
        const state= calendarSlice.reducer(initialState,onLoadEvents())
           
        expect(state.isLoadingEvents).toBeFalsy()
        expect(state.events).toEqual(events)

const  newState= calendarSlice.reducer(initialState,onLoadEvents())
        
expect(state.events.length).toBe(events.length)
      
      
         })

         test('onLoagoutCalendar debe de limpiar el estado ', () => { 
    
            const state= calendarSlice.reducer(calendarWithActiveEventState,onLogoutCalendar())
               
            expect(state).toEqual(initialState)
          
          
             })



    })
