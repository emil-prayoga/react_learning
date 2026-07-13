import { useState } from "react";
import Button from "./Button";
import { FaPlus  } from  "react-icons/fa";
import { FaTrash } from  "react-icons/fa";
import { FaEdit } from  "react-icons/fa";
import { FaMoon } from  "react-icons/fa";

function ToDoList() {
    function hapusTugas(id){
    const yakin = confirm('Yakin ingin menghapus?');
    if (yakin) {
        const hapus = tasks.filter((task) => task.id !== id);
        setTasks(hapus);
        }
    }

    function editTugas(id){
        const edit = tasks.find((task) => task.id === id);
        setSelectedId(id);
        setInputEdit(edit.nama);
        setShowModal(true);
        if (!edit) return;
    }

    function updateTugas() {
        const update = tasks.map((task) => {
        if (task.id === selectedId) {
            return {
            ...task,
            nama: inputEdit
            };
        }
        return(task)
        });
        setTasks(update);
        setShowModal(false);
        setInputEdit("");
        setSelectedId(null);
    }

    function batalEdit(){
        setShowModal(false);
    }

    function tambahTugas(){
    
    if (input.trim() === "") return;

    const inputBaru = {
        id: tasks.length + 1,
        nama:  input
    };

    setTasks([
        ...tasks, inputBaru
    ]);

    setInput("");

}
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([
        {nama:"ngoding", id: 1},
        {nama: "ngonten",id:2},
        {nama:"makan", id: 3}
    ]);
    const [inputEdit, setInputEdit] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    return(
        <>
            <header className="bg-blue-500 font-bold flex items-center justify-between fixed top-0 left-0 w-full p-4">
                <h2>T0 DO LIST</h2>
                <button>
                    <FaMoon/>
                </button>
            </header>
            <div className="pt-20 flex gap-2 mb-6">
                <input
                    className="flex-1 border border-gray-400 rounded-md p-2 focus:border-blue-500 focus:outline-none"
                    type="text"
                    value={input} 
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder="Masukkan hobi"
                />
                <Button variant="primary" onClick={tambahTugas}>
                    <FaPlus /> Tambah
                </Button>
            </div>
            <article className="space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="flex justify-between items-center bg-white rounded-lg shadow p-4"
                    >
                        <p className="font-medium">{task.nama}</p>
                        <div className="flex gap-2">
                            <Button variant="primary" onClick={() => editTugas(task.id)}>
                                <FaEdit /> Edit
                            </Button>
                            <Button variant="primary" onClick={() => hapusTugas(task.id)}>
                                <FaTrash /> Hapus
                            </Button>
                        </div>
                    </div>
                ))}
            </article>
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-white rounded-xl p-6 w-120">
                        <h2 className="text-xl font-bold mb-4">
                            Edit Hobi
                        </h2>

                        <input
                            className="w-full border border-gray-400 rounded-md p-2 mb-6 focus:border-blue-500 focus:outline-none"
                            type="text"
                            placeholder="Nama hobi"
                            value={inputEdit}
                            onChange={(e) => setInputEdit(e.target.value)}
                        />

                        <div className="flex justify-center gap-2">
                            <Button variant="secondary" onClick={batalEdit}>
                                Batalkan
                            </Button>

                            <Button variant="primary" onClick={() => updateTugas()}>
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ToDoList