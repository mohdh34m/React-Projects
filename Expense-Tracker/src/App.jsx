import { LuWalletMinimal } from "react-icons/lu";
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";

function App() {
  const [showTransaction, setShowTransaction] = useState(true)
  const data = [{ id: 1, name: "Income", value: "income", bgColor: "bg-green-100 border-green-400" },
                { id: 2, name: "Expense", value: "expense", bgColor: "bg-red-100 border-red-400" }];
  const [selectedOption, setSelectedOption] = useState("")
  const [transaction, setTransaction] = useState({
    option: 'Income',
    description: '',
    amount: 0,
  });
  
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  const addTransaction = () => {
    setBalance((prev) =>
      transaction.option === "Income" ? prev + transaction.amount : prev - transaction.amount
    );
    if(transaction.option === "Income"){
      setIncome((prev) => prev + transaction.amount)
    } else {
      setExpense((prev) => prev + transaction.amount)
    }
    setTransactions([...transactions, transaction]);
    setTransaction({ option: 'Income', description: '', amount: 0 });
    setShowTransaction(true)
  };  
  
  const deleteTransaction = (transactionToDelete) => {
    setBalance((prev) => prev - transactionToDelete.amount)
    const updatedTasks = transactions.filter(transactions => transactions !== transactionToDelete);
    setTransactions(updatedTasks);
  }

  return (
    <div className="w-full h-screen bg-[#EFF5FE]">
      <div className="flex flex-col items-center h-full">
        <div className="flex justify-between w-[80vh] m-5">
          <div className="flex items-center">
            <LuWalletMinimal size={30} className="mr-2" />
            <h1 className="text-[30px] font-bold">Expense Tracker</h1>
          </div>
          { showTransaction ? <button className="text-[15px] text-white bg-blue-600 w-[150px] font-bold text-center p-2 rounded-lg" onClick={() => setShowTransaction(false)}>Add Transaction</button> : <button className="text-[15px] text-white bg-blue-600 w-[150px] font-bold text-center p-2 rounded-lg" onClick={() => setShowTransaction(true)}>Close</button>}
          
        </div>

        <div className="flex justify-between mt-5 w-[690px]">
          <div className="flex flex-col justify-center bg-white shadow-md h-[100px] w-[200px] p-3 rounded-xl">
            <h1 className="text-[17px] font-bold">Balance</h1>
            <h1 className="text-[30px] font-bold">${balance}</h1>
          </div>
          <div className="flex flex-col justify-center bg-white shadow-md h-[100px] w-[200px] p-3 rounded-xl">
            <div className="flex items-center">
              <IoArrowUpCircleOutline size={25} className="mr-1 text-green-400" />
              <h1 className="text-[17px] font-bold">Income</h1>
            </div>
            <h1 className="text-[30px] font-bold text-green-400">${income}</h1>
          </div>
          <div className="flex flex-col justify-center bg-white shadow-md h-[100px] w-[200px] p-3 rounded-xl">
            <div className="flex items-center">
              <IoArrowDownCircleOutline size={25} className="mr-1 text-red-400" />
              <h1 className="text-[17px] font-bold">Expense</h1>
            </div>
            <h1 className="text-[30px] font-bold text-red-400">${expense}</h1>
          </div>
        </div>

        { showTransaction ? null : <div className="w-[690px] flex flex-col bg-white rounded-xl shadow-md mt-5 p-3">
          <div className="flex">

            {data.map(option => (
              <div
                key={option.id}
                className={`w-[50%] m-1 h-[50px] border-2 rounded-lg flex justify-center items-center cursor-pointer ${
                  selectedOption === option.id ? option.bgColor : ''
                }`}
                
                  onClick={() => {
                    setSelectedOption(option.id);
                    setTransaction((prev) => ({ ...prev, option: option.name }));
                  }}                  
              >
                <h1 className="font-bold">{option.name}</h1>
              </div>
            ))}

          </div>
          <input
            type='text'
            name="description"
            onChange={(e) =>
              setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            placeholder='Description'
            className='bg-transparent rounded-lg border-2 border-stroke py-[10px] px-5 outline-none focus:border-black m-1'
          />
          <input
            type='number'
            name="amount"
            onChange={(e) =>
              setTransaction((prev) => ({
                ...prev,
                [e.target.name]: parseFloat(e.target.value) || 0, 
              }))
            }            
            placeholder='Amount'
            className='bg-transparent rounded-lg border-2 border-stroke py-[10px] px-5 outline-none focus:border-black m-1'
          />

          <button 
            className='bg-blue-600 rounded-lg items-center justify-center py-3 px-7 text-white m-1 font-bold'
            onClick={addTransaction}
            >Add</button>
        </div>}
        
        {transactions.length !== 0 ? transactions.map((trans, index) => (
          <div key={index} className="bg-white w-[690px] h-[80px] rounded-xl flex justify-between mt-5">
            <div className="flex items-center m-5">
              <div className={`${trans.option === "Income" ? 'bg-green-100' : 'bg-red-100'} h-10 w-10 flex justify-center items-center rounded-lg`}>
                {trans.option === "Income" ?  <h1><IoArrowUpCircleOutline size={30} className="text-green-400" /></h1>: <h1><IoArrowDownCircleOutline size={30} className="text-red-400" /></h1>}
              </div>
              <h1 className="font-bold text-lg m-2">{trans.description}</h1>
            </div>
            <div className="flex items-center m-5">
              <h1 className={`m-5 font-bold text-lg ${trans.option === "Income" ? 'text-green-400' : 'text-red-400'}`}>{trans.option === "Income" ? '+' : '-'}${trans.amount}</h1>
              <button onClick={() => deleteTransaction(trans)}><RiDeleteBin5Line size={22} className="text-slate-400" /></button>
            </div>
          </div>
          )) : <div className="bg-white m-5 w-[690px] h-24 rounded-2xl flex justify-center items-center shadow-md">
          <h1 className="text-lg font-bold text-slate-400">No transactions yet</h1>
        </div> }
      </div>
    </div>
  )
}

export default App
