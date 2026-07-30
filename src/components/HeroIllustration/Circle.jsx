function Circle() {
    return (
        <>
            <defs>

                <radialGradient id="heroGradient">

                    <stop
                        offset="0%"
                        stopColor="#FFF8D8"
                    />

                    <stop
                        offset="100%"
                        stopColor="#F0DFA5"
                    />

                </radialGradient>

                <filter
                    id="circleShadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >

                    <feDropShadow
                        dx="0"
                        dy="18"
                        stdDeviation="18"
                        floodOpacity=".12"
                    />

                </filter>

            </defs>

            <circle
                cx="350"
                cy="330"
                r="250"
                fill="url(#heroGradient)"
                filter="url(#circleShadow)"
            />

        </>
    );
}

export default Circle;