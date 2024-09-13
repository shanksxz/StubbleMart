export default function Button({
    className,
    children,
} : {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <button className={`p-2 rounded ${className}`}>
            {children}
        </button>
    )
}