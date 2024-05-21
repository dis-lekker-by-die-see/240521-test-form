let entryCount = 0;
let events = {};

document.getElementById('addHorseButton').addEventListener('click', function() {
    const horseContainer = document.getElementById('horseContainer');
    const horseDiv = document.createElement('div');
    horseDiv.className = 'horse';
    horseDiv.innerHTML = `
        <label for="horseName">Horse Name:</label>
        <input type="text" class="horseName" required>
    `;
    horseContainer.appendChild(horseDiv);
});

document.getElementById('addRiderButton').addEventListener('click', function() {
    const riderContainer = document.getElementById('riderContainer');
    const riderDiv = document.createElement('div');
    riderDiv.className = 'rider';
    riderDiv.innerHTML = `
        <label for="riderName">Rider Name:</label>
        <input type="text" class="riderName" required>
    `;
    riderContainer.appendChild(riderDiv);

    updateSelectOptions();
});

document.getElementById('addEntryButton').addEventListener('click', function() {
    const eventForm = document.getElementById('eventForm');
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry';

    entryCount++;
    entryDiv.innerHTML = `
        <span class="entrantNumber">${entryCount}</span>
        
        <label for="riderSelect">Rider:</label>
        <select class="riderSelect"></select>

        <label for="eventNumber">Event Number:</label>
        <input type="number" class="eventNumber" min="1" required>
        <span class="eventName"></span>

        <label for="horseSelect">Horse:</label>
        <select class="horseSelect"></select>
    `;
    eventForm.appendChild(entryDiv);

    updateSelectOptions();
});

function updateSelectOptions() {
    const riderNames = Array.from(document.querySelectorAll('.riderName')).map(input => input.value);
    const horseNames = Array.from(document.querySelectorAll('.horseName')).map(input => input.value);

    const riderSelects = document.querySelectorAll('.riderSelect');
    riderSelects.forEach(select => {
        const selectedValue = select.value;
        select.innerHTML = '';
        riderNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        select.value = selectedValue;
    });

    const horseSelects = document.querySelectorAll('.horseSelect');
    horseSelects.forEach(select => {
        const selectedValue = select.value;
        select.innerHTML = '';
        horseNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        select.value = selectedValue;
    });

    const eventNumbers = document.querySelectorAll('.eventNumber');
    eventNumbers.forEach(input => {
        input.addEventListener('input', function() {
            const eventNameSpan = this.nextElementSibling;
            const eventNumber = this.value;
            if (events[eventNumber]) {
                eventNameSpan.textContent = events[eventNumber];
            } else {
                eventNameSpan.textContent = 'Event not found';
            }
        });
    });
}

document.getElementById('submitEntriesButton').addEventListener('click', function() {
    const horses = Array.from(document.querySelectorAll('.horseName')).map(input => input.value);
    const riders = Array.from(document.querySelectorAll('.riderName')).map(input => input.value);
    const entries = Array.from(document.querySelectorAll('.entry')).map(entry => {
        return {
            number: entry.querySelector('.entrantNumber').textContent,
            rider: entry.querySelector('.riderSelect').value,
            eventNumber: entry.querySelector('.eventNumber').value,
            eventName: entry.querySelector('.eventName').textContent,
            horse: entry.querySelector('.horseSelect').value
        };
    });

    const horsesAndRidersCSV = generateHorsesAndRidersCSV(horses, riders);
    const entriesCSV = generateEntriesCSV(entries);

    downloadCSV(horsesAndRidersCSV, 'horses_and_riders.csv');
    downloadCSV(entriesCSV, 'entries.csv');
});

function generateHorsesAndRidersCSV(horses, riders) {
    let csv = 'Horses\n';
    horses.forEach(horse => {
        csv += `${horse}\n`;
    });

    csv += '\nRiders\n';
    riders.forEach(rider => {
        csv += `${rider}\n`;
    });

    return csv;
}

