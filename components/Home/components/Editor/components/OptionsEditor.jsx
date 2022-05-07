import { useCallback, useState, useEffect } from 'react';
import { debouncer } from '../../../../../helpers/debouncer';

const pageSizes = ["4A0", "2A0", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "RA0", "RA1", "RA2", "RA3", "RA4", "SRA0", "SRA1", "SRA2", "SRA3", "SRA4", "EXECUTIVE", "FOLIO", "LEGAL", "LETTER", "TABLOID", "ID1"]

const OptionsEditor = ({ pageSizeValue, setPageSizeValue, setFonts, styles }) => {
    const [fontsStatus, setFontsStatus] = useState(null)
    const [fontExample, setFontExample] = useState(null)
    const [googleFontUrl, setGoogleFontUrl] = useState('')

    //// Get google fonts 
    const getGoogleFonts = async (value) => {
        if (value.length > 0) {
            try {
                const res = await fetch('/api/fonts', { method: 'POST', body: value })
                const data = await res.json();
                setFonts(data)
                localStorage.setItem('googleFonts', JSON.stringify(data))
                localStorage.setItem('googleFontUrl', value)
                setFontsStatus({ st: 200 })
                console.clear()
            } catch (error) {
                setFontsStatus({ st: 400 })
                console.clear()
            }
        } else {
            setFontsStatus(null)
        }
    }

    // google font url input debouncer
    const debouncedGoogleFontsOnChange = useCallback(debouncer(getGoogleFonts, 300), []);


    // google font url default input value
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localStorageGoogleFontUrl = localStorage.getItem('googleFontUrl')
            if (localStorageGoogleFontUrl) setGoogleFontUrl(localStorageGoogleFontUrl)
        }
    })


    // google fonts example helper
    const fontExampleOnMouseEnter = () => {
        setFontExample(true)
    }

    const fontExampleOnMouseLeave = () => {
        setTimeout(() => {
            setFontExample(null)
        }, 120);
    }

    return (
        <>
            <div className={styles.Editor_options_page}>
                <label>Page Size</label>
                <select onChange={(e) => { setPageSizeValue(e.target.value); localStorage.setItem('pageSize', e.target.value) }} value={pageSizeValue}>
                    {pageSizes.map(size => {
                        return <option key={size} value={size} >{size}</option>
                    })}
                </select>
            </div>
            <div className={styles.Editor_options_google_font}>
                <label>Google Font URL</label>
                <input type="text" defaultValue={googleFontUrl} onChange={(e) => { debouncedGoogleFontsOnChange(e.target.value) }} style={fontsStatus && fontsStatus.st === 200 ? { border: '2px solid green' } : fontsStatus && fontsStatus.st === 400 && { border: '2px solid red' }} />
                <span onMouseEnter={fontExampleOnMouseEnter} onMouseLeave={fontExampleOnMouseLeave} className={styles.Editor_options_google_font_help}>
                    ?
                    {fontExample && <span className={styles.Editor_options_google_font_help_msg}>Copy the url from Google Fonts. <br /> Example: https://fonts.googleapis.com/css2?family=Roboto&display=swap <br />If accepted, border should turn green.</span>}
                </span>

            </div>
        </>
    )
}

export default OptionsEditor