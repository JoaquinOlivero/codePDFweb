import { Document, Page, Font, usePDF } from '@react-pdf/renderer';
import { Document as DocumentViewer, Page as PageViewer } from 'react-pdf/dist/esm/entry.webpack5'
import Html from 'react-pdf-html'; // converts html into components used by ReactPDF
import { useEffect, useRef } from 'react';
import useWindowSize from '../../../../customHooks/useWindowSize';

const Pdf = ({ htmlValue, cssValue, pageSizeValue, fonts }) => {
    const pdfContainerRef = useRef(null)
    const size = useWindowSize();

    const Doc = (
        <Document>
            <Page size={pageSizeValue}>
                <Html stylesheet={cssValue}>{htmlValue}</Html>
            </Page>
        </Document>
    )

    const [instance, updateInstance] = usePDF({ document: Doc }); // react-pdf hook

    // update pdf when html or css change
    useEffect(() => {
        updateInstance()
    }, [htmlValue, cssValue, pageSizeValue])

    useEffect(() => {
        if (fonts) {
            fonts.forEach(font => { Font.register({ family: font.family, src: font.src, fontWeight: font.fontWeight, fontStyle: font.fontStyle }) });
            updateInstance()
        }
    }, [fonts])

    const loadingScreen = pdfContainerRef.current ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.5, color: 'black', backgroundColor: 'white', width: pdfContainerRef.current.clientWidth, height: pdfContainerRef.current.clientHeight, borderRadius: '5px' }}>
        <span style={{ fontSize: '20px', fontWeight: 500 }}>Loading...</span>
    </div>
        :
        'Ag'

    return (
        <div style={{ color: 'white' }} ref={pdfContainerRef}>
            {pdfContainerRef.current && <DocumentViewer file={instance.blob} loading={loadingScreen}>
                {size.width > 1300 ?
                    <PageViewer pageNumber={1} loading={loadingScreen} height={pdfContainerRef.current.clientHeight} />
                    :
                    <PageViewer pageNumber={1} loading={loadingScreen} height={pdfContainerRef.current.clientHeight} width={size.width * .80} />
                }


            </DocumentViewer>}
        </div>
    )
}

export default Pdf