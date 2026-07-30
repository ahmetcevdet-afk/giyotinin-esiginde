function Guillotine() {
    return (
        <g>

            {/* LEFT POST */}

            <rect
                x="255"
                y="165"
                width="22"
                height="305"
                rx="6"
                fill="#7A5A39"
            />

            <path
                d="M262 175
                   C266 220 266 270 260 320
                   C256 360 258 410 265 455"
                stroke="#9A7750"
                strokeWidth="2"
                opacity=".45"
                fill="none"
            />

            <path
                d="M270 190
                   C274 250 274 310 268 440"
                stroke="#5C4128"
                strokeWidth="1.5"
                opacity=".35"
                fill="none"
            />

            {/* RIGHT POST */}

            <rect
                x="423"
                y="165"
                width="22"
                height="305"
                rx="6"
                fill="#7A5A39"
            />

            <path
                d="M430 180
                   C436 240 435 320 428 455"
                stroke="#9A7750"
                strokeWidth="2"
                opacity=".45"
                fill="none"
            />

            <path
                d="M438 195
                   C442 250 442 340 436 445"
                stroke="#5C4128"
                strokeWidth="1.5"
                opacity=".35"
                fill="none"
            />

            {/* TOP BEAM */}

            <rect
                x="240"
                y="145"
                width="220"
                height="24"
                rx="6"
                fill="#6B4A2E"
            />

            {/* BOLTS */}

            <circle cx="258" cy="157" r="4" fill="#C8C8C8"/>
            <circle cx="442" cy="157" r="4" fill="#C8C8C8"/>
            <circle cx="305" cy="157" r="4" fill="#B4B4B4"/>
            <circle cx="395" cy="157" r="4" fill="#B4B4B4"/>

            {/* BASE */}

            <rect
                x="205"
                y="470"
                width="290"
                height="26"
                rx="6"
                fill="#65472C"
            />

            {/* NAME PLATE */}

            <rect
                x="317"
                y="477"
                width="66"
                height="12"
                rx="2"
                fill="#D8B46A"
            />

        </g>
    );
}

export default Guillotine;