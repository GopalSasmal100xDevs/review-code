import { useState } from "react";

export default function Comments({ comments, deleteComment, addReply }) {
  const [showInput, setShowInput] = useState(-1);
  const [reply, setReply] = useState("");

  function keyEventHandler(e, id) {
    if (e.key === "Enter") {
      addReply(id, reply);
      setShowInput(-1);
      setReply("");
    }
  }

  return comments.map(({ id, comment, replies }) => {
    return (
      <div key={id}>
        <div className="flex items-center mb-2 rounded-md bg-slate-400 px-2">
          <div className="pr-10">{comment}</div>

          {showInput === id ? (
            <div className="mb-[1rem] flex gap-4">
              <input
                type="text"
                placeholder="Add reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                autoFocus
                onKeyDown={(e) => keyEventHandler(e, id)}
              />
              <button
                onClick={() => {
                  addReply(id, reply);
                  setShowInput(-1);
                  setReply("");
                }}
              >
                Add
              </button>
              <button onClick={() => setShowInput(-1)}>Cancle</button>
            </div>
          ) : (
            <>
              <button onClick={() => setShowInput(id)}>Reply</button>
              <button onClick={() => deleteComment(id)}>Delete</button>
            </>
          )}
        </div>

        <div className="ml-4 pl-4">
          <Comments
            comments={replies}
            deleteComment={deleteComment}
            addReply={addReply}
          />
        </div>
      </div>
    );
  });
}
