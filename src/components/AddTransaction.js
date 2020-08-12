import React , {useState, useContext, useRef} from 'react'
import { GlobalContext } from '../context/GlobalState'

export const AddTransaction = () => {

    const myForm = useRef(null)

    const {addTransaction} = useContext(GlobalContext)
    
    const [text, setText] = useState('')
    const [amount, setAmount] = useState(0) 
    

    const onSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: +amount
        }

        addTransaction(newTransaction);

        myForm.current.reset();

        
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form ref={myForm} onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    >Amount <br />
            (negative - expense, positive - income)</label
                    >
                    <input type="number" id="amount" onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}
