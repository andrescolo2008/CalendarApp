import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store"


export const useCalendarStore = () => {

    const dispatch = useDispatch()
 
 const {events,activeEvent}=useSelector(state =>state.calendar)

  const setActiveEvent =(CalendarEvent) =>{
         dispatch(onSetActiveEvent(CalendarEvent))
  }
    return {
        //*propoerties 
        activeEvent,
        events,
        //*methods
        setActiveEvent
    }
    
  
}
