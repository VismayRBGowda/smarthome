import { useState, useEffect, useRef } from "react";
import audioFile from "./assets/audio.mp3"; // Import audio file
import musicImage from "./assets/music.webp"; // Import image file

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume (1 = 100%)
  const audioRef = useRef(new Audio(audioFile)); // Create audio instance
  const progressBarRef = useRef(null); // Ref for progress bar

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume; // Set initial volume

    // Update progress bar dynamically
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [volume]);

  // Play/Pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Volume control
  const increaseVolume = () => {
    const newVolume = Math.min(volume + 0.1, 1);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(volume - 0.1, 0);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Seek audio when clicking on progress bar
  const seekAudio = (event) => {
    const audio = audioRef.current;
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newProgress = (offsetX / rect.width) * 100;
    const newTime = (newProgress / 100) * audio.duration;

    audio.currentTime = newTime;
    setProgress(newProgress);
  };

  return (
    <div className="flex flex-col font-montserrat items-center bg-zinc-800 hover:bg-zinc-700/65 cursor-pointer h-2/3 m-3 mt-2 rounded-lg shadow-xl p-4">
      {/* Music Player Title */}
      <div className="title flex items-center text-xl text-amber-400 mb-2">
        <span className="material-symbols-outlined mx-2 text-xl">music_note</span>
        <h2 className="text-base font-semibold">Music Player</h2>
      </div>

      <div className="line h-[2px] w-full bg-red-400 mb-3"></div>

      {/* Display Image */}
      <img src={musicImage} alt="Music" className="mx-4 w-50 h-40 rounded-lg shadow-md" />
      <div className="songname text-gray-400 hover:text-gray-300 text-sm m-1 font-medium">Believer</div>
      <div className="artist text-gray-400 hover:text-gray-300 text-xs font-medium">Imagine Dragons</div>

      {/* Playback Controls */}
      <div className="flex items-center gap-6 mt-4">
        {/* Volume Down Button */}
        <button
          className="bg-gray-600 flex items-center justify-center text-white p-1 rounded-full shadow-md hover:bg-gray-700 transition cursor-pointer"
          onClick={decreaseVolume}
        >
          <span className="material-symbols-outlined text-sm">volume_down</span>
        </button>

        {/* Play/Pause Button */}
        <button
          className="bg-green-500 flex items-center justify-center text-white p-2 rounded-full shadow-md hover:bg-green-600 transition cursor-pointer"
          onClick={togglePlay}
        >
          <span className="material-symbols-outlined text-sm">
            {isPlaying ? "pause" : "play_arrow"}
          </span>
        </button>

        {/* Volume Up Button */}
        <button
          className="bg-gray-600 flex items-center justify-center text-white p-1 rounded-full shadow-md hover:bg-gray-700 transition cursor-pointer"
          onClick={increaseVolume}
        >
          <span className="material-symbols-outlined text-sm">volume_up</span>
        </button>
      </div>

      {/* Progress Bar (Clickable) */}
      <div ref={progressBarRef} className="w-full bg-gray-500 h-1 rounded mt-4 cursor-pointer group flex" onClick={seekAudio}>
        <div className="bg-gray-300 h-full rounded transition-all group-hover:bg-green-400" style={{ width: `${progress}%` }}></div>
        <div className="w-4 h-4 bg-white rounded-full shadow-md absolute -top-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition" style={{ left: `calc(${progress}% - 8px)` }}></div>
      </div>
    </div>
  );
};

export default AudioPlayer;
