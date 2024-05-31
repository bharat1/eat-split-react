import {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const initial_friends = [
   {
     id:1111,
     name:'alex',
     image:'https://cdn.pixabay.com/photo/2014/04/03/10/41/person-311134_1280.png',
     balance: -7
   },

   {
    id:1112,
    name:'bob',
    image:'https://cdn.pixabay.com/photo/2014/04/03/10/41/person-311134_1280.png',
    balance: 10
  },
  {
    id:1113,
    name:'sam',
    image:'https://cdn.pixabay.com/photo/2014/04/03/10/41/person-311134_1280.png',
    balance: 0
  },

]




function App() {
  const [show , setShow] = useState(false);
  const [friends , setFriends] = useState(initial_friends);
  const [selectFriend , setSelectFriend] = useState(null);
  

  function handleShow(){
      setShow(!show);
  }

  function addFriends(friend){
    setFriends((items)=> [...items , friend])
  }

  function handleSelection(friend){
 setSelectFriend(friend)

  }

  function handleSplit(value){
    setFriends((friends)=> friends.map((friend)=> friend.id == selectFriend.id  ? {...friend , balance: friend.balance + value   }: friend )  

  )}


  return (
    <div className="App">
         <div>
         <FriendsList friends = {friends} onAddSelection = {handleSelection}/>   
        { show && <AddFriend onAddFriend = {addFriends} />}
     <button onClick = {handleShow} style={{width:"50px" , height:"50px"}}>{show ? "Close" : "Add a friend"}</button>
     </div>
    

    { selectFriend && <SplitBill selectFriend = {selectFriend} handleSplit = {handleSplit}/>}
    </div>

  );
}

function FriendsList({friends , onAddSelection}){
  //  const friends = initial_friends;
  return (
    
    <ul className="">
          {
         friends.map((friend)=>(
            <Friend friend = {friend} key = {friend.id}  onAddSelection = {onAddSelection}/>

         ))

          }
    </ul>


)

}

function Friend({friend , onAddSelection}){
 return (
   <div>
     <li>
     <img src={friend.image} alt={friend.name} style={{width:"50px" , height:"50px"}}/>
     <h3>{friend.name}</h3>
     {
      friend.balance <0 && (
       <p className="red"> 
        You owe {friend.name} {Math.abs(friend.balance)}Rs
       </p>

      )

     }

{
      friend.balance >0 && (
       <p className="blue"> 
        You owe {friend.name} {Math.abs(friend.balance)}Rs
       </p>

      )

     }

{
      friend.balance ==0 && (
       <p> 
         you  and {friend.name} are even
       </p>

      )

     }
   
   <button onClick={()=>onAddSelection(friend)}>Select</button>
     </li>

   </div>

 )

}


function AddFriend({onAddFriend}){
  const [name , setName] = useState('');
  const [image , setImage] = useState(''); 
  

  function handleForm(e){
      
    e.preventDefault();
    const id = crypto.randomUUID();
    const newItem = {
      id,
      name,
      image:'https://cdn.pixabay.com/photo/2014/04/03/10/41/person-311134_1280.png',
      balance:0


    }
     
    onAddFriend(newItem);

  }


  return (
      
     <form onSubmit={handleForm}> 
       <label>
        Friend name
        <input type="text" value = {name} onChange = {e => setName(e.target.value)} />

       </label>

       <label>
        Image URL
        <input type="text"  value = {image} onChange = {e => setImage(e.target.value)}/>

       </label>

<button>Add</button>

      </form>
      
   ) 


}


function SplitBill({selectFriend , handleSplit}){
  const [bill ,setBill] = useState('');
  const [expense ,setExpense] = useState('');
  const [payingbill ,setPayingBill] = useState('user');
  const totalPaying = bill - expense;

  function handleSubmit(e){
     e.preventDefault();

     if(!bill || !expense) return;

     handleSplit(payingbill === "user" ? expense : -bill );


  }

   return(
   
    <form className="form-split-bill" onSubmit={handleSubmit}>
     <h2>Split a bill {selectFriend.name}</h2>
       <label>Bill value
        <input type="text" value={bill} onChange = {e=> Number(setBill(e.target.value))}/>
       </label>

       <label>Your Expense
        <input type="text" value={expense} onChange = {e=> setExpense(Number(e.target.value)> bill ? expense : Number(e.target.value))}/>
       </label>

       <label>{selectFriend.name} expense
        <input type="text" disabled value={totalPaying}/>
       </label>
     
       <label>who is paying the bill
        <select value={payingbill} onChange = {e=> setPayingBill(e.target.value)}>
          <option value="user">You</option>
          <option value="friend">{selectFriend.name}</option> 
        </select>
       </label>
   <button style={{width:"50px" , height:"50px"}}>Split bill</button>
    </form>
 

   )

}




export default App;




