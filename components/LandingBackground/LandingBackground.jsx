import styles from '../../styles/LandingBackground/LandingBackground.module.scss'

const colors = ['#A5D5D5', '#E96C79', '#F8B195', '#BF50F3', '#7A33EB']
const randColorIndex = () => {
    return Math.floor(Math.random() * (colors.length - 0) + 0)
}


const LandingBackground = () => {

    return (
        <div className={styles.LandingBackground}>
            <div className={styles.LandingBackground_backdrop}></div>
            <div className={styles.LandingBackground_drop} style={{ top: '0', right: '0', transform: 'translate(50%, -50%)', backgroundColor: colors[randColorIndex()] }}></div>
            <div className={styles.LandingBackground_drop} style={{ bottom: '0', left: '0', transform: 'translate(-50%, 50%)', backgroundColor: colors[randColorIndex()] }}></div>
            <div className={styles.LandingBackground_drop} style={{ bottom: '50%', left: '20%', transform: 'translate(0, 50%)', backgroundColor: colors[randColorIndex()], borderRadius: '25%', width: '100px' }}></div>
            <div className={styles.LandingBackground_drop} style={{ bottom: '50%', left: '30%', backgroundColor: colors[randColorIndex()], borderRadius: '25%', height: '220px', width: '120px' }}></div>
            <div className={styles.LandingBackground_drop} style={{ bottom: '50%', right: '20%', transform: 'translate(0, 100%)', backgroundColor: colors[randColorIndex()], borderRadius: '25%', width: '100px' }}></div>
            <div className={styles.LandingBackground_drop} style={{ bottom: '0', right: '30%', backgroundColor: colors[randColorIndex()], borderRadius: '25%', height: '220px', width: '120px' }}></div>
        </div>
    )
}

export default LandingBackground