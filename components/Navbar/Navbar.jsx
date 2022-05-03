import styles from '../../styles/Navbar/Navbar.module.scss'
import Link from 'next/link'
const Navbar = () => {
    return (
        <div className={styles.Navbar}>
            <div className={styles.Navbar_logo}>
                CodePDF
            </div>

            <div className={styles.Navbar_menu}>
                <div className={styles.Navbar_menu_element}>
                    <Link href="https://rapidapi.com/ChipiBarijho/api/codepdf">
                        <a>RapidAPI</a>
                    </Link>
                </div>

                <div className={styles.Navbar_menu_element} style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>
                    <Link href="https://rapidapi.com/ChipiBarijho/api/codepdf">
                        <a>Docs</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar