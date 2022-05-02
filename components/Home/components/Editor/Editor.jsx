import styles from '../../../../styles/Home/components/Editor/Editor.module.scss'
import CodeMirrorEditor from './components/CodeMirrorEditor'
import OptionsEditor from './components/OptionsEditor';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';


const defaultCss = "body {\n  margin: 0;\n  width: 100%;\n  height: 100%;\n}\n\nh1 {\n  text-align: center;\n  color: #7A33EB;\n}"

const Editor = ({ htmlValue, setHtmlValue, setCssValue, setPageSizeValue, setFonts }) => {

    return (
        <div className={styles.Editor}>
            <div className={styles.Editor_options_container}>
                <OptionsEditor setPageSizeValue={setPageSizeValue} setFonts={setFonts} styles={styles} />
            </div>
            <div className={styles.Editor_editors_container}>
                <CodeMirrorEditor width={'54%'} value={htmlValue} setHtmlValue={setHtmlValue} borderRadius={'15px 0 0 15px'} langExtension={html()} lang='html' />
                <CodeMirrorEditor width={'44%'} value={defaultCss} setCssValue={setCssValue} borderRadius={'0 15px 15px 0'} langExtension={css()} lang='css' />
            </div>

        </div>
    )
}

export default Editor