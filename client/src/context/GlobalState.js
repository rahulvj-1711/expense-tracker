import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

// Initial State

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

//create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    //Actions
    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions');
            //console.log(res);
            dispatch({
                type: "GET_TRANSACTIONS",
                payload: res.data.data
            })

        } catch (error) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: error.response
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`)

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })

        } catch (error) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: error.response
            })
        }        
        
    }

    async function addTransaction(transaction) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post('/api/v1/transactions', transaction, config)
            //console.log(res);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })


        } catch (error) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: error.response
            })
        }
        
    }

    return(<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions
    }}>
        {children}
    </GlobalContext.Provider>)
}