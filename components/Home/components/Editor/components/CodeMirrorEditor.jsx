import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { oneDark } from '@codemirror/theme-one-dark';
import { useRef, useState, useEffect, useCallback } from 'react';
import styles from '../../../../../styles/Home/components/Editor/components/CodeMirrorEditor.module.scss'
import { transformCss } from '../../../../../helpers/transformCss';
import { debouncer } from '../../../../../helpers/debouncer';

const CodeMirrorEditor = ({ width, value, borderRadius, langExtension, lang, setCssValue, setHtmlValue }) => {
    const [height, setHeight] = useState(0)
    const editorContainer = useRef(null)

    useEffect(() => {
        setHeight(editorContainer.current.clientHeight)
    })

    const CodeMirrorOnChange = async (value) => {
        if (lang === 'html') {
            setHtmlValue(value)
            localStorage.setItem('htmlValue', value)
        } else if (lang === 'css') {
            try {
                localStorage.setItem('editorCssValue', value)
                const res = await fetch('/api/parse', { method: 'POST', body: value })
                const data = await res.json();

                const transformedCss = await transformCss(data)
                localStorage.setItem('cssValue', JSON.stringify(transformedCss))
                setCssValue(transformedCss)
                console.clear()
            } catch (error) {
                //
            }
        }
    }

    const debouncedCodeMirrorOnChange = useCallback(debouncer(CodeMirrorOnChange, 300), []);

    return (
        <div className={styles.CodeMirrorEditor} ref={editorContainer} style={{ width: width }}>
            <span className={styles.CodeMirrorEditor_lang}>{lang}</span>
            <CodeMirror
                value={value}
                height={`${height}px`}
                width='100%'
                extensions={[langExtension, EditorView.lineWrapping]}
                theme={oneDark}
                onChange={(value) => { debouncedCodeMirrorOnChange(value) }}
            />

        </div >
    )
}

export default CodeMirrorEditor