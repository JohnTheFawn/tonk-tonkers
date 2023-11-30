import styles from './page.module.css'
import Link from 'next/link';


const WORLDS = [
    "Adamantoise",
    "Aegis",
    "Alexander",
    "Alpha",
    "Anima",
    "Asura",
    "Atomos",
    "Bahamut",
    "Balmung",
    "Behemoth",
    "Belias",
    "Bismarck",
    "Brynhildr",
    "Cactuar",
    "Carbuncle",
    "Cerberus",
    "Chocobo",
    "Coeurl",
    "Diabolos",
    "Durandal",
    "Excalibur",
    "Exodus",
    "Faerie",
    "Famfrit",
    "Fenrir",
    "Garuda",
    "Gilgamesh",
    "Goblin",
    "Gungnir",
    "Hades",
    "Halicarnassus",
    "Hyperion",
    "Ifrit",
    "Ixion",
    "Jenova",
    "Kujata",
    "Lamia",
    "Leviathan",
    "Lich",
    "Louisoix",
    "Maduin",
    "Malboro",
    "Mandragora",
    "Marilith",
    "Masamune",
    "Mateus",
    "Midgardsormr",
    "Moogle",
    "Odin",
    "Omega",
    "Pandaemonium",
    "Phantom",
    "Phoenix",
    "Ragnarok",
    "Raiden",
    "Ramuh",
    "Ravana",
    "Ridill",
    "Sagittarius",
    "Sargatanas",
    "Sephirot",
    "Seraph",
    "Shinryu",
    "Shiva",
    "Siren",
    "Sophia",
    "Spriggan",
    "Tiamat",
    "Titan",
    "Tonberry",
    "Twintania",
    "Typhon",
    "Ultima",
    "Ultros",
    "Unicorn",
    "Valefor",
    "Yojimbo",
    "Zalera",
    "Zeromus",
    "Zodiark",
    "Zurvan"
];

export default function FFLogsPage() {
    
    return (
        <main className={`cardWrapper`}>
            <div className={`card textAlignCenter`}>
                {WORLDS.map(world => 
                    <div className={`${styles.worldCardLinkWrapper}`} key={world}>
                        <Link className={`cardLink ${styles.worldCardLink}`} href={`/fflogs/${world}`}>
                            {world}
                        </Link>
                    </div>
                )}
            </div>
        </main>
    )
}