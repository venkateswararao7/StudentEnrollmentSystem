import React, { useState, useEffect, useRef } from 'react';
import sendButton from "../../images/sendButton.png";
import botimage from "../../images/chatbot.png";
import userImage from "../../images/userimage.png";
import "./ChatBot.css";

const ChatBot = () => {
    const [details, setDetails] = useState({
        "name": "",
        "age": "",
    });

    const [messages, setMessages] = useState([
        { text: "Hello, Welcome to student info system! Did you get it?", isBot: true },
    ]);

    const [userInput, setUserInput] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const date = <input className="date-picker" type="date" />
    const steps = [
        <>
            <span>Pick a slot! (morning, afternoon, and evening) </span>
            {date}
        </>,
        "What is your name?",
        "What is your age?",
        "Roll No",
        "Thank you!",
    ];

    const messageContainerRef = useRef(null);

    const handleSend = () => {
        if (userInput.trim() === "") return;
        const trimmedInput = userInput.trim();

        if (currentStep === 0 && trimmedInput.toLowerCase() !== "got it") {
            // If it's the first step and the message is not "Got it," do nothing.
            setUserInput("");
            return;
        }
        const newMessages = [...messages, { text: userInput, isBot: false }];
        setMessages(newMessages);
        setUserInput("");

        if (currentStep < steps.length) {
            const botMessage = steps[currentStep];
            setTimeout(() => {
                setMessages([...newMessages, { text: botMessage, isBot: true }]);
                setCurrentStep(currentStep + 1);
                scrollToBottom();
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        console.log(messages)
        if (e.key === "Enter") {
            const trimmedInput = userInput.trim();

            if (currentStep === 0 && trimmedInput.toLowerCase() !== "got it") {
                // If it's the first step and the message is not "Got it," do nothing.
                setUserInput("");
                return;
            }
            const newMessages = [...messages, { text: userInput, isBot: false }];
            setMessages(newMessages);
            if (messages.length === 5) {
                setDetails({ ...details, name: userInput });
            }
            if (messages.length === 3) {
                setDetails({ ...details, age: userInput });
            }
            setUserInput("");
            console.log(messages);
            if (currentStep < steps.length) {
                const botMessage = steps[currentStep];
                setTimeout(() => {
                    setMessages([...newMessages, { text: botMessage, isBot: true }]);
                    setCurrentStep(currentStep + 1);
                    scrollToBottom();
                }, 1000);
            }
            console.log(details);
            if (currentStep === steps.length - 1) {
                const name = encodeURIComponent(messages[5].text);
                const age = encodeURIComponent(messages[7].text);

                // Build the URL with query parameters
                const url = `/Thanks?name=${name}&age=${age}`;

                // Redirect to the target page with the data
                setTimeout(() => {
                    window.location.href = url;
                }, 5000);


            }

        }
    };

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);




    return (
        <div className="chatBotContainer">
            <div className='chatheader'>
                <h2>Student Enrollment System</h2>
            </div>
            <div className='messageconatainer' ref={messageContainerRef}>
                <div className='message'>
                    {messages.map((message, index) => (
                        <div key={index} className={message.isBot ? 'bot-message' : 'user-message'}>
                            <div className={message.isBot ? 'bot-image' : 'user-image'}>
                                <img src={message.isBot ? botimage : userImage} className='botimage' alt="bot" draggable="false" />
                            </div>
                            <div className='displayed-message'>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='userchatcontainer'>
                <input
                    type='text'
                    placeholder='Type Message'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <div className='sendbtn' onClick={handleSend}>
                    <img src={sendButton} alt="sendButton" draggable="false" />
                </div>
            </div>

        </div>
    );
}

export default ChatBot;
