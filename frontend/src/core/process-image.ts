import Compressor from "compressorjs"

export const compressImage = async (image: File) => {
    return new Promise((res, rej) => {
        new Compressor(image, {
            quality: 0.8,
            success: (compressedImage) => {
                res(compressedImage)
            },
            error: (error) => {
                rej(error)
            }
        })
    })
}

export const convertToBase64 = async (image: File) => {
    return new Promise((res) => {
        const fr = new FileReader()
        const imageName = image.name
        fr.readAsDataURL(image)
        fr.addEventListener('load', (e) => {
            res(`${e.target?.result},${imageName}`)
        })
    })
}

export const transformImageListToBase64 = async (image: File) => {

    if (image.size > 1000000) 
        image = await compressImage(image) as File
    
    return await convertToBase64(image) as string

}

export const transform = (imageList: FileList, cb: (base64ImgeList: string[]) => void) => {
    Promise.all(Array.from(imageList).map((image) => (transformImageListToBase64(image))))
        .then((base64List) => {
            cb(base64List)
        })
}

export default transform