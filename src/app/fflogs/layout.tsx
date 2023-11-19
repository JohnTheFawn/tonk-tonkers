import styles from './layout.module.css'

export default function FFLogsLayout({
    children,
}: {
children: React.ReactNode
}) {
    return (
        <main className={`cardWrapper ${styles.background}`}>
            <select
            id={`zoneDropdown`}
            name={`zoneDropdown`}
            className={`zoneDropdown`}
            >
            <option value={54}>
                Anabaseios
            </option>
            <option value={49}>
                Abyssos
            </option>
            <option value={44}>
                Asphodelos
            </option>
            <option value={53}>
                The Omega Protocol
            </option>
            </select>
            {children}
        </main>
    )
}