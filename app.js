// Dynasty Data Journal Dataset (Parsed from Excel Sheets)
const dataset = {
    bigboard: {
        headers: ["Pick", "Name", "College", "ADP", "Pos", "Score", "Grade", "Yr 1 PPG", "Yr 2 PPG", "Yr 3 PPG"],
        rows: [
            ["1.01", "Ashton Jeanty", "Boise State", "1.0", "RB", "97.3", "Elite SZN", "14.2", "17.5", "19.8"],
            ["1.02", "Jayden Daniels", "LSU", "3.0", "QB", "94.5", "Gen. Talent", "18.4", "20.1", "22.5"],
            ["1.03", "Jordyn Tyson", "Arizona State", "4.0", "WR", "91.2", "Late 1", "11.1", "14.3", "16.9"],
            ["1.04", "Luther Burden III", "Missouri", "2.0", "WR", "93.8", "Elite SZN", "13.5", "16.8", "18.7"],
            ["1.05", "TreVeyon Henderson", "Ohio State", "8.0", "RB", "88.4", "Mid 1", "10.2", "13.4", "15.1"],
            ["1.06", "Omarion Hampton", "North Carolina", "5.0", "RB", "90.1", "Late 1", "12.5", "15.0", "17.2"],
            ["1.07", "Emeka Egbuka", "Ohio State", "12.0", "WR", "87.0", "Mid 1", "9.8", "12.7", "14.8"],
            ["1.08", "Quinshon Judkins", "Ole Miss", "6.0", "RB", "89.6", "Late 1", "13.0", "15.8", "18.0"]
        ]
    },
    rankings: {
        headers: ["Rank", "Name", "College", "Team", "Draft Class", "RAS", "Age", "BMI", "Draft Pick", "Final SZN PPG"],
        rows: [
            ["1", "Jordyn Tyson", "Arizona State", "New Orleans Saints", "2026", "9.4", "21.3", "25.9", "8", "19.4"],
            ["2", "Luther Burden III", "Missouri", "Chicago Bears", "2025", "9.1", "21.1", "27.2", "4", "18.8"],
            ["3", "Ashton Jeanty", "Boise State", "Las Vegas Raiders", "2025", "9.7", "21.5", "30.1", "1", "21.5"],
            ["4", "Emeka Egbuka", "Ohio State", "Tampa Bay Buccaneers", "2025", "8.8", "22.0", "26.5", "18", "16.2"],
            ["5", "Quinshon Judkins", "Ole Miss", "Dallas Cowboys", "2025", "8.5", "21.2", "31.0", "12", "17.9"]
        ]
    },
    projections: {
        headers: ["Prospect Name", "Pos", "Draft Capital", "Year 1 Proj PPG", "Year 2 Proj PPG", "Year 3 Proj PPG", "Breakout Tier"],
        rows: [
            ["Ashton Jeanty", "RB", "1.01", "14.2", "17.5", "19.8", "Tier 1: Superstar"],
            ["Luther Burden III", "WR", "1.04", "13.5", "16.8", "18.7", "Tier 1: Superstar"],
            ["Jayden Daniels", "QB", "1.02", "18.4", "20.1", "22.5", "Tier 1: Elite QB"],
            ["Jordyn Tyson", "WR", "1.03", "11.1", "14.3", "16.9", "Tier 2: WR2/1"],
            ["Omarion Hampton", "RB", "1.06", "12.5", "15.0", "17.2", "Tier 2: RB1/2"],
            ["Quinshon Judkins", "RB", "1.08", "13.0", "15.8", "18.0", "Tier 1: RB1"]
        ]
    },
    matrix: {
        headers: ["Comparison Metric", "Prospect A", "Prospect B", "Delta / Edge", "Confidence Rating"],
        rows: [
            ["College Dominator Rating", "42.1%", "38.5%", "+3.6%", "High"],
            ["Target Share / Touch Share", "31.4%", "28.9%", "+2.5%", "Moderate"],
            ["Yards Per Team Pass/Rush Play", "3.42", "2.98", "+0.44", "High"],
            ["Athletic RAS Score", "9.7", "9.1", "+0.6", "Elite"],
            ["Projected Year 3 PPG", "19.8", "16.9", "+2.9 PPG", "Strong"]
        ]
    }
};

let currentActiveTab = 'bigboard';

function renderTable(tabKey) {
    currentActiveTab = tabKey;
    const data = dataset[tabKey];
    const headerRow = document.getElementById('tableHeaders');
    const tableBody = document.getElementById('tableBody');

    // Render Headers
    headerRow.innerHTML = data.headers.map(h => `<th>${h}</th>`).join('');

    // Render Rows with search/filter applied
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const posFilter = document.getElementById('posFilter').value;

    const filteredRows = data.rows.filter(row => {
        const matchesSearch = row.some(cell => String(cell).toLowerCase().includes(searchTerm));
        const matchesPos = posFilter === 'ALL' || row.includes(posFilter);
        return matchesSearch && matchesPos;
    });

    tableBody.innerHTML = filteredRows.map(row => {
        return `<tr>` + row.map((cell, idx) => {
            let cellClass = '';
            // Apply conditional pastel styling rules based on values
            const num = parseFloat(cell);
            if (!isNaN(num)) {
                if (num > 18 || num > 90 || num === 1.01) cellClass = 'cell-elite';
                else if (num > 14 || num > 85) cellClass = 'cell-mid';
                else if (num < 10 && num > 0) cellClass = 'cell-low';
            }
            return `<td class="${cellClass}">${cell}</td>`;
        }).join('') + `</tr>`;
    }).join('');

    // Update footer stats
    document.getElementById('statTotal').textContent = filteredRows.length;
    document.getElementById('statPpg').textContent = tabKey === 'projections' ? '18.2 PPG' : '16.5 PPG';
}

// Event Listeners for Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderTable(e.target.dataset.tab);
    });
});

// Search and Filter Listeners
document.getElementById('searchInput').addEventListener('input', () => renderTable(currentActiveTab));
document.getElementById('posFilter').addEventListener('change', () => renderTable(currentActiveTab));

// Initial render
window.addEventListener('DOMContentLoaded', () => {
    renderTable('bigboard');
});
