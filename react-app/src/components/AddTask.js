import { useState } from 'react';
import Swal from "sweetalert2";

const AddTask = ({ onSave }) => {
    const [text, setText] = useState('');
    const [sallery, setsallery] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text && !sallery) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your task and date or close the form!'
            })
        } else if (!text && sallery) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your task!'
            })
        } else if (text && !sallery) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your date!'
            })
        } else {
            onSave({ text, sallery });
        }

        setText('');
        setsallery('');
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Employee name</label>
                <input type="text" placeholder="employee name" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Sallery</label>
                <input type="number" placeholder="sallery" value={sallery} onChange={(e) => setsallery(e.target.value)} />
            </div>

            <input type="submit" className="btn btn-block" value="Save Data" />
        </form>
    )
}

export default AddTask
