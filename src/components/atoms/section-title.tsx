import React from 'react'

type SectionTitleProps = {
    title: string
}

export default function SectionTitle(props: SectionTitleProps) {
    return (
        <h2 className="text-center font-bold text-4xl my-4 py-2">{props.title}</h2>
    )
}
