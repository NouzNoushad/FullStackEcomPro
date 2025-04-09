interface SidebarButtonProps {
    label: string
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    isSelectedLink: boolean
}


export default function SidebarButton(
    { label, onButtonClick, isSelectedLink }: SidebarButtonProps
) {
    return (
        <button onClick={onButtonClick} className={`nav-link group ${isSelectedLink ? "bg-primary-light" : "bg-transparent"}`}>
            <span className={`block w-1 h-1 transition-colors duration-200 group-hover:bg-white rounded-full ${isSelectedLink ? "bg-white" : "bg-gray-400"}`}></span>
            <span className={`text-[13.5px] font-normal transition-colors duration-200 group-hover:text-white ${isSelectedLink ? "text-white" : "text-gray-400"}`}>{label}</span>
        </button>
    )
}