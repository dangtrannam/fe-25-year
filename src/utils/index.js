
export function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

export function isShareable() {
    return !!navigator.share;
}

export function dataUrlToFile(dataUrl, fileName) {
    const binary = atob(dataUrl.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    const byteArray = new Uint8Array(array);
    return new File([byteArray], fileName, {
        type: "image/png"
    });
}

export function convertToFileList(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
}

export async function shareImage(files) {
    try {
        await navigator.share({
            files: files,
            title: "FE 25 năm",
            text: ""
        });
        console.log("Successfully shared");
    } catch (error) {
        console.log("Error sharing:", error);
    }
}