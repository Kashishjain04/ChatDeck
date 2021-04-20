import React from "react";

const ChatForm = ({ sendMessage, msg, setMsg }) => {
  return (
    <form className="flex border-t" onSubmit={sendMessage}>
      <input
        className="mx-4 sm:mx-6 px-4 py-2 flex-grow border border-black rounded-full my-4 focus:outline-none"
        type="text"
        placeholder="Message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button className="hidden" type="submit" />
    </form>
  );
};

export default ChatForm;
