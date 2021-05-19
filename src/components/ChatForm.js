import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import OutsideAlerter from "../hooks/OutsideAlerter";

const ChatForm = ({ sendMessage, msg, setMsg }) => {
  const [showPicker, setPicker] = useState(false);
  return (
    <form className="flex border-t" onSubmit={sendMessage}>
      {showPicker && (
        <OutsideAlerter onClickAway={() => setPicker(false)}>
          <Picker
            set="apple"
            title="Pick your emoji…"
            emoji="point_up"
            onSelect={(e) => setMsg((prev) => prev + e.native + " ")}
            style={{
              position: "absolute",
              marginTop: "-420px",
              marginLeft: "1.5rem",
            }}
          />
        </OutsideAlerter>
      )}
      <div className="mx-4 sm:mx-6 px-4 flex items-center flex-grow border border-black rounded-full my-4">
        <i
          className="bx bx-smile mr-1 -ml-2 text-xl grid place-items-center cursor-pointer w-8 h-8 rounded-full text-center hover:bg-gray-200"
          onClick={() => setPicker((prev) => !prev)}
        />
        <input
          className="py-2 flex-grow focus:outline-none"
          type="text"
          placeholder="Message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <button className="hidden" type="submit" />
    </form>
  );
};

export default ChatForm;
