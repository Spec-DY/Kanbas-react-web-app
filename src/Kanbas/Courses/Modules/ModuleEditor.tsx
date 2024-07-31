import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModuleEditor({ dialogTitle, moduleName, setModuleName, addModule, showModal, setShowModal }:
    { dialogTitle: string; moduleName: string; setModuleName: (name: string) => void; addModule: () => void; showModal: boolean; setShowModal: (show: boolean) => void }) {

    const handleAddModule = () => {
        addModule();
        setShowModal(false);
    };

    return (
        <div className={`modal fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{dialogTitle}</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <input
                            className="form-control"
                            value={moduleName}
                            placeholder="Module Name"
                            onChange={(e) => setModuleName(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleAddModule}>Add Module</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
