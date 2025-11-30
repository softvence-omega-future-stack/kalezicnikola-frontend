"use client";

import React from "react";

interface AppleGlassButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const AppleGlassButton: React.FC<AppleGlassButtonProps> = ({
    children,
    onClick,
    disabled = false,
}) => {
    return (
        <>
            <button
                onClick={onClick}
                disabled={disabled}
                className="apple-glass-btn"
            >
                {children}
                <span className="shine" />
            </button>

            <style>{`
        .apple-glass-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 60px;
          font-size: 16px;
          font-weight: 500;
          color: white;
          border-radius: 100px; /* capsule shape */
          background: rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          /* Floating shadow */
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
          /* Full border initially */
          border-top: 2px solid rgba(255, 255, 255, 0.4);
          border-top-right: 0;
          border-bottom: 2px solid rgba(255, 255, 255, 0.4);
          border-bottom-left: 0;

        }

        .apple-glass-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }

        .apple-glass-btn:active {
          transform: scale(0.97);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
        }

        /* Shine effect */
        .shine {
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(25deg);
          transition: all 0.5s ease;
        }

        .apple-glass-btn:hover .shine {
          left: 100%;
        }

        .apple-glass-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
        </>
    );
};

export default AppleGlassButton;
