import React, { useState, useEffect } from "react";

const TypingAnimation = () => {
  const [text, setText] = useState("");
  const fullText =
    "Welcome to our appointment booking system. Fill out the form to schedule a meeting effortlessly and stay on top of your tasks!";
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping && text.length < fullText.length) {
      const timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 50);

      return () => clearTimeout(timer);
    } else if (text.length === fullText.length) {
      setIsTyping(false);
    }
  }, [text, isTyping, fullText]);

  return (
    <div className="w-[550px] min-h-[100px] p-6 rounded-lg">
      <h1 className="text-5xl leading-[50px] text-white font-bold">
        {text}
        <span className="animate-pulse text-white">|</span>
      </h1>
    </div>
  );
};

export default TypingAnimation;
