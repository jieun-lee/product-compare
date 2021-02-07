import React, { useState, useMemo } from 'react';
import FileBase from 'react-file-base64';
import { Input, Image, Button } from 'semantic-ui-react';
import FormLabel from '../text/formLabel';

const URL_MAX_LENGTH = 200;

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
                <FormLabel>Choose Image</FormLabel>
                <Button.Group size="mini" style={{ marginBottom: '6px' }}>
                    <Button
                        style={{ padding: '4px 12px' }}
                        primary={showFilePicker}
                        onClick={() => setShowFilePicker(true)}
                        type="button"
                    >
                        File
                    </Button>
                    <Button
                        style={{ padding: '4px 12px' }}
                        primary={!showFilePicker}
                        onClick={() => setShowFilePicker(false)}
                        type="button"
                    >
                        Link
                    </Button>
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
            {!!currentUrl?.length && (
                <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
                    <Image
                        verticalAlign="middle"
                        src={currentUrl}
                        size='small'
                        style={{ height: '100px', objectFit: 'scale-down' }}
                    />
                </div>
            )}
        </div>
    )
}

export default ImageSelector;