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
                    <Link href="/docs/api">
                        <a>RapidAPI</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar