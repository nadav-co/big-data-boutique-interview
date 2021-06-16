import { useSelector } from "react-redux"
import { ManagerEdit } from "../cmps/ManagerEdit"
import { RootState } from "../interfaces/state"
import { utils } from "../services/utils"


export function Manager() {
    const { managers } = useSelector((state: RootState) => state.managerModule)

    return (
        <main className="manager-page">
            <h1>managers</h1>
            <section className="managers-container flex col center">

                {managers.map(manager => (
                    <ManagerEdit key={utils.makeId()} manager={manager} />
                ))}
                <ManagerEdit key={utils.makeId()} manager={{ fullname: '' }} />
            </section>
        </main>
    )
}