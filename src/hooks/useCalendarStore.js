import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"
import { calendarApi } from "../api"


export const useCalendarStore = () => {

    const dispatch = useDispatch()
 
 const {events,activeEvent}=useSelector(state =>state.calendar)
 const {user}=useSelector(state =>state.auth)

  const setActiveEvent =(calendarEvent) =>{
         dispatch(onSetActiveEvent(calendarEvent))
  }

    const startSavingEvent = async (calendarEvent)=>{
        // TODO llegar al backend 

        // Todo bien

        if(calendarEvent._id){
            //Actualziar
            dispatch(onUpdateEvent({...calendarEvent}) )
        }
        else{
            //Creando
            const {data}=await calendarApi.post('/events/new',calendarEvent)
            console.log({data});
            
            
            dispatch(onAddNewEvent({...calendarEvent,id:data.evento.id ,user} ) )
        }
    }

      const startDeletingEvent = async ( ) =>{
        //TODO debe lleagar al backend
            dispatch(onDeleteEvent())
    }

    return {
        //*propoerties 
        activeEvent,
        events,
        hasEventSelected:!!activeEvent,
        //*methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }  
}
