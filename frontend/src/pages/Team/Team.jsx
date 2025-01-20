// import React from 'react';
import './Team.css'; // Import the CSS file

const Team = () => {
    const teamMembers = [
        { id: 1, name: 'boja'},
        { id: 2, name: 'clim'},
        { id: 3, name: 'critoma'},
    ];

    return (
        <div className="team">
            <h1>Dream blunt rotation</h1>
            <div className="team-members">
                {teamMembers.map((member) => (
                    <div key={member.id} className="team-member">
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
