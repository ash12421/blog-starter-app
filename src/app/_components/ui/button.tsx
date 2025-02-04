"use client"

export default function Button({onClick}:{onClick: (e: React.MouseEvent) => void}) {
    return (
        <button onClick={onClick}></button>
    )
}