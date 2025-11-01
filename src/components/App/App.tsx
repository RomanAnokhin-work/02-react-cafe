import { useState } from "react";
import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOption from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import type Votes from "../../types/votes";
import type VoteType from "../../types/votes";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalVotes = votes.good + votes.neutral + votes.bad;

  function handleVote(type: keyof VoteType) {
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type]++,
    }));
  }

  function resetVotes() {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  }

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOption
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes ? true : false}
      />

      {totalVotes ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={
            totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0
          }
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
