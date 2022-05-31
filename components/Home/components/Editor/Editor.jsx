import styles from '../../../../styles/Home/components/Editor/Editor.module.scss'
import CodeMirrorEditor from './components/CodeMirrorEditor'
import OptionsEditor from './components/OptionsEditor';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';



const Editor = ({ htmlValue, setHtmlValue, setCssValue, pageSizeValue, setPageSizeValue, setFonts, editorCssValue, fonts, cssValue }) => {

    return (
        <div className={styles.Editor}>
            <div className={styles.Editor_options_container}>
                <OptionsEditor pageSizeValue={pageSizeValue} setPageSizeValue={setPageSizeValue} setFonts={setFonts} styles={styles} htmlValue={htmlValue} cssValue={cssValue} fonts={fonts} />
            </div>
            <div className={styles.Editor_editors_container}>
                <CodeMirrorEditor width={'54%'} value={htmlValue} setHtmlValue={setHtmlValue} langExtension={html()} lang='html' />
                <CodeMirrorEditor width={'44%'} value={editorCssValue} setCssValue={setCssValue} langExtension={css()} lang='css' />
            </div>

        </div>
    )
}

export default Editor