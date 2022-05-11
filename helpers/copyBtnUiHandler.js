const copyBtnUiHandler = (ref, value) => {
    try {
        const copyBtn = ref.current
        navigator.clipboard.writeText(value)
        copyBtn.innerText = 'Copied'
        copyBtn.style.color = '#04AA6D'
        copyBtn.style.opacity = 1
        setTimeout(() => {
            copyBtn.innerText = 'Copy'
            copyBtn.style.color = 'white'
            copyBtn.style.opacity = 0.5
        }, 1500);
    } catch (error) {
        const copyBtn = ref.current
        navigator.clipboard.writeText('Error')
        copyBtn.innerText = 'Error'
        copyBtn.style.color = 'red'
        copyBtn.style.opacity = 1
    }
}

export default copyBtnUiHandler