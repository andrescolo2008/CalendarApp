
 export const  initialState ={

   
        status:'checking',// 'authenticated','not-authenticated',//'checking
        user: {},
        errorMessage:undefined
        
}

export const  authenticatedState ={

   
    status:'authenticated',// 'authenticated','not-authenticated',//'checking
    user: {
        uid:'abc',
        name:'andrew'
    },
    errorMessage:undefined
    
}

export const  notAuthenticatedlState ={

   
    status:'not-authenticated',// 'authenticated','not-authenticated',//'checking
    user: {},
    errorMessage:undefined
    
}