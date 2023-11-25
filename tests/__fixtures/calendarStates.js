export const events =[
    {
                id: '1',
                title:'cumpleaños de l pastel ',
                notes:' hay que comprar el pastel',
                start: new Date('2023-11-22 15:00:00'),
                end:new Date('2023-11-22 18:00:00'),
                
            },

            {
                id: '2',
                title:'cumpleaños de la torta  ',
                notes:' hay que comprar el pastel',
                start: new Date('2023-11-22 19:00:00'),
                end:new Date('2023-11-22 20:00:00'),
                
            }
];

 export const initialState ={
    isLoadingEvents: true,
    events:[],
    activeEvent:null
}

export const calendarWithEvents ={
    isLoadingEvents: false,
    events:[...events],
    activeEvent:null
}

export const calendarWithActiveEventState ={
    isLoadingEvents: false,
    events:[...events],
    activeEvent:{...events[0]}
}