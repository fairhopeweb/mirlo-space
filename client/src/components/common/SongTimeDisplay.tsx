import React from "react";
import { css } from "@emotion/css";

export const SongTimeDisplay: React.FC<{
  playerRef: React.RefObject<HTMLVideoElement>;
  currentSeconds: number;
}> = ({ playerRef, currentSeconds }) => {
  const duration = playerRef.current?.duration ?? 0;
  const percent = currentSeconds / duration;

  return (
    <div
      className={css`
        height: 0.25rem;
        filter: brightness(1);
        cursor: pointer;
        width: 100%;
        top: 0;
        position: absolute;
      `}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        const divWidth = event.currentTarget.offsetWidth;
        const clickX = event.clientX - event.currentTarget.offsetLeft;
        const clickPercent = clickX / divWidth;
        if (isFinite(clickPercent) && isFinite(duration) && playerRef.current) {
          playerRef.current.currentTime = clickPercent * duration;
        }
      }}
    >
      <div
        className={css`
          height: 100%;
          overflow: none;
          transition: 0.1s width;
          width: ${percent * 100}%;
          background: var(--mi-secondary-color);
          pointer-events: none;
        `}
      ></div>
    </div>
  );
};

export default SongTimeDisplay;
