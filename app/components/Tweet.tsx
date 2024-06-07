"use client";

import { useState, ChangeEvent, MouseEvent } from "react";
import styled from "@emotion/styled";

interface Tweet {
  text: string;
  time: string;
  id: number;
  liked: boolean;
}

const Container = styled.div`
  max-width: 700px;
  margin: 50px auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TweetInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  box-sizing: border-box;
`;

const TweetButtonContainer = styled.div`
  text-align: right;
  margin-top: 10px;
`;

const TweetButton = styled.button`
  background-color: #1da1f2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
`;

const TweetList = styled.div`
  margin-top: 20px;
`;

const TweetItem = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  position: relative;
`;

const TweetActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #1da1f2;

  &:hover {
    text-decoration: underline;
  }
`;

const Tweet = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [newTweet, setNewTweet] = useState<string>("");

  const handleTweetChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTweet(e.target.value);
  };

  const handleTweetSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    if (newTweet.trim()) {
      const newTweets = [
        ...tweets,
        { text: newTweet, time: new Date().toLocaleString(), id: Date.now(), liked: false },
      ];
      setTweets(newTweets);
      setNewTweet("");
    }
  };

  const handleDelete = (id: number) => {
    const updatedTweets = tweets.filter((tweet) => tweet.id !== id);
    setTweets(updatedTweets);
  };

  const handleLikeToggle = (id: number) => {
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === id) {
        return { ...tweet, liked: !tweet.liked };
      }
      return tweet;
    });
    setTweets(updatedTweets);
  };

  return (
    <Container>
      <TweetInput
       rows={3}
        value={newTweet}
        onChange={handleTweetChange}
        placeholder="What's happening?"
      />
      <TweetButtonContainer>
        <TweetButton onClick={handleTweetSubmit}>Tweet</TweetButton>
      </TweetButtonContainer>
      <TweetList>
        {tweets.map((tweet) => (
          <TweetItem key={tweet.id}>
            <p>{tweet.text}</p>
            <TweetActions>
              <span>{tweet.time}</span>
              <div>
                <ActionButton onClick={() => handleDelete(tweet.id)}>🗑️</ActionButton>
                <ActionButton onClick={() => handleLikeToggle(tweet.id)}>
                  {tweet.liked ? "❤️" : "🤍"}
                </ActionButton>
              </div>
            </TweetActions>
          </TweetItem>
        ))}
      </TweetList>
    </Container>
  );
};

export default Tweet;