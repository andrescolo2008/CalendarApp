import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import { calendarApi } from "../api"
import { ConvertEventsToDateEvent } from "../helpers"


export const useCalendarStore = () => {

    const dispatch = useDispatch()
 
 const {events,activeEvent}=useSelector(state =>state.calendar)
 const {user}=useSelector(state =>state.auth)

  const setActiveEvent =(calendarEvent) =>{
         dispatch(onSetActiveEvent(calendarEvent))
  }

    const startSavingEvent = async (calendarEvent)=>{
         

        // Todo : Update event

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


    const startLoadingEvents = async ()=>{
        try {
            const {data}=await calendarApi.get('/events/get')
           
            const events= ConvertEventsToDateEvent(data.evento);
            dispatch(onLoadEvents(events));
            
            console.log(events);
            
            
        } catch (error) {
            console.log('error al cargar eventos');
            console.log(error);
            
        }
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
        startLoadingEvents
    }  
}