function generateEntriesCSV(entries) {
    let csv = 'Entrant Number,Rider,Event Number,Event Name,Horse\n';
    entries.forEach(entry => {
        csv += `${entry.number},${entry.rider},${entry.eventNumber},${entry.eventName},${entry.horse}\n`;
    });

    return csv;
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Inline CSV data as a string
const csvData = `eventNumber,eventName
eventNumber,eventName
1,フレンドシップ120
2,フレンドシップ100
3,フレンドシップ80
4,中障害飛越競技Ｄ(公認)
5,中障害飛越競技Ｄ(一般)
6,中障害飛越競技Ｃ(公認)
7,中障害飛越競技Ｃ(一般)
8,中障害飛越競技Ｂ(公認)
9,中障害飛越競技Ｂ(一般)
10,小障害飛越競技80
11,小障害飛越競技90
12,小障害飛越競技100
13,グランプリ馬場馬術競技
14,ジュニアライダー馬場馬術競技
15,インターメディエイトⅠ馬場馬術競技(一般)
16,馬場馬術５A(公認)
17,馬場馬術５A(一般)
18,ｾﾝﾄｼﾞｮｰｼﾞ賞典馬場馬術競技(公認)
19,ｾﾝﾄｼﾞｮｰｼﾞ賞典馬場馬術競技(一般)
20,馬場馬術４A(公認)
21,馬場馬術４A(一般)
22,馬場馬術３A(公認)
23,馬場馬術３A(一般)
24,ヤングライダー馬場馬術競技(公認）
25,馬場馬術２Ｂ
26,馬場馬術２Ｃ
27,選択自由演技馬場馬術競技
28,選択馬場馬術課目
29,パラ馬術競技
30,クロス障害
31,小障害飛越競技70
32,小障害飛越競技80
33,小障害飛越競技90
34,小障害飛越競技100
35,中障害飛越競技Ｄ(公認)
36,中障害飛越競技Ｄ(一般)
37,中障害飛越競技Ｃ(公認)
38,中障害飛越競技Ｃ(一般)
39,中障害飛越競技Ｂ(公認)
40,中障害飛越競技Ｂ(一般)
41,ジムカーナ競技
42,グランプリ馬場馬術競技
43,ジュニアライダー馬場馬術競技
44,インターメディエイトⅠ馬場馬術競技(公認)
45,インターメディエイトⅠ馬場馬術競技(一般)
46,馬場馬術５B(公認)
47,馬場馬術５B(一般)
48,ｾﾝﾄｼﾞｮｰｼﾞ賞典馬場馬術競技(公認)
49,ｾﾝﾄｼﾞｮｰｼﾞ賞典馬場馬術競技(一般)
50,馬場馬術４B(公認)
51,馬場馬術４B(一般)
52,馬場馬術３B(公認)
53,馬場馬術３B(一般)
54,ヤングライダー馬場馬術競技(公認）
55,馬場馬術２Ｂ
56,馬場馬術２Ｃ
57,選択自由演技馬場馬術競技
58,選択馬場馬術課目
59,パラ馬術競技
60,中障害飛越競技Ｄ(公認)
61,中障害飛越競技Ｄ(一般)
62,中障害飛越競技Ｃ(公認)
63,中障害飛越競技Ｃ(一般)
64,中障害飛越競技Ｂ(公認)
65,中障害飛越競技Ｂ(一般)
66,クロス障害
67,小障害飛越競技70
68,小障害飛越競技80
69,小障害飛越競技90
70,小障害飛越競技100
71,ジムカーナ競技`;

function loadEventCSV() {
    const lines = csvData.split('\n');
    lines.forEach(line => {
        const [eventNumber, eventName] = line.split(',');
        if (eventNumber && eventName) {
            events[eventNumber.trim()] = eventName.trim();
        }
    });
    console.log('Events loaded:', events); // For debugging purposes
}

// Load event data on page load
loadEventCSV();
updateSelectOptions();

