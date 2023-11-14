import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import { calendarApi } from "../api"
import { ConvertEventsToDateEvent } from "../helpers"
import Swal from "sweetalert2"


export const useCalendarStore = () => {

    const dispatch = useDispatch()
 
 const {events,activeEvent}=useSelector(state =>state.calendar)
 const {user}=useSelector(state =>state.auth)

  const setActiveEvent =(calendarEvent) =>{
         dispatch(onSetActiveEvent(calendarEvent))
  }

    const startSavingEvent = async (calendarEvent)=>{
         

        try {
        
            await calendarApi.put(`/events/update${calendarEvent.id}`, calendarEvent)

            if(calendarEvent.id){
                //Actualziar
                dispatch(onUpdateEvent({...calendarEvent,user}) )
                return
            }
            else{
                //Creando
                const {data}=await calendarApi.post('/events/new',calendarEvent)
                console.log({data});
                
                
                dispatch(onAddNewEvent({...calendarEvent,id:data.evento.id ,user} ) )
            }

        } catch (error) {
            
        console.log(error);
        Swal.fire('Error al guardar o actualizar la nota ',error.response.data.msg,'error')
        
        }

       
    }

      const startDeletingEvent = async ( ) =>{
        //TODO debe lleagar al backend
            dispatch(onDeleteEvent())
    }


    const startLoadingEvents = async ()=>{
        try {
            const {data}=await calendarApi.get('/events/get')
           
            const events= ConvertEventsToDateEvent(data.eventos);
            dispatch(onLoadEvents(events));
            
            console.log(data);
            
            
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
