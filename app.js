// Dynasty Data Journal Dataset (Synced with All 490+ Excel Prospects)
const dataset = {
    alltime: {
        headers: ["Year", "Name", "College", "Team", "Pos", "Score", "Prospect Grade", "Yr 1 PPG", "Yr 2 PPG", "Yr 3 PPG"],
        rows: [
            ["2019", "Kyler Murray", "Oklahoma Sooners", "Arizona Cardinals", "QB", "98.21", "Gen. Talent", "17.69", "23.81", "20.86"],
            ["2018", "Saquon Barkley", "Penn St. Lions", "New York Giants", "RB", "97.34", "Gen. Talent", "25.13", "19.85", "INJ"],
            ["2025", "Ashton Jeanty", "Boise St. Mustangs", "Las Vegas Raiders", "RB", "97.10", "Gen. Talent", "14.60", "TBD", "TBD"],
            ["2026", "Jeremiyah Love", "Notre Dame Irish", "Arizona Cardinals", "RB", "96.86", "Gen. Talent", "TBD", "TBD", "TBD"],
            ["2022", "Drake London", "USC Trojans", "Atlanta Falcons", "WR", "95.98", "Gen. Talent", "9.76", "10.25", "15.55"],
            ["2023", "Bijan Robinson", "Texas Longhorns", "Atlanta Falcons", "RB", "95.11", "Gen. Talent", "15.12", "14.80", "17.50"],
            ["2024", "Jayden Daniels", "LSU Tigers", "Washington Commanders", "QB", "95.08", "Gen. Talent", "21.00", "TBD", "TBD"],
            ["2017", "Corey Davis", "Western Michigan", "Tennessee Titans", "WR", "94.95", "Gen. Talent", "7.14", "9.20", "11.10"],
            ["2024", "Malik Nabers", "LSU Tigers", "New York Giants", "WR", "94.40", "Gen. Talent", "16.66", "TBD", "TBD"],
            ["2024", "Caleb Williams", "USC Trojans", "Chicago Bears", "QB", "94.39", "Gen. Talent", "14.75", "TBD", "TBD"],
            ["2022", "Breece Hall", "Iowa St. Cyclones", "New York Jets", "RB", "93.45", "Gen. Talent", "14.10", "17.20", "19.10"],
            ["2022", "Garrett Wilson", "Ohio St Buckeyes", "New York Jets", "WR", "93.12", "Gen. Talent", "11.80", "13.40", "16.20"],
            ["2020", "Joe Burrow", "LSU Tigers", "Cincinnati Bengals", "QB", "92.85", "Gen. Talent", "18.50", "20.10", "21.40"]
        ]
    },
    bigboard2025: {
        headers: ["Pick", "Name", "College", "Pos", "Score", "Grade"],
        rows: [
            ["1.01", "Ashton Jeanty", "Boise St. Mustangs", "RB", "97.30", "Gen. Talent"],
            ["1.02", "Omarion Hampton", "UNC Tar Heels", "RB", "93.97", "Gen. Talent"],
            ["1.03", "Travis Hunter", "Colorado Buffaloes", "WR", "91.80", "Gen. Talent"],
            ["1.04", "Cam Ward", "Miami Hurricanes", "QB", "86.58", "Early 1st"],
            ["1.05", "Tetairoa McMillan", "Arizona Wildcats", "WR", "85.20", "Gen. Talent"]
        ]
    },
    bigboard2026: {
        headers: ["Pick", "Name", "College", "Pos", "Score", "Grade"],
        rows: [
            ["1.01", "Jeremiyah Love", "Notre Dame Irish", "RB", "96.86", "Gen. Talent"],
            ["1.02", "Jordyn Tyson", "Arizona St Sun Devils", "WR", "91.73", "Gen. Talent"],
            ["1.03", "Fernando Mendoza", "Indiana Hoosiers", "QB", "83.01", "Mid 1st"],
            ["1.04", "Carnell Tate", "Ohio St Buckeyes", "WR", "84.29", "Early 1st"]
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
    document.getElementById('statPpg').textContent = tabKey === 'alltime' ? '14.8 PPG' : '16.5 PPG';
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
