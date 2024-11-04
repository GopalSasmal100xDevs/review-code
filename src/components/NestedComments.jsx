import { useState } from "react";
import { initialComments } from "./data";
import Comments from "./Comments";

export default function NestedComments() {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addComment(-1, commentText);
    } else if (e.key === "Escape") {
      setCommentText("");
    }
  }

  function addComment(id, newComment) {
    if (newComment.trim() === "") return;
    if (id === -1) {
      setCommentText("");
      setComments((prev) => [
        ...prev,
        { id: Date.now(), comment: newComment, replies: [] },
      ]);
    } else {
      addCommentsToTree([...comments], id, newComment);
    }
  }

  function addCommentsToTree(parents = [], parentCommentId, newComment) {
    for (const ele of parents) {
      if (ele.id === parentCommentId) {
        ele.replies = [
          ...ele.replies,
          {
            id: Date.now(),
            comment: newComment,
            replies: [],
          },
        ];
        return true;
      }

      if (addCommentsToTree(ele.replies, parentCommentId, newComment))
        return true;
    }
    return false;
  }

  function deleteComment(id) {
    setComments((state) => {
      const newState = [...state];
      deleteNestedComments(newState, id);
      return newState;
    });
  }

  function deleteNestedComments(parent, commentId) {
    for (let i = 0; i < parent.length; i++) {
      if (parent[i].id === commentId) {
        parent.splice(i, 1);
        return true;
      }

      if (deleteNestedComments(parent[i].replies, commentId)) return true;
    }
    return false;
  }

  return (
    <div>
      <h1>Comments</h1>

      <div className="mb-[1rem] flex gap-4">
        <input
          type="text"
          placeholder="Add comment..."
          autoFocus
          onKeyDown={handleKeyDown}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button onClick={() => addComment(-1, commentText)}>Add Comment</button>
      </div>

      <Comments
        comments={comments}
        deleteComment={deleteComment}
        addReply={addComment}
        deleteNestedComments={deleteNestedComments}
      />
    </div>
  );
}
