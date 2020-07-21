import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react'

const DropzoneInput = ({setFiles, acceptedFile}) => {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
            file : file
        })));
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: acceptedFile
    })
    return (
        <div {...getRootProps()} className={'dropzone ' + (isDragActive && 'dropzone--isActive')} >
            <input {...getInputProps()} />
            <Icon name="upload" size='huge' /> 
            <Header content={`Drop ${acceptedFile} here`}/>
        </div>
    )
}

export default DropzoneInput