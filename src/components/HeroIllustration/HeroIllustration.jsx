export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 800 700"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>

        <radialGradient id="bg" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#FFF9E8"/>
          <stop offset="100%" stopColor="#FFF4C4"/>
        </radialGradient>

        <linearGradient id="wood" x1="0" x2="1">
          <stop offset="0%" stopColor="#9B6D43"/>
          <stop offset="50%" stopColor="#6F4A2E"/>
          <stop offset="100%" stopColor="#8A603D"/>
        </linearGradient>

        <linearGradient id="metal" x1="0" x2="1">
          <stop offset="0%" stopColor="#F6F6F6"/>
          <stop offset="50%" stopColor="#CFCFCF"/>
          <stop offset="100%" stopColor="#9F9F9F"/>
        </linearGradient>

        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="12"
            floodOpacity=".18"
          />
        </filter>

      </defs>

      {/* Background */}

      <circle
        cx="400"
        cy="330"
        r="270"
        fill="url(#bg)"
      />

      {/* Base Shadow */}

      <ellipse
        cx="400"
        cy="610"
        rx="170"
        ry="20"
        fill="rgba(0,0,0,.08)"
      />

      {/* LEFT POST */}

      <g filter="url(#shadow)">

        <rect
          x="285"
          y="145"
          width="30"
          height="350"
          rx="6"
          fill="url(#wood)"
        />

        <path
          d="M294 160 C302 230 301 300 293 470"
          stroke="#B9895C"
          strokeWidth="2"
          opacity=".35"
          fill="none"
        />

        <path
          d="M307 180 C311 270 308 360 303 470"
          stroke="#5D3C23"
          strokeWidth="1.5"
          opacity=".4"
          fill="none"
        />

      </g>

      {/* RIGHT POST */}

      <g filter="url(#shadow)">

        <rect
          x="485"
          y="145"
          width="30"
          height="350"
          rx="6"
          fill="url(#wood)"
        />

        <path
          d="M494 160 C502 240 501 330 494 470"
          stroke="#B9895C"
          strokeWidth="2"
          opacity=".35"
          fill="none"
        />

        <path
          d="M507 185 C512 270 509 360 503 470"
          stroke="#5D3C23"
          strokeWidth="1.5"
          opacity=".4"
          fill="none"
        />

      </g>

      {/* TOP */}

      <rect
        x="265"
        y="120"
        width="270"
        height="32"
        rx="8"
        fill="url(#wood)"
      />

      {/* BOLTS */}

      {[280,340,460,520].map((x)=>(
        <g key={x}>
          <circle cx={x} cy={136} r="6" fill="#CFCFCF"/>
          <circle cx={x} cy={136} r="2" fill="#8F8F8F"/>
        </g>
      ))}

      {/* Blade */}

      <g id="blade">

        <rect
          x="338"
          y="150"
          width="124"
          height="18"
          rx="3"
          fill="#8D8D8D"
        />

        <polygon
          points="340,168 460,168 400,255"
          fill="url(#metal)"
          stroke="#8A8A8A"
          strokeWidth="2"
        />

        <line
          x1="400"
          y1="170"
          x2="400"
          y2="245"
          stroke="white"
          opacity=".55"
        />

      </g>

      {/* BASE */}

      <rect
        x="235"
        y="500"
        width="330"
        height="28"
        rx="6"
        fill="#68462B"
      />

      {/* Brass Plate */}

      <rect
        x="366"
        y="507"
        width="68"
        height="12"
        rx="2"
        fill="#D4AF6A"
      />

      {/* BOOK */}

      <g filter="url(#shadow)">

        <path
          d="
          M285 455
          Q345 430 395 455
          L395 545
          Q340 520 285 545
          Z"
          fill="#5A3B24"
        />

        <path
          d="
          M405 455
          Q455 430 515 455
          L515 545
          Q460 520 405 545
          Z"
          fill="#5A3B24"
        />

        <path
          d="
          M292 462
          Q345 445 392 462
          L392 535
          Q345 518 292 535
          Z"
          fill="#FFFDF7"
        />

        <path
          d="
          M408 462
          Q455 445 508 462
          L508 535
          Q455 518 408 535
          Z"
          fill="#FFFDF7"
        />

        <path
          d="
          M400 456
          Q394 500 400 545"
          stroke="#D7C8AA"
          strokeWidth="2"
          fill="none"
        />

      </g>

      {/* FEATHER */}

      <g transform="translate(555 420) rotate(18)">

        <path
          d="
          M0 0
          C25 -35 40 -55 65 -95
          C85 -120 110 -135 120 -112
          C126 -92 106 -72 92 -55
          C65 -20 40 5 5 15
          "
          fill="#F3F3F3"
          stroke="#C7C7C7"
          strokeWidth="2"
        />

        <path
          d="
          M5 15
          L120 -112"
          stroke="#B3B3B3"
          strokeWidth="2"
        />

      </g>

      {/* Flying Papers */}

      <g opacity=".75">

        <rect
          x="225"
          y="205"
          width="34"
          height="42"
          rx="2"
          fill="#FFFDF8"
          transform="rotate(-20 225 205)"
        />

        <rect
          x="560"
          y="250"
          width="30"
          height="38"
          rx="2"
          fill="#FFFDF8"
          transform="rotate(18 560 250)"
        />

        <rect
          x="205"
          y="330"
          width="28"
          height="36"
          rx="2"
          fill="#FFFDF8"
          transform="rotate(14 205 330)"
        />

      </g>

    </svg>
  );
}