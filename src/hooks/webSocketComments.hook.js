import { useContext, useEffect, useRef, useState } from "react";
import { fetchFunficComments } from "../api/funficsApi";
import { AuthContext } from "../contexts/AuthContext";
import { configuredStompClient } from "../utils/stompClient";
import ApiUrls from "../apiUrls";

function useWebSocketComments(funficId) {
  const [comments, setComments] = useState([]);
  const [errors, setErrors] = useState([]);
  const auth = useContext(AuthContext);
  const sockClientRef = useRef(
    configuredStompClient(ApiUrls.WEBSOCKET_ENDPOINT)
  );

  function post(comment) {
    if (comment.length)
      sockClientRef.current.send(
        "/sock/save-comment",
        {},
        JSON.stringify({
          content: comment,
          funficId: funficId,
        })
      );
  }

  useEffect(() => {
    fetchFunficComments(
      funficId,
      (comments) => setComments(comments),
      (error) => {
        setErrors([`Error while fetching the comment: ${error.message}`]);
      }
    );
  }, [funficId]);

  useEffect(() => {
    const sockClient = sockClientRef.current;
    const authOptions = auth.token
      ? { Authorization: `Bearer ${auth.token}` }
      : {};
    sockClient.connect(authOptions, () => {
      sockClient.subscribe("/sock/comment-listeners", (message) => {
        setComments((prev) => [...prev, JSON.parse(message.body)]);
      });
    });
  }, [auth]);

  return {
    comments,
    errors,
    post,
  };
}

export default useWebSocketComments;
