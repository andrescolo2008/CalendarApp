import { parseISO } from "date-fns"



export const ConvertEventsToDateEvent = (events =[]) => {
  return events.map( event =>{
    event.end =parseISO(event.end);
    event.start =parseISO(event.start);

return event;
    })
}
