import React, { useEffect } from "react";
import { useState} from "react"
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({socket,name,room}){
    const [currentMsg,setcurrentMsg]= useState("")
    const [msglist,setmsglist]= useState([])
const send = async(event)=>{
    if(currentMsg !== ""){
        
        const message ={
            room,
            name,
            msg:currentMsg,
            Date:new Date(Date.now()).getHours()
            +":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_msg",message)
        setmsglist((list) => [...list, message])
        setcurrentMsg("")

    }
}          
         useEffect(()=>{
               socket.on("receive",(data=>{
                setmsglist((list) => [...list, data])
               }))
         },[socket])
    return(
        <div className="chat-window">
           <div className="chat-header">
            <p>Live Chat</p>
            </div>
           <div className="chat-body" >
           <ScrollToBottom className="message-container">
             {msglist.map(message=>{
                return(
                    <div className="message" id={name == message.name ? "you":"other"}>
                        <div>
                        <div className="message-content">
                            <p>{message.msg}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{message.Date}</p>
                            <p id="author">{message.name}</p>
                        </div>
                            
                          
                        </div>
                    </div>
                )
             })}
             </ScrollToBottom>
           </div>
           <div className="chat-footer">
           <input type="text" placeholder="Type Here"
           value={currentMsg}
       onChange={(event)=>{
        setcurrentMsg(event.target.value)
       }}
       
       />
            <button onClick={send}>&#9658;</button>
           </div>
        </div>
    )
}
export default Chat
