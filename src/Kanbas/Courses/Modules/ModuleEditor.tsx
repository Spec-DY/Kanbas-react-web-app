import React, { useState } from 'react';

export default function ModuleEditor({
  dialogTitle,
  moduleName,
  setModuleName,
  addModule,
  onClose,
}: {
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(moduleName);

  const handleAddModule = () => {
    setModuleName(name);
    addModule();
    onClose();
  };

  return (
    <div id="wd-add-module-dialog" className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{dialogTitle}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Module Name"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleAddModule}>
              Add Module
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
