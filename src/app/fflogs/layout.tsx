import styles from './layout.module.css'

export default function FFLogsLayout({
    children,
}: {
children: React.ReactNode
}) {
    return (
        <main className={`cardWrapper ${styles.background}`}>
            {children}
        </main>
    )
}