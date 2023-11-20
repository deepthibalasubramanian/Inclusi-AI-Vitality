"use client"

export const Loading = () => {
    return (

        <svg style={{
            width: 100,
            height: 100,
            display: "inline-block",
            marginLeft: 20
        }}
            className="flex items-center justify-center"
            version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 100 20" enable-background="new 0 0 0 0" xmlSpace="preserve">
            <circle fill="#000" stroke="none" cx="6" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.1" />
            </circle>
            <circle fill="#000" stroke="none" cx="26" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.2" />
            </circle>
            <circle fill="#000" stroke="none" cx="46" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.3" />
            </circle>
        </svg>
    )
}

export const LoadingCircle = () => {
    return (
        <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 100 100" enable-background="new 0 0 0 0" xmlSpace="preserve">
            <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="1s"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite" />
            </path>
        </svg>
    )
}