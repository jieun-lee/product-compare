import React, { useState, useMemo } from 'react';
import FileBase from 'react-file-base64';
import { FormField, Input, Image, Button } from 'semantic-ui-react';
import { DEFAULT_IMAGE } from '../../util/const';

const URL_MAX_LENGTH = 50;

/**
 * Image Selector form where you can select a file or give an image url
 * @param {string} currentUrl the current url
 * @param {function} onUpdate called when the image url is updated
 */
const ImageSelector = (props) => {
    const { currentUrl, onUpdate } = props;
    const [showFilePicker, setShowFilePicker] = useState(true);

    const parsedUrl = useMemo(() => {
        if (currentUrl.length > URL_MAX_LENGTH) {
            return `${currentUrl.substring(0, URL_MAX_LENGTH)}...`;
        } else return currentUrl;
    }, [currentUrl]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ marginRight: '8px', width: '100%', flex: 1 }}>
                <FormField style={{ margin: 0 }}>
                    <label>Choose Image</label>
                </FormField>
                <Button.Group size="mini" style={{ marginBottom: '6px' }}>
                    <Button primary={showFilePicker} onClick={() => setShowFilePicker(true)}>File</Button>
                    <Button primary={!showFilePicker} onClick={() => setShowFilePicker(false)}>Link</Button>
                </Button.Group>
                <div>
                    {showFilePicker ? (
                        <FileBase
                            size="small"
                            type="file"
                            multiple={false}
                            onDone={({ base64: imageUrl }) => onUpdate(imageUrl)}
                        />
                    ) : (
                        <Input
                            placeholder="Image URL"
                            value={parsedUrl}
                            onChange={(e) => onUpdate(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    )}
                </div>
            </div>
            <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
                <Image
                    verticalAlign="middle"
                    src={currentUrl?.length ? currentUrl : DEFAULT_IMAGE}
                    size='small'
                    style={{ height: '100px', objectFit: 'scale-down' }}
                />
            </div>
        </div>
    )
}

export default ImageSelector;