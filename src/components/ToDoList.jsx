import { useState, useEffect } from "react";
import Button from "./Button";
import { FaPlus  } from  "react-icons/fa";
import { FaTrash } from  "react-icons/fa";
import { FaEdit } from  "react-icons/fa";
import { FaMoon } from  "react-icons/fa";
import { FaSun } from  "react-icons/fa";

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

    const [tasks, setTasks] = useState(()=> {
        const defaultTasks  = [
            {nama:"ngoding", id: 1},
            {nama: "ngonten",id:2},
            {nama:"makan", id: 3}
        ]

        const data = localStorage.getItem("tasks");
        if (!data) {
            return defaultTasks;
        }

        return JSON.parse(data);
    });


    useEffect(()=>{
        const data = JSON.stringify(tasks);
        localStorage.setItem("tasks", data);
    },[tasks]);  

    const [inputEdit, setInputEdit] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const hasilSearch = tasks.filter((task) =>{
        return task.nama.toLowerCase().includes(search.toLowerCase());
    })

    const [dark, setDark] = useState(() => {
    const theme = localStorage.getItem("theme");
        return theme === "dark";
    });
    
    useEffect(() => {
        console.log(dark);
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);
    return(
        <>
            <header className="bg-blue-500 text-white font-bold flex items-center justify-between fixed top-0 left-0 w-full p-4 dark:bg-blue-900">
                <h2>T0 DO LIST</h2>
                <button onClick={() => setDark(!dark)} className="text-lg dark:text-white w-10 h-10 hover:bg-slate-100/10 dark:hover:bg-white/10 rounded-full flex items-center justify-center transition-colors duration-500">
                    {dark ? <FaSun /> : <FaMoon />}
                </button>
            </header>

            <main className="pt-28 min-h-screen dark:bg-neutral-950">
                <input 
                    type="search" 
                    className="w-full flex  border border-gray-400  rounded-md p-2 focus:border-blue-500 focus:outline-none dark:bg-neutral-900  dark:border-neutral-800 dark:focus:border-blue-900 dark:placeholder:text-neutral-500 dark:text-white"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    placeholder="Masukkan pencarian"
                />
            <div className="flex gap-2 mb-6 mt-6">
                <input
                    className="flex-1 border border-gray-400 rounded-md p-2 focus:border-blue-500 focus:outline-none dark:bg-neutral-900  dark:border-neutral-800 dark:focus:border-blue-900 dark:placeholder:text-neutral-500 dark:text-white"
                    type="text"
                    value={input} 
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder="Masukkan hobi"
                />
                <Button variant="primary" onClick={tambahTugas}>
                    <FaPlus /> Tambah
                </Button>
            </div>
            <article className="space-y-3 dark:bg-neutral-950">
                {hasilSearch.map((task) => (
                    <div
                        key={task.id}
                        className="flex justify-between items-center bg-white rounded-lg shadow p-4 dark:bg-neutral-900 dark:text-white"
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
                    <div className="bg-white rounded-xl p-6 w-120 dark:bg-neutral-900    dark:text-white">
                        <h2 className="text-xl font-bold mb-4">
                            Edit Hobi
                        </h2>

                        <input
                            className="w-full border border-gray-400 rounded-md p-2 mb-6 focus:border-blue-500 focus:outline-none dark:bg-neutral-900  dark:border-neutral-800 dark:focus:border-blue-900 dark:placeholder:text-neutral-500"
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
            </main>
        </>
    )
}
export default ToDoList