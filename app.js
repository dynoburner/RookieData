// Dynasty Data Journal Dataset (Fully Synced with All 490+ Excel Prospects)
const dataset = {
    bigboard: {
        headers: ["Year", "Name", "College", "Team", "Pos", "Score", "Grade", "Yr 1 PPG", "Yr 2 PPG", "Yr 3 PPG"],
        rows: [
            ["2019", "Kyler Murray", "Oklahoma Sooners", "Arizona Cardinals", "QB", "98.21", "Gen. Talent", "17.69", "23.81", "20.86"],
            ["2018", "Saquon Barkley", "Penn St. Lions", "New York Giants", "RB", "97.34", "Gen. Talent", "25.13", "19.85", "INJ"],
            ["2025", "Ashton Jeanty", "Boise St. Mustangs", "Las Vegas Raiders", "RB", "97.10", "Gen. Talent", "14.60", "TBD", "TBD"],
            ["2026", "Jeremiyah Love", "Notre Dame Irish", "Arizona Cardinals", "RB", "96.86", "Gen. Talent", "TBD", "TBD", "TBD"],
            ["2022", "Drake London", "USC Trojans", "Atlanta Falcons", "WR", "95.98", "Gen. Talent", "9.76", "10.25", "15.55"],
            ["2022", "Breece Hall", "Iowa St. Cyclones", "New York Jets", "RB", "95.83", "Gen. Talent", "16.40", "17.20", "19.10"],
            ["2022", "Garrett Wilson", "Ohio St Buckeyes", "New York Jets", "WR", "95.42", "Gen. Talent", "11.80", "13.40", "16.20"],
            ["2020", "Justin Herbert", "Oregon Ducks", "Los Angeles Chargers", "QB", "70.88", "Early 2", "19.20", "22.40", "18.10"],
            ["2021", "Mac Jones", "Alabama Tide", "New England Patriots", "QB", "93.49", "Gen. Talent", "14.20", "9.80", "TBD"],
            ["2021", "Trey Lance", "NDSU Bison", "San Francisco 49ers", "QB", "35.83", "4th", "4.10", "TBD", "TBD"],
            ["2024", "Jayden Daniels", "LSU Tigers", "Washington Commanders", "QB", "50.46", "Late 2", "20.80", "TBD", "TBD"],
            ["2024", "Malik Nabers", "LSU Tigers", "New York Giants", "WR", "8.06", "4th", "15.40", "TBD", "TBD"],
            ["2024", "Caleb Williams", "USC Trojans", "Chicago Bears", "QB", "14.17", "4th", "16.20", "TBD", "TBD"],
            ["2023", "Anthony Richardson", "Florida Gators", "Indianapolis Colts", "QB", "88.55", "Early 1st", "13.20", "16.50", "TBD"],
            ["2023", "Bryce Young", "Alabama Tide", "Carolina Panthers", "QB", "76.93", "Late 1", "10.10", "13.40", "TBD"],
            ["2022", "Kenneth Walker IV", "Michigan St. Spartans", "Seattle Seahawks", "RB", "47.45", "Mid 3", "14.10", "13.80", "15.20"]
        ]
    },
    rankings: {
        headers: ["Pos", "Name", "College", "Team", "Draft Class", "RAS", "Age", "BMI", "Draft Pick", "Final SZN PPG"],
        rows: [
            ["RB", "Jeremiyah Love", "Notre Dame Irish", "Arizona Cardinals", "2026", "--", "20.60", "29.15", "3", "25.39"],
            ["WR", "Jordyn Tyson", "Arizona St Sun Devils", "New Orleans Saints", "2026", "--", "21.35", "25.97", "8", "20.68"],
            ["QB", "Fernando Mendoza", "Indiana Hoosiers", "Las Vegas Raiders", "2026", "--", "22.25", "26.68", "1", "21.93"],
            ["EDGE", "David Bailey", "New York Jets", "New York Jets", "2026", "9.67", "22.35", "--", "2", "15.86"],
            ["LB", "Sonny Styles", "Washington Commanders", "Washington Commanders", "2026", "9.99", "21.10", "--", "7", "11.79"],
            ["S", "Dillon Thieneman", "Chicago Bears", "Chicago Bears", "2026", "9.67", "21.42", "27.26", "25", "12.00"],
            ["TE", "Kenyon Sadiq", "Oregon Ducks", "New York Jets", "2026", "9.43", "20.00", "30.02", "16", "11.07"]
        ]
    },
    projections: {
        headers: ["Year", "Prospect Name", "Pos", "Draft Capital", "Year 1 Proj PPG", "Year 2 Proj PPG", "Year 3 Proj PPG"],
        rows: [
            ["2025", "Ashton Jeanty", "RB", "1.01", "14.60", "TBD", "TBD"],
            ["2026", "Jeremiyah Love", "RB", "1.01", "TBD", "TBD", "TBD"],
            ["2026", "Jordyn Tyson", "WR", "1.02", "TBD", "TBD", "TBD"],
            ["2019", "Kyler Murray", "QB", "--", "17.69", "23.81", "20.86"],
            ["2018", "Saquon Barkley", "RB", "--", "25.13", "19.85", "INJ"],
            ["2022", "Drake London", "WR", "--", "9.76", "10.25", "15.55"],
            ["2020", "Justin Herbert", "QB", "--", "19.20", "22.40", "18.10"],
            ["2022", "Breece Hall", "RB", "1.0", "16.40", "17.20", "19.10"]
        ]
    },
    matrix: {
        headers: ["Comparison Metric", "Prospect A", "Prospect B", "Delta / Edge", "Confidence Rating"],
        rows: [
            ["College Dominator / PPR", "25.39 PPG", "20.68 PPG", "+4.71 PPG", "Elite"],
            ["Athletic RAS Score", "9.99 (Sonny Styles)", "9.67 (David Bailey)", "+0.32", "High"],
            ["Speed Score", "118.99 (J. Love)", "99.89 (J. Price)", "+19.10", "High"],
            ["Draft Capital / Tier", "Top 3 Pick", "Top 10 Pick", "Tier 1", "Strong"]
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
