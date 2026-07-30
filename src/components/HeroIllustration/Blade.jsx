function Blade({ progress = 0 }) {

    const translate = progress * 180;

    return (

        <g
            style={{
                transform: `translateY(${translate}px)`,
                transformOrigin: "350px 180px"
            }}
        >

            <defs>

                <linearGradient
                    id="blade"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >

                    <stop offset="0%" stopColor="#FAFAFA"/>

                    <stop offset="50%" stopColor="#D7D7D7"/>

                    <stop offset="100%" stopColor="#B7B7B7"/>

                </linearGradient>

            </defs>

            <rect
                x="287"
                y="160"
                width="126"
                height="18"
                rx="3"
                fill="#8F8F8F"
            />

            <polygon
                points="
                290,178
                410,178
                350,260
                "
                fill="url(#blade)"
                stroke="#8B8B8B"
                strokeWidth="2"
            />

            <line
                x1="350"
                y1="182"
                x2="350"
                y2="250"
                stroke="#FFFFFF"
                opacity=".45"
            />

        </g>

    );

}

export default Blade;