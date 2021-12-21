import { useState } from 'react';
import { useMoralis } from 'react-moralis';

function SendMessage({ endOfMessages }) {
    const { user, Moralis } = useMoralis()
    const [message, setMessage] = useState("")

    const sendMessage = (e) => {
        e.preventDefault()

        if (!message) return;

        const Messages = Moralis.Object.extend("messages");
        const messages = new Messages();

        messages.save({
            message: message,
            ethAddress: user.get("ethAddress"),
            username: user.getUsername(),
        }).then(message => {
            // The Object was saved successfully.  
        }, error => {
            // The save failed.
            console.log(error.message);
        })

        endOfMessages.current.scrollIntoView({ behavior: "smooth" })

        setMessage("")
    }

    return (
        <form id="messageForm" className='flex fixed bottom-10 bg-black opacity-80
        px-6 py-4 w-11/12 max-w-2xl shadow-xl rounded-full border-4 border-blue-400'>
            <input
                className="flex-grow outline-none bg-transparent text-white placeholder:gray-500 pr-5"
                placeholder={`Enter a message ${user.getUsername()}...`}
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button
                type='submit'
                className="font-bold text-pink-500"
                onClick={e => sendMessage(e)}
                form='messageForm'
            >
                Send</button>
        </form >
    )
}

export default SendMessage
