import React, { useState } from 'react';

const exampleBugs = [
    { id: 1, title: 'Bug 1', description: 'This is bug 1', status: 'Open' },
    { id: 2, title: 'Bug 2', description: 'This is bug 2', status: 'Closed' },
    { id: 3, title: 'Bug 3', description: 'This is bug 3', status: 'Open' },
];

const Bugs = () => {
    const [bugs, setBugs] = useState(exampleBugs);
    const [newBug, setNewBug] = useState({ title: '', description: '', status: 'Open' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBug({ ...newBug, [name]: value });
    };



    const handleStatusChange = (id, status) => {
        const updatedBugs = bugs.map((bug) =>
            bug.id === id ? { ...bug, status: status } : bug
        );
        setBugs(updatedBugs);
    };

    return (
        <div className="bugs">
            <h1>Bugs Tracker</h1>

           
            <div className="bug-list">
                {bugs.map((bug) => (
                    <div key={bug.id} className="bug-item">
                        <h3>{bug.title}</h3>
                        <p>{bug.description}</p>
                        <p>Status: {bug.status}</p>
                        <button onClick={() => handleStatusChange(bug.id, bug.status === 'Open' ? 'Closed' : 'Open')}>
                            {bug.status === 'Open' ? 'Close Bug' : 'Reopen Bug'}
                        </button>
                    </div>
                ))}
            </div>

        
            <div className="add-bug">
                <h2>Add New Bug</h2>
                <form onSubmit={handleAddBug}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={newBug.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={newBug.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select
                            name="status"
                            value={newBug.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <button type="submit">Add Bug</button>
                </form>
            </div>
        </div>
    );
};

export default Bugs;
