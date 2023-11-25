import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../__fixtures/authStates"
import { testUserCredentials } from "../../__fixtures/testUser"

describe('pruebas en < authSlice>',()=>{
test('debe de retornar el estado inicial', () => { 

    expect(authSlice.getInitialState()).toEqual(initialState)
    })

    test('debe de realziar el login', () => { 

        const state= authSlice.reducer(initialState,onLogin(testUserCredentials) )// payload es testUserCredentials

        expect(state).toEqual({
            status:'authenticated',
            user:testUserCredentials,
            errorMessage:undefined
          
           })

        })

        test('debe de realziar el logout', () => { 

            const state= authSlice.reducer(authenticatedState,onLogout()) 
    
            expect(state).toEqual({
                status:'not-authenticated',
                user:{},
                errorMessage:undefined
              
               })
    
            })

            test('debe de realziar el logout y eviar mensaje de error', () => { 

                const errorMessage='credenciales incorrectas'
                const state= authSlice.reducer(authenticatedState,onLogout(errorMessage)) 
        
                expect(state).toEqual({
                    status:'not-authenticated',
                    user:{},
                    errorMessage:errorMessage
                  
                   })
        
                })

    test('debe de limpiar el mensaje de error', () => { 

          const errorMessage='credenciales incorrectas'
          const state= authSlice.reducer(authenticatedState,onLogout(errorMessage)) 
          
          const newState= authSlice.reducer(authenticatedState,clearErrorMessage()) 

          expect(newState.errorMessage).toBe(undefined)

          })
})