const req = {
    team_name: "Test Squad",
    faction: "RANGER",
    leader_name: "Leader Bob",
    leader_reg_no: "RA1234567890123",
    leader_email: "bob@example.com",
    leader_phone: "1234567890",
    leader_department: "CS",
    leader_year: "3",
    advisor_name: "Prof Smith",
    advisor_email: "smith@example.com",
    members: [
        {
            name: "Member Alice",
            regNo: "RA0987654321098",
            phone: "0987654321",
            email: "alice@example.com",
            department: "IT"
        }
    ]
};

fetch('http://localhost:3002/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req)
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
