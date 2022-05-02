import axios from "axios"

const cleanFontsString = (fonts) => {
    fonts = fonts.replace(/@font-face/g, '')
    fonts = fonts.replace(/;/g, '')
    fonts = fonts.replace(/:/g, '')
    return fonts
}

const fontsStringToArr = (string) => {
    const fonts = []
    var fontsArr = [],          
    rxp = /{([^}]+)}/g,
    str = string,
    mat;

    while( mat = rxp.exec( str ) ) {
          fontsArr.push(mat[1]);
    }

    fontsArr.forEach((arr) => {
        var myRegexp = /[^\s']+|'([^']*)'/gi; // Get all words of a string into array elements. Those words inside quotation marks are not separated into different elements inside the array.
        var myString = arr;
        var myArray = [];
        const result = {}
        do {
            //Each call to exec returns the next regex match as an array
            var match = myRegexp.exec(myString);
            if (match != null)
            {
                //Index 1 in the array is the captured group if it exists
                //Index 0 is the matched text, which we use if no captured group exists
                myArray.push(match[1] ? match[1] : match[0]);
            }
        } while (match != null);

        const familyIndex = myArray.indexOf('font-family') + 1
        const fontStyleIndex = myArray.indexOf('font-style') + 1
        const fontWeightIndex = myArray.indexOf('font-weight') + 1

        // get font url, which is inside parentheses
        const srcIndex = myArray.indexOf('src') + 1
        var srcExp = /\(([^)]+)\)/; // gets url inside parenthesis
        var srcMatches = srcExp.exec(myArray[srcIndex]);
        const fontSrc = [srcMatches[1].slice(0, 5), ':', srcMatches[1].slice(5)].join('') // add ":" after https

        result.family = myArray[familyIndex]
        result.src = fontSrc
        result.fontStyle = myArray[fontStyleIndex]
        result.fontWeight = myArray[fontWeightIndex]
        fonts.push(result)
    })

    return fonts
}

export async function getGoogleFonts (fonts) {
    try {
        const res = await axios.get(fonts)
        const data = res.data
        return fontsStringToArr(cleanFontsString(data))
    } catch (error) {
        // 
    }
}