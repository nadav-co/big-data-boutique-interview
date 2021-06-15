import { useState } from "react"
import { useDispatch } from "react-redux"
import { addManager, updateManager } from "../store/actions/managerActions"

export function ManagerEdit({ manager, saveManager }: any) {

    const name = manager.fullname
    const [fullname, setFullname] = useState(name)
    const dispatch = useDispatch()

    const onSaveManager = (ev: any) => {
        ev.preventDefault()
        dispatch(manager._id ? updateManager({ ...manager, fullname }) : addManager({ ...manager, fullname }))
    }
    return (
        <section className="manager-edit">
            <form onSubmit={onSaveManager}>
                <input type="text" value={fullname} onChange={({ target }) => setFullname(target.value)} placeholder="Add Manager" />

                {(fullname !== name) && <div className="buttons flex">
                    <button className="cancel nice-btn" type="button" onClick={() => setFullname(name)}>cancel</button>
                    <button className="nice-btn">Save</button>
                </div>}
            </form>
        </section>
    )
}