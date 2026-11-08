// Dynasty Data Journal Dataset (Synced from Excel Workbook)
const dataset = {
    bigboard: {
        headers: ["Pick", "Name", "College", "Team", "ADP", "Pos", "Score", "Grade", "Yr 1 PPG", "Yr 2 PPG", "Yr 3 PPG"],
        rows: [
            // 2026 / 2025 Top Prospects & Big Boards
            ["1.01", "Jeremiyah Love", "Notre Dame Irish", "Arizona Cardinals", "--", "RB", "96.86", "Gen. Talent", "TBD", "TBD", "TBD"],
            ["1.02", "Jordyn Tyson", "Arizona St Sun Devils", "New Orleans Saints", "4", "WR", "91.73", "Gen. Talent", "TBD", "TBD", "TBD"],
            ["1.03", "Fernando Mendoza", "Indiana Hoosiers", "Las Vegas Raiders", "4", "QB", "83.01", "Mid 1st", "TBD", "TBD", "TBD"],
            ["1.01", "Ashton Jeanty", "Boise St. Mustangs", "Las Vegas Raiders", "1", "RB", "97.30", "Gen. Talent", "14.6", "TBD", "TBD"],
            ["1.02", "Omarion Hampton", "UNC Tar Heels", "--", "8", "RB", "93.97", "Gen. Talent", "TBD", "TBD", "TBD"],
            ["1.03", "Travis Hunter", "Colorado Buffaloes", "--", "4", "WR", "91.80", "Gen. Talent", "TBD", "TBD", "TBD"],
            // All-Time Top Producers
            ["--", "Kyler Murray", "Oklahoma Sooners", "Arizona Cardinals", "--", "QB", "98.21", "Gen. Talent", "17.69", "23.81", "20.86"],
            ["--", "Saquon Barkley", "Penn St. Lions", "New York Giants", "--", "RB", "97.34", "Gen. Talent", "25.13", "19.85", "INJ"],
            ["--", "Drake London", "USC Trojans", "Atlanta Falcons", "--", "WR", "95.98", "Gen. Talent", "9.76", "10.25", "15.55"],
            ["--", "Aidan Hutchinson", "Detroit Lions", "Detroit Lions", "--", "EDGE", "95.06", "Gen. Talent", "11.76", "14.79", "21.30"],
            ["--", "Justin Herbert", "Oregon Ducks", "Los Angeles Chargers", "--", "QB", "70.88", "Early 2", "19.20", "22.40", "18.10"],
            ["--", "Breece Hall", "Iowa St. Cyclones", "New York Jets", "1.0", "RB", "50.32", "Early 3", "16.40", "17.20", "19.10"],
            ["--", "Jayden Daniels", "LSU Tigers", "Washington Commanders", "3.0", "QB", "50.46", "Late 2", "20.80", "TBD", "TBD"],
            ["--", "Malik Nabers", "LSU Tigers", "New York Giants", "3.0", "WR", "8.06", "4th", "15.40", "TBD", "TBD"],
            ["--", "Anthony Richardson", "Florida Gators", "Indianapolis Colts", "2.0", "QB", "88.55", "Early 1st", "13.20", "16.50", "TBD"]
        ]
    },
    rankings: {
        headers: ["Rank", "Name", "College", "Team", "Draft Class", "RAS", "Age", "BMI", "Draft Pick", "Final SZN PPG"],
        rows: [
            ["1", "Jeremiyah Love", "Notre Dame Irish", "Arizona Cardinals", "2026", "--", "20.6", "29.15", "3", "25.39"],
            ["1", "Jordyn Tyson", "Arizona St Sun Devils", "New Orleans Saints", "2026", "--", "21.35", "25.97", "8", "20.68"],
            ["1", "Fernando Mendoza", "Indiana Hoosiers", "Las Vegas Raiders", "2026", "--", "22.25", "26.68", "1", "21.93"],
            ["1", "David Bailey", "New York Jets", "New York Jets", "2026", "9.67", "22.35", "--", "2", "15.86"],
            ["1", "Sonny Styles", "Washington Commanders", "Washington Commanders", "2026", "9.99", "21.1", "--", "7", "11.79"],
            ["1", "Dillon Thieneman", "Chicago Bears", "Chicago Bears", "2026", "9.67", "21.42", "27.26", "25", "12.00"],
            ["1", "Kenyon Sadiq", "Oregon Ducks", "New York Jets", "2026", "9.43", "20.0", "30.02", "16", "11.07"]
        ]
    },
    projections: {
        headers: ["Prospect Name", "Pos", "Draft Capital", "Year 1 Proj PPG", "Year 2 Proj PPG", "Year 3 Proj PPG", "Prospect Grade"],
        rows: [
            ["Ashton Jeanty", "RB", "1.01", "14.60", "TBD", "TBD", "Gen. Talent"],
            ["Jeremiyah Love", "RB", "1.01", "TBD", "TBD", "TBD", "Gen. Talent"],
            ["Jordyn Tyson", "WR", "1.02", "TBD", "TBD", "TBD", "Gen. Talent"],
            ["Kyler Murray", "QB", "--", "17.69", "23.81", "20.86", "Gen. Talent"],
            ["Saquon Barkley", "RB", "--", "25.13", "19.85", "INJ", "Gen. Talent"],
            ["Drake London", "WR", "--", "9.76", "10.25", "15.55", "Gen. Talent"],
            ["Justin Herbert", "QB", "--", "19.20", "22.40", "18.10", "Early 2"],
            ["Breece Hall", "RB", "--", "16.40", "17.20", "19.10", "Early 3"]
        ]
    },
    matrix: {
        headers: ["Comparison Metric", "Prospect A", "Prospect B", "Delta / Edge", "Confidence Rating"],
        rows: [
            ["College Dominator / PPR", "25.39 PPG", "20.68 PPG", "+4.71 PPG", "Elite"],
            ["Athletic RAS Score", "9.99 (Sonny Styles)", "9.67 (David Bailey)", "+0.32", "High"],
            ["Speed Score", "118.99 (J. Love)", "99.89 (J. Price)", "+19.10", "High"],
            ["Draft Capital / Capital Tier", "Top 3 Pick", "Top 10 Pick", "Tier 1", "Strong"]
        ]
    }
};

let currentActiveTab = 'bigboard';

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
    document.getElementById('statPpg').textContent = tabKey === 'projections' ? '17.8 PPG' : '16.5 PPG';
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
    renderTable('bigboard');
});
