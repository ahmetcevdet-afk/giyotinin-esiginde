function Book() {
    return (
        <g>

            {/* Shadow */}

            <ellipse
                cx="350"
                cy="505"
                rx="105"
                ry="14"
                fill="rgba(0,0,0,.08)"
            />

            {/* Left Cover */}

            <path
                d="
                M250 455
                Q300 435 345 455
                L345 520
                Q300 500 250 520
                Z
                "
                fill="#5E4027"
            />

            {/* Right Cover */}

            <path
                d="
                M355 455
                Q400 435 450 455
                L450 520
                Q400 500 355 520
                Z
                "
                fill="#5E4027"
            />

            {/* Left Pages */}

            <path
                d="
                M255 458
                Q300 442 342 458
                L342 513
                Q300 497 255 513
                Z
                "
                fill="#FFFDF8"
            />

            {/* Right Pages */}

            <path
                d="
                M358 458
                Q400 442 445 458
                L445 513
                Q400 497 358 513
                Z
                "
                fill="#FFFDF8"
            />

            {/* Center Fold */}

            <path
                d="
                M350 454
                Q346 486 350 520
                "
                stroke="#D8CDB5"
                strokeWidth="2"
                fill="none"
            />

            {/* Left Page Lines */}

            <line
                x1="272"
                y1="470"
                x2="330"
                y2="462"
                stroke="#E8DFC7"
                strokeWidth="1"
            />

            <line
                x1="270"
                y1="482"
                x2="328"
                y2="474"
                stroke="#E8DFC7"
                strokeWidth="1"
            />

            <line
                x1="268"
                y1="494"
                x2="326"
                y2="486"
                stroke="#E8DFC7"
                strokeWidth="1"
            />

            {/* Right Page Lines */}

            <line
                x1="370"
                y1="462"
                x2="428"
                y2="470"
                stroke="#E8DFC7"
                strokeWidth="1"
            />

            <line
                x1="372"
                y1="474"
                x2="430"
                y2="482"
                stroke="#E8DFC7"
                strokeWidth="1"
            />

            <line
                x1="374"
                y1="486"
                x2="432"
                y2="494"
                stroke="#E8DFC7"
                strokeWidth="1"
            />

            {/* Gold Bookmark */}

            <rect
                x="347"
                y="454"
                width="6"
                height="48"
                rx="2"
                fill="#D6B264"
            />

        </g>
    );
}

export default Book;