"use client"

import Lottie from "lottie-react";
import CartoonToothCharacter from "../constant/CartoonToothCharacter.json"

export default function SkyDentalLoading() {


  return (
      <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden z-50"
           style={{ background: "linear-gradient(135deg, #ffffff 0%, #e8f6fb 100%)" }}
      >
        <style>{`
        @keyframes pulse-progress {
          0% { width: 20%; }
          50% { width: 70%; }
          100% { width: 20%; }
        }
        .progress-bar {
          animation: pulse-progress 2.4s ease-in-out infinite;
          background: linear-gradient(to right, #006782, #7ccdee);
        }
      `}</style>

        {/* Ambient glow */}
        <div className="absolute bg-[rgba(0,103,130,0.05)] items-center w-[40vw] h-[40vw] flex flex-col max-w-[600px] max-h-[600px] max-sm:w-3/4 max-sm:h-[75vw] rounded-full pointer-events-none animate-pulse"
        >
            {/* Inner ring highlight */}

            <Lottie animationData={CartoonToothCharacter}
                    className=" w-[30vw] h-[30vw] max-w-[400px] max-h-[400px]" />

            {/* Text block */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h1
                  className="font-headline font-semibold tracking-tight m-0 text-[#006782]"
                  style={{ fontSize: "clamp(24px, 5vw, 36px)", color: "#006782" }}
              >
                Loading...
              </h1>
              <p
                  className="font-body text-xs font-medium uppercase tracking-widest m-0"
                  style={{ color: "#6f787d", opacity: 0.8, letterSpacing: "0.12em" }}
              >
                Sky Dental Cabinet
              </p>

              {/* Progress bar */}
              <div className="mt-5 w-32 max-sm:w-[40vw] h-1 rounded-full overflow-hidden"
                   style={{ background: "#e7e8e9" }}
              >
                <div className="progress-bar h-full rounded-full" />
              </div>
            </div>
        </div>
        {/* Content */}

      </div>
  );
}