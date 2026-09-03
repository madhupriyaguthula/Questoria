import { useState } from "react";
import saintPortrait from "../assets/saint-portrait.png";
import owlPortrait from "../assets/owl-portrait.png";
import avatarHero from "../assets/avatar-hero.png";
import charFemale from "../assets/char-female.png";
import charMale from "../assets/char-male.png";
import "./DialogueBox.css"; // imports transition styles

const PORTRAITS = {
  "female": charFemale,
  "male": charMale,
  "char-female.png": charFemale,
  "char-male.png": charMale,
  "avatar-hero.png": avatarHero,
};

const speakerTags = { Saint: "The Sage", Owl: "The Owl", Player: "You", You: "You" };

function DialogueBox({ dialogue, onComplete, buttonLabel = "Next", avatar: avatarProp }) {
  const savedAvatar = localStorage.getItem("avatar") ? JSON.parse(localStorage.getItem("avatar")) : "female";
  const avatarKey = avatarProp || savedAvatar || "female";
  const playerAvatarImg = PORTRAITS[avatarKey] || (typeof avatarKey === "string" && avatarKey.startsWith("data:") ? avatarKey : charFemale);

  const portraits = { 
    Saint: saintPortrait, 
    Owl: owlPortrait, 
    Player: playerAvatarImg, 
    You: playerAvatarImg 
  };
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const current = dialogue[index];
  const isLast = index === dialogue.length - 1;

  const handleNext = () => {
    setVisible(false);
    setTimeout(() => {
      if (isLast) {
        onComplete();
      } else {
        setIndex((prev) => prev + 1);
        setVisible(true);
      }
    }, 220);
  };

  return (
    <>
      {/* SAINT — fixed on the left side, independent */}
      {portraits[current.speaker] && (
        <img
          src={portraits[current.speaker]}
          alt={current.speaker}
          className={`vn-saint-left ${visible ? "vn-visible" : "vn-hidden"}`}
        />
      )}

      {/* SAGE BOX — centered, wide horizontal rectangle, independent */}
      <div className={`vn-bubble-center ${visible ? "vn-visible" : "vn-hidden"}`}>
        <span className="vn-name-tag">{speakerTags[current.speaker] || current.speaker}</span>
        <p className="vn-text">{current.text}</p>
        <button className="vn-next-btn" onClick={handleNext}>
          {isLast ? buttonLabel : "Continue ▸"}
        </button>
      </div>
    </>
  );
}

export default DialogueBox;