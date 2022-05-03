import styles from '../../styles/Home/Home.module.scss'
import Editor from './components/Editor/Editor'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'

// loading component for dynamic import
const loadingScreen = <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.5, color: 'black', backgroundColor: 'white', width: '75%', height: '100%', borderRadius: '5px' }}>
    <span style={{ fontSize: '20px', fontWeight: 500 }}>Loading...</span>
</div>

const Pdf = dynamic(
    () => import('./components/Pdf/Pdf'),
    { ssr: false, loading: () => loadingScreen }
)

const Home = () => {
    const [htmlValue, setHtmlValue] = useState('<body>\n  <section>\n    <h1>Hello World!</h1>\n  </section>\n</body>')
    const [cssValue, setCssValue] = useState({ body: { width: '100%', fontFamily: 'Helvetica' }, h1: { textAlign: 'center', color: "#7A33EB" } })
    const [editorCssValue, setEditorCssValue] = useState("body {\n  font-family: 'Helvetica';\n  margin: 0;\n  width: 100%;\n  height: 100%;\n}\n\nh1 {\n  text-align: center;\n  color: #7A33EB;\n}")
    const [pageSizeValue, setPageSizeValue] = useState('A4')
    const [fonts, setFonts] = useState(null)


    useEffect(() => {

        if (typeof window !== "undefined") {
            const html = localStorage.getItem('htmlValue');
            const css = localStorage.getItem('cssValue')
            const editorCss = localStorage.getItem('editorCssValue')
            if (html) setHtmlValue(html)
            if (css) setCssValue(JSON.parse(css))
            if (editorCss) setEditorCssValue(editorCss)
        }

    }, [])


    return (
        <div className={styles.Home}>
            <Navbar />
            <div className={styles.Home_content}>
                <h1>Preview your PDF</h1>
                <div className={styles.Home_content_main}>
                    <Editor htmlValue={htmlValue} cssValue={cssValue} setHtmlValue={setHtmlValue} setCssValue={setCssValue} editorCssValue={editorCssValue} setPageSizeValue={setPageSizeValue} setFonts={setFonts} />
                    <div className={styles.Home_content_pdf}>
                        <Pdf htmlValue={htmlValue} cssValue={cssValue} pageSizeValue={pageSizeValue} fonts={fonts} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home