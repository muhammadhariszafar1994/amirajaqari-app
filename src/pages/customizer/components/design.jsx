import React, { useEffect, useState, useRef } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Hammer from 'hammerjs';
import MugRight from './../../../assets/images/mug-right.png';

const Design = () => {
    const { editor, onReady } = useFabricJSEditor();
    const [hammer, setHammer] = useState(null);
    const uploadImageRef = useRef(null)

    useEffect(() => {        
        if(editor?.canvas?.upperCanvasEl) 
        {
            const hammer = new Hammer(editor.canvas.upperCanvasEl);
            setHammer(hammer);
            handleLoadProduct(MugRight);
        }
        
        return () => { if(editor?.canvas && hammer) hammer.destroy() }

    }, [editor?.canvas]);

    const handleLoadProduct = async (image) => {
        const width = 600
        const height = 600

        if(editor?.canvas) {
            new window.fabric.Image.fromURL(image, (img) => {
                img.scaleToWidth(width);
                img.scaleToHeight(height);
                img.set({ width: width, height: height });

                editor.canvas.add(img);
                editor.canvas.renderAll();
            });

            await editor.canvas.requestRenderAll();
        }


    }

    const handleLoadImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = () => {
                handleUploadObject(imgObj, event)
            }
        };
        reader.readAsDataURL(file);
    };

    const handleUploadObject = async (imgObj, event) => {
        const width = 420;
        const height = 420;
        const left = 10;
        const top = 100;

        const path = new window.fabric.Path("M78.42,346.81c0,0,117.97,46.5,284.18,0V54.31c0,0-124.27,48.24-284.18,0V346.81z", {
            left: 10,
            top: 80,
        });
         
        const pattern = new window.fabric.Pattern({
            source: imgObj,
            repeat: 'repeat'
        });

        path.scale(1.5);
        path.set({ fill: pattern });

        editor.canvas.add(path);
        imgObj.src = event.target.result;
    
        // new window.fabric.Image.fromURL(uploadedImg, (img) => {
        //     const scaleFactor = Math.min(width / img.width, height / img.height);
        //     img.scale(scaleFactor);
    
        //     const scaledWidth = img.width * scaleFactor;
        //     const scaledHeight = img.height * scaleFactor;

        //     img.set({
        //         left: left + (width - scaledWidth) / 2,
        //         top: top + (height - scaledHeight) / 2
        //     });

        //     editor.canvas.add(img);
        //     editor.canvas.renderAll();
        // });



        
    };

    
    return (
        <>
            <img ref={uploadImageRef} alt='' />

            <input type="file" onChange={handleLoadImage} accept="image/*" />
            <FabricJSCanvas onReady={onReady} />
        </>
    );
}

export default Design;