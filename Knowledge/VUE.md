# 如何操作iframe
```ts
const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
        input !== null && input.tagName === 'IFRAME';
    const hideDialog = () => {
        let frame = document.querySelector("iframe");
        if (isIFrame(frame) && frame.contentWindow) {
            // frame.contentWindow.postMessage({}, '*');
            const dm = frame.contentWindow.document.querySelector<HTMLElement>(".MuiDialog-root");
            if (dm) {
                dm.style.display = "none";
            }
        }
    }
```
