// Dynasty Data Journal Dataset (Fully Synced with Excel Prospect Database)
const dataset = {
    alltime: {
        headers: ["Year", "Name", "College", "Team", "Pos", "Score", "Prospect Grade", "Rookie KTC", "Yr 1 PPG", "Yr 2 PPG", "Yr 3 PPG"],
        rows: [
            ["2019", "Kyler Murray", "Oklahoma Sooners", "Arizona Cardinals", "QB", "98.21", "Gen. Talent", "8660", "17.69", "23.81", "20.86"],
            ["2018", "Saquon Barkley", "Penn St. Lions", "New York Giants", "RB", "97.34", "Gen. Talent", "-", "25.13", "19.85", "INJ"],
            ["2025", "Ashton Jeanty", "Boise St. Mustangs", "Las Vegas Raiders", "RB", "97.10", "Gen. Talent", "7600", "14.60", "TBD", "TBD"],
            ["2026", "Jeremiyah Love", "Notre Dame Irish", "Arizona Cardinals", "RB", "96.86", "Gen. Talent", "-", "TBD", "TBD", "TBD"],
            ["2022", "Drake London", "USC Trojans", "Atlanta Falcons", "WR", "95.98", "Gen. Talent", "5361", "9.76", "10.25", "15.55"],
            ["2022", "Breece Hall", "Iowa St. Cyclones", "New York Jets", "RB", "95.83", "Gen. Talent", "6259", "16.40", "17.20", "19.10"],
            ["2022", "Garrett Wilson", "Ohio St Buckeyes", "New York Jets", "WR", "95.42", "Gen. Talent", "5980", "11.80", "13.40", "16.20"],
            ["2020", "Justin Herbert", "Oregon Ducks", "Los Angeles Chargers", "QB", "70.88", "Early 2", "-", "19.20", "22.40", "18.10"],
            ["2021", "Mac Jones", "Alabama Tide", "New England Patriots", "QB", "93.49", "Gen. Talent", "-", "14.20", "9.80", "TBD"],
            ["2024", "Jayden Daniels", "LSU Tigers", "Washington Commanders", "QB", "50.46", "Late 2", "8324", "20.80", "TBD", "TBD"],
            ["2024", "Malik Nabers", "LSU Tigers", "New York Giants", "WR", "8.06", "4th", "7522", "15.40", "TBD", "TBD"],
            ["2024", "Caleb Williams", "USC Trojans", "Chicago Bears", "QB", "14.17", "4th", "7000", "16.20", "TBD", "TBD"],
            ["2023", "Anthony Richardson", "Florida Gators", "Indianapolis Colts", "QB", "88.55", "Early 1st", "6150", "13.20", "16.50", "TBD"],
            ["2023", "Bryce Young", "Alabama Tide", "Carolina Panthers", "QB", "76.93", "Late 1", "5850", "10.10", "13.40", "TBD"],
            ["2022", "Kenneth Walker IV", "Michigan St. Spartans", "Seattle Seahawks", "RB", "47.45", "Mid 3", "6021", "14.10", "13.80", "15.20"],
            ["2025", "Omarion Hampton", "UNC Tar Heels", "--", "RB", "93.97", "Gen. Talent", "--", "TBD", "TBD", "TBD"],
            ["2025", "Travis Hunter", "Colorado Buffaloes", "--", "WR", "91.80", "Gen. Talent", "--", "TBD", "TBD", "TBD"],
            ["2026", "Jordyn Tyson", "Arizona St Sun Devils", "New Orleans Saints", "WR", "91.73", "Gen. Talent", "--", "TBD", "TBD", "TBD"]
        ]
    },
    bigboard2025: {
        headers: ["Pick", "Name", "College", "ADP", "Pos", "Score", "Grade"],
        rows: [
            ["1.01", "Ashton Jeanty", "Boise St. Mustangs", "1", "RB", "97.30", "Gen. Talent"],
            ["1.02", "Omarion Hampton", "UNC Tar Heels", "8", "RB", "93.97", "Gen. Talent"],
            ["1.03", "Travis Hunter", "Colorado Buffaloes", "4", "WR", "91.80", "Gen. Talent"],
            ["1.04", "Cam Ward", "Miami Hurricanes", "2", "QB", "86.58", "Early 1st"],
            ["1.05", "Tetairoa McMillan", "Arizona Wildcats", "3", "WR", "85.20", "Gen. Talent"],
            ["1.06", "Tyler Warren", "Penn St. Nittany Lions", "12", "TE", "84.10", "Mid 1st"],
            ["1.07", "Quinshon Judkins", "Ohio St Buckeyes", "10", "RB", "83.90", "Late 1"]
        ]
    },
    bigboard2024: {
        headers: ["Pick", "Name", "College", "ADP", "Pos", "Score", "Grade"],
        rows: [
            ["1.01", "Jayden Daniels", "LSU Tigers", "3", "QB", "50.46", "Late 2"],
            ["1.02", "Malik Nabers", "LSU Tigers", "3", "WR", "8.06", "4th"],
            ["1.03", "Caleb Williams", "USC Trojans", "1", "QB", "14.17", "4th"],
            ["1.04", "Marvin Harrison Jr.", "Ohio St Buckeyes", "2", "WR", "10.52", "4th"]
        ]
    }
};

let currentActiveTab = 'alltime';

function renderTable(tabKey) {
    currentActiveTab = tabKey;
    const data = dataset[tabKey];
    const headerRow = document.getElementById('tableHeaders');
    const tableBody = document.getElementById('tableBody');

    headerRow.innerHTML = data.headers.map(h => `<th>${h}</th>`).join('');

    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const posFilter = document.getElementById('posFilter').value;

    const filteredRows = data.rows.filter(row => {
        const matchesSearch = row.some(cell => String(cell).toLowerCase().includes(searchTerm));
        const matchesPos = posFilter === 'ALL' || row.includes(posFilter);
        return matchesSearch && matchesPos;
    });

    tableBody.innerHTML = filteredRows.map(row => {
        return `<tr>` + row.map((cell) => {
            let cellClass = '';
            const num = parseFloat(cell);
            if (!isNaN(num)) {
                if (num > 18 || num > 95 || cell === "1.01") cellClass = 'cell-elite';
                else if (num > 13 || num > 85) cellClass = 'cell-mid';
                else if (num < 10 && num > 0) cellClass = 'cell-low';
            }
            return `<td class="${cellClass}">${cell}</td>`;
        }).join('') + `</tr>`;
    }).join('');

    document.getElementById('statTotal').textContent = filteredRows.length;
    document.getElementById('statPpg').textContent = tabKey === 'alltime' ? '16.4 PPG' : '15.2 PPG';
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderTable(e.target.dataset.tab);
    });
});

document.getElementById('searchInput').addEventListener('input', () => renderTable(currentActiveTab));
document.getElementById('posFilter').addEventListener('change', () => renderTable(currentActiveTab));

window.addEventListener('DOMContentLoaded', () => {
    renderTable('alltime');
});
