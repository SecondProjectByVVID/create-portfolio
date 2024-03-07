import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { toast } from 'react-toastify';

export const MyFileUpload = ({ setCreate }) => {
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const onTemplateSelect = (e) => {
    // const tempImages = [];
    let _totalSize = totalSize;

    e.files.forEach((file) => {
      // tempImages.push({ image: new File([''], file.name, { type: file.type }) });

      _totalSize += file.size;
    });

    setCreate((prevState) => ({ ...prevState, uploaded_images: e.files }));
    setTotalSize(_totalSize);

    toast.success(`Select ${e.files.length} images`);
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : '0 B';

    return (
      <div
        className={className}
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          padding: '0.5em',
        }}
      >
        {chooseButton}
        {cancelButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 1 MB`}
          style={{
            width: '300px',
            height: '20px',
            marginLeft: 'auto',
            fontSize: '0.7em',
          }}
        ></ProgressBar>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: '40%' }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span
            className="flex flex-column text-left ml-3"
            style={{
              fontSize: '0.8em',
            }}
          >
            <abbr title={file.name}>{file.name.slice(0, 9) + '...'}</abbr>
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-1 py-1 ml-auto"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-4 "
          style={{
            fontSize: '4em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            border: '2px solid #ccc',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span
          style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
          className="my-5"
        >
          Добавьте фото для портфолио
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className:
      'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };

  return (
    <FileUpload
      ref={fileUploadRef}
      name="image"
      multiple
      accept="image/*"
      maxFileSize={1000000}
      onSelect={onTemplateSelect}
      onError={onTemplateClear}
      onClear={onTemplateClear}
      headerTemplate={headerTemplate}
      itemTemplate={itemTemplate}
      emptyTemplate={emptyTemplate}
      chooseOptions={chooseOptions}
      cancelOptions={cancelOptions}
      style={{
        backgroundColor: '#f0f0f0',
        border: '2px solid #ccc',
        borderRadius: '7px',
      }}
    />
  );
};

MyFileUpload.propTypes = {
  setCreate: PropTypes.func,
};
export default MyFileUpload;
