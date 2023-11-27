import { configureStore } from "@reduxjs/toolkit"
import { useAuthStore } from "../../src/hooks"
import { authSlice } from "../../src/store"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { initialState, notAuthenticatedlState } from "../__fixtures/authStates"
import { testUserCredentials } from "../__fixtures/testUser"
import { calendarApi } from "../../src/api"

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

beforeEach(()=>  localStorage.clear())

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

       

        const mockStore = getMockStore({...notAuthenticatedlState})


    const {result} = renderHook(() => useAuthStore(),{
            wrapper:({children}) =>    <Provider store={mockStore}>{children} </Provider> 
       } )

           await act( async()=> {

    await result.current.startLogin(testUserCredentials)

})




const {errorMessage,status,user}= result.current;

expect({ errorMessage,status,user}).toEqual({

    // status:'authenticated',// 'authenticated','not-authenticated',//'checking
    // user: {name:'test-user',uid:'655b82b62915821b7ffb82e8'},
    // errorMessage:undefined
    
    status:'not-authenticated',// 'authenticated','not-authenticated',//'checking
    user: {},
    errorMessage:
    //undefined 
    "Credenciales incorrectas"

             })

             expect(localStorage.getItem('token') ).toEqual(expect.any(String) );
             expect(localStorage.getItem('token-init-date') ).toEqual(expect.any(String) );
         })




         test('startLogin debe de fallar la autenticación', async() => { 
        const mockStore = getMockStore({...notAuthenticatedlState})
        const {result} = renderHook(() => useAuthStore(),{
                wrapper:({children}) =>    <Provider store={mockStore}>{children} </Provider> 
           } )
    
               await act( async()=> {
    
        await result.current.startLogin({email:'algo@gmaiil.com',password:'errtyyy'})
    
              }) 
              const {errorMessage,status,user}= result.current;

              expect(localStorage.getItem('token') ).toBe(null)
              expect({errorMessage,status,user}).toEqual({
                errorMessage: 
                //undefined,
                expect.any(String),
                status: 'not-authenticated',
                user: {}
              });
              await waitFor (
                    ()=> expect(result.current.errorMessage).toBe(undefined)
              );
         })

         test('startRegister debe de crear un usuario ', async() => { 

            const newUser ={email:'test2@gmaiil.com',password:'errtyyy',name:'test-user2'}

            const mockStore = getMockStore({...notAuthenticatedlState})
            const {result} = renderHook(() => useAuthStore(),{
                    wrapper:({children}) =>    <Provider store={mockStore}>{children} </Provider> 
               } )

               const spy=jest.spyOn(calendarApi,'post').mockReturnValue({
                data:{
                    ok:true,
                    uid:"cualquier id",
                    name:"test-user2",
                    token:"cualquier-token"
                }

               });
            
               await act( async()=> {
    
                await result.current.startRegister(newUser)
            
                      }) 

                      const {errorMessage,status,user}= result.current;
                    expect({errorMessage,status,user}).toEqual({
                        errorMessage: undefined,
                        status: 'authenticated',
                        user: { name: 'test-user2', uid: 'cualquier id' }
                    })
                    
                        spy.mockRestore();//  esta función destruye a spy=jest.spyOn(calendarApi,'post').mockReturnValue()
                        // de tal manera que el spy  aquí no vaya a interferir con otras pruebas

             })


             test('startRegister debe de fallar la creación ', async() => { 
    
                const mockStore = getMockStore({...notAuthenticatedlState})
                const {result} = renderHook(() => useAuthStore(),{
                        wrapper:({children}) =>    <Provider store={mockStore}>{children} </Provider> 
                   } )
    
                
                   await act( async()=> {
        
                    await result.current.startRegister(testUserCredentials)
                
                          }) 
    
                          const {errorMessage,status,user}= result.current;

                        expect({errorMessage,status,user}).toEqual({
                            errorMessage: 'no se puede registrar usuario, veirficar si correo  ya existe',
                            status: 'not-authenticated',
                            user: { }
                        })
                        
    
                 })

    })
    

    