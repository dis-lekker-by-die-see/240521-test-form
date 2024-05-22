let entryCount = 0;
let events = {};

function generateTimestamp() {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}-${hours}${minutes}`;
}

function loadEventCSV() {
    const lines = csvData仮日程.split('\n');
    lines.forEach(line => {
        const [eventNumber, eventName] = line.split(',');
        if (eventNumber && eventName) {
            events[eventNumber.trim()] = eventName.trim();
        }
    });
    console.log('Events loaded:', events); // For debugging purposes
}
//=============================================================================================================================
//                            Club

document.getElementById('addClubButton').addEventListener('click', function() {
    const ridingClubContainer = document.getElementById('ridingClubContainer');
    const lastClub = ridingClubContainer.lastElementChild;
    const errorMessage = document.getElementById('error-message-club');

    if (lastClub) {
        const inputs = lastClub.querySelectorAll('input[required], select[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = 'red'; // Highlight the empty fields
            } else {
                input.style.borderColor = ''; // Reset the border color if filled

                // Display the input value below the input box
                const displaySpanClass = input.className + 'Display';
                let displaySpan = input.parentNode.querySelector('.' + displaySpanClass);
                
                if (!displaySpan) {
                    displaySpan = document.createElement('span');
                    displaySpan.className = displaySpanClass;
                    input.parentNode.appendChild(displaySpan);
                }
                displaySpan.textContent = input.value;
            }
        });
        
        if (!allFilled) {
            errorMessage.textContent = 'Please fill in all required fields.';
            errorMessage.style.display = 'block';
            return;
        } else {
            errorMessage.style.display = 'none';
        }
        return;
    }

    const clubDiv = document.createElement('div');
    clubDiv.className = 'club';
    clubDiv.innerHTML = `
        <div>
            <label for="ridingClub">団体名:</label>
            <input type="text" class="clubName" required>
            <span class="clubNameDisplay"></span>
        </div>
        <div>
            <label for="registrationOfficer">申込責任者:</label>
            <input type="text" class="registrationOfficer" required>
            <span class="registrationOfficerDisplay"></span>
        </div>
        <div>
            <label for="mobile">携帯:</label>
            <input type="text" class="mobile" required>
            <span class="mobileDisplay"></span>
        </div>
        <div>
            <label for="phone">電話:</label>
            <input type="text" class="phone" required>
            <span class="phoneDisplay"></span>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" class="email" required>
            <span class="emailDisplay"></span>
        </div>
        <div>
            <label for="fax">FAX:</label>
            <input type="text" class="fax" required>
            <span class="faxDisplay"></span>
        </div>
        <div>
            <label for="address">住所:</label>
            <input type="text" class="address" required>
            <span class="addressDisplay"></span>
        </div>
    `;
    ridingClubContainer.appendChild(clubDiv);

    const inputs = clubDiv.querySelectorAll('input');

    inputs.forEach(input => {
        const displaySpanClass = input.className + 'Display';
        const displaySpan = clubDiv.querySelector('.' + displaySpanClass);

        input.addEventListener('input', function() {
            displaySpan.textContent = input.value;
        });
    });
});

//=============================================================================================================================
//                            Horse

document.getElementById('addHorseButton').addEventListener('click', function() {
    const horseContainer = document.getElementById('horseContainer');
    const lastHorse = horseContainer.lastElementChild;
    const errorMessage = document.getElementById('error-message-horse');

    if (lastHorse) {
        const inputs = lastHorse.querySelectorAll('input[required], select[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = 'red'; // Highlight the empty fields
            } else {
                input.style.borderColor = ''; // Reset the border color if filled
            }
        });

        // if (!allFilled) {
        //     alert('Please fill in all required fields before adding another horse.');
        //     return;
        // }
        if (!allFilled) {
            errorMessage.textContent = 'Please fill in all required fields before adding another horse.';
            errorMessage.style.display = 'block';
            return;
        } else {
            errorMessage.style.display = 'none';
        }
    }

    const horseDiv = document.createElement('div');
    horseDiv.className = 'horse';
    const horseNumber = document.querySelectorAll('.horse').length + 1;
    horseDiv.innerHTML = `
        <div class="horseNumber">${horseNumber}</div>
        <div class="horse-fields">
            <div>
                <label for="horseName">馬名:</label>
                <input type="text" class="horseName" required>
            </div>
            <div>
                <label for="horseNameFurigana">フリガナ:</label>
                <input type="text" class="horseNameFurigana" required>
            </div>
            <div>
                <label for="horseRegNumber">登録番号:</label>
                <input type="text" class="horseRegNumber" required>
            </div>
            <div>
                <label for="horseSex">性別:</label>
                <select class="horseSex" required>
                    <option value="" disabled selected>性別</option>
                    <option value="セン">セン</option>
                    <option value="牝">牝</option>
                    <option value="牡">牡</option>
                </select>
            </div>
            <div>
                <label for="horseAge">年齢:</label>
                <input type="text" class="horseAge" required>
            </div>
            <div>
                <label for="horseColor">毛色:</label>
                <select class="horseColor" required>
                    <option value="" disabled selected>毛色</option>
                    <option value="鹿毛">鹿毛</option>
                    <option value="黒鹿毛">黒鹿毛</option>
                    <option value="栗毛">栗毛</option>
                    <option value="芦毛">芦毛</option>
                    <option value="栃栗毛">栃栗毛</option>
                    <option value="青鹿毛">青鹿毛</option>
                    <option value="青毛">青毛</option>
                    <option value="粕毛">粕毛</option>
                    <option value="ブチ">ブチ</option>
                </select>
            </div>
            <div>
                <label for="horseBreed">品種:</label>
                <input type="text" class="horseBreed" required>
            </div>
            <div>
                <label for="horseOrigin">産地:</label>
                <input type="text" class="horseOrigin" required>
            </div>
            <div>
                <label for="horseOwner">所有者:</label>
                <input type="text" class="horseOwner" required>
            </div>
        </div>
    `;
    horseContainer.appendChild(horseDiv);
});


//=============================================================================================================================
//                            Rider

document.getElementById('addRiderButton').addEventListener('click', function() {
    const riderContainer = document.getElementById('riderContainer');
    const lastRider = riderContainer.lastElementChild;
    const errorMessage = document.getElementById('error-message-rider');

    if (lastRider) {
        const inputs = lastRider.querySelectorAll('input[required], select[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = 'red'; // Highlight the empty fields
            } else {
                input.style.borderColor = ''; // Reset the border color if filled
            }
        });

        // if (!allFilled) {
        //     alert('Please fill in all required fields before adding another rider.');
        //     return;
        // }
        if (!allFilled) {
            errorMessage.textContent = 'Please fill in all required fields before adding another rider.';
            errorMessage.style.display = 'block';
            return;
        } else {
            errorMessage.style.display = 'none';
        }
    }


    const riderDiv = document.createElement('div');
    riderDiv.className = 'rider';
    const riderNumber = document.querySelectorAll('.rider').length + 1;
    riderDiv.innerHTML = `
        <div class="riderNumber">${riderNumber}</div>
        <div class="rider-fields">
            <div>
                <label for="riderName">選手名:</label>
                <input type="text" class="riderName" required>
            </div>
            <div>
                <label for="riderNameFurigana">フリガナ:</label>
                <input type="text" class="riderNameFurigana" required>
            </div>
            <div>
                <label for="riderRegNumber">登録番号:</label>
                <input type="text" class="riderRegNumber" required>
            </div>
            <div>
                <label for="riderSex">性別:</label>
                <select class="riderSex" required>
                    <option value="" disabled selected>性別</option>
                    <option value="男子">男子</option>
                    <option value="女子">女子</option>
                </select>
            </div>
        </div>
    `;
    riderContainer.appendChild(riderDiv);

    updateSelectOptions();
});

//=============================================================================================================================
//                            Entries

document.getElementById('addEntryButton').addEventListener('click', function() {
    const eventForm = document.getElementById('eventForm');
    const entryContainer = eventForm.querySelector('.entry-container');
    const lastEntry = entryContainer ? entryContainer.lastElementChild : null;
    const errorMessage = document.getElementById('error-message-entry');

    if (lastEntry) {
        const inputs = lastEntry.querySelectorAll('input[required], select[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = 'red'; // Highlight the empty fields
            } else {
                input.style.borderColor = ''; // Reset the border color if filled
            }
        });

        // if (!allFilled) {
        //     alert('Please fill in all required fields before adding another entry.');
        //     return;
        // }
        if (!allFilled) {
            errorMessage.textContent = 'Please fill in all required fields before adding another entry.';
            errorMessage.style.display = 'block';
            return;
        } else {
            errorMessage.style.display = 'none';
        }
    }

    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry';

    const entryNumber = document.querySelectorAll('.entry').length + 1;
    entryDiv.innerHTML = `
        <div class="horseNumber">${entryNumber}</div>
        
        <label for="riderSelect">Rider:</label>
        <select class="riderSelect" required></select>

        <label for="eventNumber">Event Number:</label>
        <input type="number" class="eventNumber" min="1" max="999" required>
        <span class="eventName"></span>

        <label for="horseSelect">Horse:</label>
        <select class="horseSelect" required></select>
    `;
    
    // Ensure the entry container exists
    if (!entryContainer) {
        const newEntryContainer = document.createElement('div');
        newEntryContainer.className = 'entry-container';
        eventForm.appendChild(newEntryContainer);
        newEntryContainer.appendChild(entryDiv);
    } else {
        entryContainer.appendChild(entryDiv);
    }

    updateSelectOptions();
});


//=============================================================================================================================
//                            Data Arrays

document.getElementById('submitEntriesButton').addEventListener('click', function() {
    const horses = Array.from(document.querySelectorAll('.horse')).map(horse => ({
        name: horse.querySelector('.horseName').value,
        furigana: horse.querySelector('.horseNameFurigana').value,
        regNumber: horse.querySelector('.horseRegNumber').value,
        sex: horse.querySelector('.horseSex').value,
        age: horse.querySelector('.horseAge').value,
        color: horse.querySelector('.horseColor').value,
        breed: horse.querySelector('.horseBreed').value,
        origin: horse.querySelector('.horseOrigin').value,
        owner: horse.querySelector('.horseOwner').value
    }));

    const riders = Array.from(document.querySelectorAll('.rider')).map(rider => ({
        name: rider.querySelector('.riderName').value,
        age: rider.querySelector('.riderAge').value,
        experience: rider.querySelector('.riderExperience').value
    }));

    const entries = Array.from(document.querySelectorAll('.entry')).map(entry => ({
        number: entry.querySelector('.entrantNumber').textContent,
        rider: entry.querySelector('.riderSelect').value,
        eventNumber: entry.querySelector('.eventNumber').value,
        eventName: entry.querySelector('.eventName').textContent,
        horse: entry.querySelector('.horseSelect').value
    }));

    const horsesAndRidersCSV = generateHorsesAndRidersCSV(horses, riders);
    const entriesCSV = generateEntriesCSV(entries);

    downloadCSV(horsesAndRidersCSV, 'horses_and_riders.csv');
    downloadCSV(entriesCSV, 'entries.csv');
});

//=============================================================================================================================
//                            /

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

//=============================================================================================================================
//                            Generate .csv Entry File

function generateHorsesAndRidersCSV(horses, riders) {

    //団体名,フリガナ	馬　　名	登録番号	性別	年齢	毛色	品種	産地	所有者
    

    let csv = 'Horses\n';
    horses.forEach(horse => {
        csv += `${horse.name},${horse.furigana},${horse.regNumber},${horse.sex},${horse.age},${horse.color},${horse.breed},${horse.origin},${horse.owner}\n`;
    });

    csv += '\nRiders\n';
    riders.forEach(rider => {
        csv += `${rider.name},${rider.age},${rider.experience}\n`;
    });

    return csv;
}

function generateEntriesCSV(entries) {
    //団体名,フリガナ	選手名	登録番号	性別
    let csv = 'Entrant Number,Rider,Event Number,Event Name,Horse\n';
    entries.forEach(entry => {
        csv += `${entry.number},${entry.rider},${entry.eventNumber},${entry.eventName},${entry.horse}\n`;
    });

    return csv;
}

function downloadCSV(csvContent, filename) {
    const timestamp = generateTimestamp();
    const fullFilename = `${filename}-${timestamp}.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fullFilename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

//=============================================================================================================================
//=============================================================================================================================
//                            csv inline data


const csvData仮日程 = 
`eventNumber,eventName
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









// Load event data on page load
loadEventCSV();
updateSelectOptions();


