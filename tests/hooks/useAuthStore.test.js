import { configureStore } from "@reduxjs/toolkit"
import { useAuthStore } from "../../src/hooks"
import { authSlice } from "../../src/store"
import { act, renderHook } from "@testing-library/react"
import { Provider } from "react-redux"
import { initialState, notAuthenticatedlState } from "../__fixtures/authStates"
import { testUserCredentials } from "../__fixtures/testUser"

const getMockStore= (initialState)=>{
    return configureStore({
        reducer:{
            auth:authSlice.reducer
        },
        preloadedState:{
            auth:{...initialState}
        }
    })
}

describe('pruebas en < useAuthStore>',()=>{
test('debe deregresar los valores por defecto', () => { 

    const mockStore = getMockStore({...initialState})


    const {result} = renderHook(() => useAuthStore(),{
            wrapper:({children}) =>    <Provider store={mockStore}>{children} </Provider> 
       } )

       expect(result.current).toEqual({

        status:'checking',
        user:{},
        erroMessage:undefined,
        startLogin:expect.any(Function),
        startRegister:expect.any(Function),
        checkAuthToken:expect.any(Function),
        startLogout:expect.any(Function)
        
                })
     })

     test('startLogin debe de reaziar el login correctamente', async() => { 

        localStorage.clear()

        const mockStore = getMockStore({...notAuthenticatedlState})


    const {result} = renderHook(() => useAuthStore(),{
            wrapper:({children}) =>    <Provider store={mockStore}>{children} </Provider> 
       } )

           await act( async()=> {

    await result.current.startLogin(testUserCredentials)

})

console.log(result.current);


const {erroMessage,status,user}= result.current;

expect({ erroMessage,status,user}).toEqual({

    status:'authenticated',// 'authenticated','not-authenticated',//'checking
    user: {name:'test-user',uid:'655b82b62915821b7ffb82e8'},
    errorMessage:undefined
    
             })

             expect(localStorage.getItem('token') ).toEqual(expect.any(String) );
             expect(localStorage.getItem('token-init-date') ).toEqual(expect.any(String) );
         })


    })

    